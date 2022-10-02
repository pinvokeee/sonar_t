import React from 'react';
import MainContainer from "../MainContainer/component";
import TemplatePicker from "../TemplatePicker/component";
import { AppToolBar } from "../AppToolBar/component";
import { IUseDirecotryHandleStore, useDirecotryHandleStore } from '../../hooks/useDirecotryHandleStore';
import { Button } from '@mui/material';
import { IUseTemplatesStore, useTemplatesStore } from '../../hooks/useTemplates';

export const AppContainer = () =>
{
    const chook_dirctoryHandle : IUseDirecotryHandleStore = useDirecotryHandleStore();
    const chook_useTemplatesStore : IUseTemplatesStore = useTemplatesStore();

    return (
        <>
        <AppToolBar useDirecotryHandleStore={chook_dirctoryHandle} useTemplatesStore={chook_useTemplatesStore}></AppToolBar>
        <MainContainer>
            <TemplatePicker useTemplatesStore={chook_useTemplatesStore}></TemplatePicker>
        </MainContainer>
        </>
    );
}