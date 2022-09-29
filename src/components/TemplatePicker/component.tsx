import * as React from "react";
import { Card, Container, Paper, Stack, styled } from "@mui/material";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function TemplatePicker()
{
    return (
        <Stack direction="row" alignItems="stretch" justifyContent="flex-start" spacing={2}>
            <Item>
                <Card variant="outlined">aaa</Card>
            </Item>
            <Item>
                <Card variant="outlined">aaa</Card>
            </Item>
            <Item>
                <Card variant="outlined">aaa</Card>
            </Item>
        </Stack>
    );
}

export default TemplatePicker;