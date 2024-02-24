import React from 'react';
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import '../Assets/Stylesheets/S3.css';


function S3() {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const [isCopied, setCopied] = useClipboard(transcript);

    return (
        <div className="Acontainer">
            <h1 className="heading">SpeakToType</h1>
            <h3>
                Transform spoken words into text effortlessly with SpeakToType. Say it,
                and we'll write it for you.
            </h3>
            <p>Listening: {listening ? "Yes" : "No"}</p>
            <div className="textContainer">
                <p>
                    {transcript}
                </p>
            </div>
            <div className="btnContainer">
                <button className="btn"
                    onClick={() => SpeechRecognition.startListening({ continuous: true })}
                >
                    Start Listening
                </button>
                <button className="btn" onClick={() => SpeechRecognition.stopListening()}>
                    Stop Listening
                </button>
                <button className="btn" onClick={resetTranscript}>Clear Text</button>
                <button className="btn" onClick={setCopied}>{isCopied ? "Copied! 👍" : "Copy?"}</button>
            </div>
        </div>
    )
}

export default S3