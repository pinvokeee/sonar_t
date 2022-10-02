import * as React from "react";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { INodeBase, IUseTemplatesStore } from "../../hooks/useTemplates";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props
{
    useTemplatesStore : IUseTemplatesStore;
}

function TemplatePicker(props : Props)
{
    const getTemplates = () : Array<INodeBase>  =>
    {
        return props.useTemplatesStore.getNodes();
    }

    return (
        <>
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>サービス</AccordionSummary>
            <AccordionDetails>
                
                <List disablePadding>
                    {
                        getTemplates().map((node, index) => 
                        {
                            return (
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemText>{node.name}</ListItemText>
                                    </ListItemButton>
                                </ListItem>);
                        })
                    }
                </List>

            </AccordionDetails>
        </Accordion>
        </>
    );
}

export default TemplatePicker;