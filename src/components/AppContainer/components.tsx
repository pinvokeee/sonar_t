import React from 'react';
import MainContainer from "../MainContainer/component";
import TemplatePicker from "../TemplatePicker/component";
import { AppToolBar } from "../AppToolBar/component";
import { IUseDirecotryHandleStore, useDirecotryHandleStore } from '../../hooks/useDirecotryHandleStore';
import { Button } from '@mui/material';
import { IUseTemplatesStore, useTemplatesStore } from '../../hooks/useTemplates';
import { IUseTemplatesState, useTemplatesState } from '../../hooks/useTemplatesState';

export const AppContainer = () =>
{
    const chook_dirctoryHandle : IUseDirecotryHandleStore = useDirecotryHandleStore();
    const chook_useTemplatesStore : IUseTemplatesStore = useTemplatesStore();
    const chook_useTemplatesState : IUseTemplatesState = useTemplatesState();

    return (
        <>
        <AppToolBar useDirecotryHandleStore={chook_dirctoryHandle} useTemplatesStore={chook_useTemplatesStore}></AppToolBar>
        <MainContainer>
            <TemplatePicker useTemplatesStore={chook_useTemplatesStore} useTemplatesState={chook_useTemplatesState}></TemplatePicker>
        </MainContainer>
        </>
    );
}