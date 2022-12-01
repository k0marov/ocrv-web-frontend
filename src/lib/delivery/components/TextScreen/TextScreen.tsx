import React, { useContext } from 'react';
import { TextInfo } from '../../../domain/service/TextsService';
import { LoadedState, TextsContext, TextsState } from '../../../domain/state/TextsBloc';
import { MediaRecorderContainer } from './MediaRecorder/MediaRecorderContainer';
import "./TextScreen.css";


export interface LoadedTextScreenProps {
    state: LoadedState,
}

export function LoadedTextScreen({state} : LoadedTextScreenProps) {
    if (state.currentInd === -1) {
        return <p>You have recorded all of the texts.</p>;
    }
    const text = state.texts[state.currentInd];
    return (
        <div>
            <TextTitle text={text} />
            <TextInfoComponent text={text} /> 
        </div>
    );
}

export interface TextProps {
    text: TextInfo,
}


function TextTitle({text}: TextProps) {
    return <h1>Задача №{text.id}</h1>;
}

function TextInfoComponent({text}: TextProps) {
    return (
        <div id="textInfo">
            <section id="text" className='card'>
                <h2>Текст для записи</h2>
                <p>{text.text}</p>
            </section>
            <div id="notesSection">
                <section id="notes" className='card'>
                    <h2>Заметки</h2>
                    <p>{text.note}</p>
                </section>
                <MediaRecorderContainer />
            </div>
        </div>
    );
}