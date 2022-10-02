import { useState } from "react";
import { getFileEntriesFromDirectoryHandle } from "../js/fileAccessJSHelper";

/**
 * 各ノードのベースとなるインターフェイス
 */
export interface INodeBase
{
    name: string,
    children: Array<INodeBase>
}

/**
 * 構造ノード
 */
export interface IStructureNode extends INodeBase
{
    //一旦定義だけしておく
}

/**
 * テンプレートノード
 */
export interface ITemplateNode extends INodeBase
{
    content: string,
}

export interface IUseTemplatesStore
{
    loadFromDirectory : Function,
}

export const useTemplatesStore = () : IUseTemplatesStore =>
{
    const targetExtensions = ["txt", "tsx", "js"];
    const [nodes, setNodes] = useState([] as INodeBase[]);

    /**
     * 
     * @param handle 
     */
    const loadFromDirectory = async (handle : FileSystemDirectoryHandle) => 
    {
        await scanDirectory(handle, null, nodes);

        console.log(nodes);
    }

    /**
     * ディレクトリをスキャンしノード構造を生成する
     * @param handle 対象ディレクトリのハンドル
     * @param parentNode 直下ノードの親として指定するINodeBase型のインスタンス
     * @param childAppnedTo スキャン結果を追加先のノード配列
     */
    const scanDirectory = async (handle : FileSystemDirectoryHandle, parentNode : INodeBase | null, childAppnedTo : Array<INodeBase>) =>
    {
        const temp_nodes : Array<INodeBase> = [];
        const e = await getFileEntriesFromDirectoryHandle(handle);

        for await (const [name, handle] of e)
        {
            if (handle.kind == "file")
            {
                const node : ITemplateNode | null = await createTemplateNode(handle);
                if (node != null) childAppnedTo.push(node);
            }
            else if (handle.kind == "directory")
            {
                const node : IStructureNode  = await createDirectoryNode(handle) as IStructureNode;
                await scanDirectory(handle, node, node?.children);

                if (node.children.length > 0)
                {
                    childAppnedTo.push(node);
                }
            }
        }
    }

    /**
     * 構造ノードを作成する
     * @param filehandle 元となるディレクトリハンドル
     * @returns 作成されたIStructureNode型のインスタンス
     */
    const createDirectoryNode = async (dirHandle : FileSystemFileHandle) : Promise<IStructureNode | null> => 
    {
        return {
            name: dirHandle.name,
            children: [],
        }
    }

    /**
     * テンプレートノードを作成する
     * @param filehandle テンプレートとして読み込むファイルハンドル
     * @returns 作成されたITemplateNode型のインスタンス(読み込み対象のファイルでなければNULL型を返す)
     */
    const createTemplateNode = async (filehandle : FileSystemFileHandle) : Promise<ITemplateNode | null> => 
    {
        //ファイル名を文字列として取得
        const filename : string = filehandle.name;

        //拡張子取得の処理

        const extension_mark_index = filename.lastIndexOf(".");
        const name_withOutExtension = extension_mark_index > -1 ? filename.substring(0, filename.lastIndexOf(".")) : "";
        const extension = filename.substring(extension_mark_index + 1, filename.length);

        //拡張子が読み込む対象リストになければnullで返す
        if (targetExtensions.indexOf(extension) == -1) return null;

        //ファイルインスタンスを取得
        const file : File = await filehandle.getFile();       
        
        //ファイル内容を文字列を取得
        const text = await file.text();

        return {
            name: name_withOutExtension,
            content : text,
            children: []
        }
    }

    return {
        loadFromDirectory: loadFromDirectory,
    }
};