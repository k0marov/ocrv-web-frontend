import { useContext } from "react";
import { Recording, MediaRecordingState, Recorded } from "../../../domain/state/MediaRecorderState";
import "./MediaRecorder.css";
import { Actions } from "./Actions/Actions";
import { formatDuration } from "../../../../../core/utils/utils";

export interface RecordingCallbacks {
    onRecorded: (retries: number, recording: Blob) => void,
    onSkipped: (retries: number) => void,
}

export interface MediaRecorderProps {
    state: MediaRecordingState,
}

export function MediaRecorder({state} : {state: MediaRecordingState}) {
    return (
        <section id="recording">
            <RecordingInfo state={state} />
            <Actions state={state} />
        </section>
    )
}

function RecordingInfo({ state }: { state: MediaRecordingState }) {
    const fromDur = state.base.minDuration ? 
        <span>От <span className="recordingIndicator">{formatDuration(state.base.minDuration)}</span></span>
    :   <></>;
    const toDur = state.base.maxDuration ? 
        <span>До <span className="recordingIndicator">{formatDuration(state.base.maxDuration)}</span></span>
    :   "";

    return (
        <div id="recordingInfo">
            {state instanceof Recording ? 
                <p>
                    Запись идёт <span className="recordingIndicator">{formatDuration(state.currDuration)}</span>
                </p>
            :   <></>
            }
            {state instanceof Recorded ? 
                <p>
                    Конечная длина: 
                    <span className="recordingIndicator"> {formatDuration(state.rec.duration)}</span>
                </p>
            :   <></>
            }
            {state.base.minDuration || state.base.maxDuration ?
                <span>
                    Требуемая длительность: <br />
                    <span> </span>
                    {fromDur} 
                    <span> </span>
                    {toDur}
                </span>
            :   <></>
            }
        </div>
    );
}