import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { IUseTemplatesStore } from "../../hooks/useTemplates";
import { INodeBase } from "../../interface/INode";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IUseTemplatesState } from "../../hooks/useTemplatesState";

interface Props
{
    useTemplatesStore : IUseTemplatesStore;
    useTemplatesState : IUseTemplatesState;
}

function TemplatePicker(props : Props)
{
    const getTemplates = () : Array<INodeBase>  =>
    {
        return props.useTemplatesStore.getNodes();
    }

    const getSelectedNode = () : INodeBase | null =>
    {
        return props.useTemplatesState.selectedNode;
    }

    const clickNode = (node : INodeBase) =>
    {
        props.useTemplatesState.setSelectedNode(node);
    }

    const createTemplatesAccordion = () =>
    {
        const els = [];

        let current_node = getSelectedNode();
        
        const a = (
            <List>
                {current_node?.children.map(node => createListItem(node))}
            </List>
        );

        // while (current_node?.parent != null)
        // {
        //     const e = (
        //         <Accordion>
        //             <AccordionSummary></AccordionSummary>
        //             <AccordionDetails>
        //                 {createListItem(current_node)}
        //             </AccordionDetails>
        //         </Accordion>
        //     );

        //     els.push(e);
        // }

        return a;
    }

    const createListItem = (node : INodeBase) =>
    {
        return (
            <ListItem 
                selected={node.index == getSelectedNode()?.index} 
                onClick={(e) => clickNode(node)} 
                key={node.index} 
                disablePadding>
                <ListItemButton>
                    <ListItemText>{node.name}</ListItemText>
                </ListItemButton>
            </ListItem>);
    }

    return (
        
        <>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>サービス</AccordionSummary>
            <AccordionDetails>
                
                <List disablePadding> 
                {
                    getTemplates().map((node, index) =>  createListItem(node))
                }         
                </List>

            </AccordionDetails>
        </Accordion>

        {
            createTemplatesAccordion()
        }

        </>
    );
}

export default TemplatePicker;