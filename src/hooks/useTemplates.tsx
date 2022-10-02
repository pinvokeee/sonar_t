import { useState } from "react";
import { INodeBase, IStructureNode, ITemplateNode } from "../interface/INode";
import { getFileEntriesFromDirectoryHandle } from "../js/fileAccessJSHelper";

export interface IUseTemplatesStore
{
    getNodes : Function;
    loadFromDirectory : Function;
}

export const useTemplatesStore = () : IUseTemplatesStore =>
{
    const targetExtensions = ["txt", "tsx", "js"];
    const [nodes, setNodes] = useState([] as INodeBase[]);

    const getNodes  = () : Array<INodeBase> =>
    {
        return nodes;
    }

    /**
     * 
     * @param handle 
     */
    const loadFromDirectory = async (handle : FileSystemDirectoryHandle) => 
    {
        const _nodes : Array<INodeBase> = [];
        await scanDirectory(handle, null, _nodes, 0);
        setNodes(_nodes);

        console.log(_nodes);
    }

    /**
     * ディレクトリをスキャンしノード構造を生成する
     * @param handle 対象ディレクトリのハンドル
     * @param parentNode 直下ノードの親として指定するINodeBase型のインスタンス
     * @param childAppnedTo スキャン結果を追加先のノード配列
     */
    const scanDirectory = async (handle : FileSystemDirectoryHandle, parentNode : INodeBase | null, childAppnedTo : Array<INodeBase>, baseIndex : number) =>
    {
        const temp_nodes : Array<INodeBase> = [];
        const e = await getFileEntriesFromDirectoryHandle(handle);

        let index = baseIndex;

        for await (const [name, handle] of e)
        {
            if (handle.kind == "file")
            {
                const node : ITemplateNode | null = await createTemplateNode(index, handle, parentNode);

                if (node != null)
                {                    
                    childAppnedTo.push(node);
                    index++;
                }
            }
            else if (handle.kind == "directory")
            {
                const node : IStructureNode  = await createDirectoryNode(index, handle, parentNode) as IStructureNode;
                const lastIndex = await scanDirectory(handle, node, node?.children, ++index);

                if (node.children.length > 0)
                {
                    childAppnedTo.push(node);
                    index = lastIndex;
                }
            }
        }

        return index;
    }

    /**
     * 構造ノードを作成する
     * @param filehandle 元となるディレクトリハンドル
     * @returns 作成されたIStructureNode型のインスタンス
     */
    const createDirectoryNode = async (index : number, dirHandle : FileSystemFileHandle, parent : INodeBase | null) : Promise<IStructureNode | null> => 
    {
        return {
            index: index++,
            name: dirHandle.name,
            parent : parent,
            children: [],
        }
    }

    /**
     * テンプレートノードを作成する
     * @param filehandle テンプレートとして読み込むファイルハンドル
     * @returns 作成されたITemplateNode型のインスタンス(読み込み対象のファイルでなければNULL型を返す)
     */
    const createTemplateNode = async (index : number, filehandle : FileSystemFileHandle,  parent : INodeBase | null) : Promise<ITemplateNode | null> => 
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
            index : index++,
            name: name_withOutExtension,
            content : text,
            parent : parent,
            children: []
        }
    }

    return {
        getNodes : getNodes,
        loadFromDirectory: loadFromDirectory,
    }
};