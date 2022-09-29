import { useState } from "react";

interface INode
{
    name: string,
    children: Array<INode>
}

interface Node extends INode
{

}

interface Template extends INode
{
    text: string,
}

const useTemplates = () =>
{
    const [nodes] = useState([] as INode[]);

    
};

export default useTemplates;