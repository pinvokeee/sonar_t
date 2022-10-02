import { useState } from "react";
import { INodeBase } from "../interface/INode";

export interface IUseTemplatesState
{
    selectedNode : INodeBase | null;

    setSelectedNode : Function;
}

export const useTemplatesState = () : IUseTemplatesState =>
{
    const [selectedNode, setSelectedNode] = useState<INodeBase | null>(null);

    return {
        selectedNode: selectedNode,
        setSelectedNode : setSelectedNode,
    };
}