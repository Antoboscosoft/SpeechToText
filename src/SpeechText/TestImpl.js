import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios or another HTTP client
// import './Testing.css';

function TestImpl() {


     // useStates: 
     const [noteContent, setNoteContent] = useState('');
     const [instructions, setInstructions] = useState('Press the Start Recognition button and allow access.');
     const [notes, setNotes] = useState([]);
     const [recognition, setRecognition] = useState(null);
     const [isRecognizing, setIsRecognizing] = useState(false);
     const [chatGPTResponse, setChatGPTResponse] = useState('');
     const apiKey = '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'; // Replace with your actual OpenAI API key
     // const apiKey = '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'; // chatgpt version 3 API key
     let noteCounter = 1;
 
 
 
 
 
     // useEffects:
     //1. Exception 
     useEffect(() => {
         const initRecognition = () => {
             try {
                 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                 const recognition = new SpeechRecognition();
                 recognition.continuous = true;
                 setRecognition(recognition);
             } catch (e) {
                 console.error(e);
                 setInstructions('Sorry, Your Browser Doesn\'t Support the Web Speech API. Try Opening This Demo In Google Chrome.');
             }
         };
         initRecognition();
         setNotes(getAllNotes());
     }, []);
 
     //2. VoiceRecog
     useEffect(() => {
         if (recognition) {
             recognition.onstart = () => {
                 setInstructions('Voice recognition activated. Try speaking into the microphone.');
                 setIsRecognizing(true);
             };
 
             recognition.onspeechend = () => {
                 setInstructions('You were quiet for a while so voice recognition turned itself off.');
                 setIsRecognizing(false);
             };
 
             recognition.onresult = (event) => {
                 const current = event.resultIndex;
                 const transcript = event.results[current][0].transcript;
                 setNoteContent((prevContent) => prevContent + transcript);
             };
 
             recognition.onerror = (event) => {
                 if (event.error === 'no-speech') {
                     setInstructions('No speech was detected. Try again.');
                     setIsRecognizing(false); // Set recognition state to false
                 }
             };
         }
     }, [recognition]);
 
 
 
 
     // Functions:
     // Save Note:
     const saveNote = (dateTime, content) => {
         localStorage.setItem('note-' + dateTime, content);
         setNotes(getAllNotes());
     };
 
     // Delete Note:
     const deleteNote = (dateTime) => {
         localStorage.removeItem('note-' + dateTime);
         // renderNotes(getAllNotes());
         setNotes(getAllNotes());
     };
 
     // Start Recording:
     const startRecording = () => {
         if (noteContent.length) {
             setNoteContent(noteContent + ' ');
         }
         recognition.start();
         // setIsRecognizing(true);
     };
 
     // Pause Recording
     const pauseRecording = () => {
         recognition.stop();
         setInstructions('Voice recognition paused.');
         setIsRecognizing(false);
     };
 
     // OnTextArea Change:
     const onNoteTextareaChange = (event) => {
         setNoteContent(event.target.value);
     };
 
     // Save note
     const onSaveNote = () => {
         recognition.stop();
         if (!noteContent.length) {
             setInstructions('Could not save an empty note. Please add a message to your note.');
         } else {
             const dateTime = new Date().toLocaleString();
             // saveNote(new Date().toLocaleString(), noteContent);
             saveNote(dateTime, noteContent);
             setNoteContent('');
             // renderNotes(getAllNotes());
             setNotes(getAllNotes());
             setInstructions('Note saved successfully.');
         }
     };
 
     // Copy Clipboard
     const copyToClipboard = () => {
         const textarea = document.getElementById('note-textarea');
         if (textarea) {
             textarea.select();
             document.execCommand('copy');
         }
     }
 
     // Update the renderNotes function as follows:
     const renderNotes = (notes) => {
         return notes.map((note, index) => (
             <li key={index} className="note">
                 <p className="header">
                     <span className="date">{note.date}</span>
                     <a href="#" className="listen-note" title="Listen to Note" onClick={() => readOutLoud(note.content)}>
                         Listen to Note
                     </a>
                     <a href="#" className="delete-note" title="Delete" onClick={() => deleteNote(note.date)}>
                         Delete
                     </a>
                 </p>
                 <p className="content">{note.content}</p>
             </li>
         ));
     };
 
     // read out message
     const readOutLoud = (message) => {
         const speech = new SpeechSynthesisUtterance();
         speech.text = message;
         speech.volume = 1;
         speech.rate = 1;
         speech.pitch = 1;
         window.speechSynthesis.speak(speech);
     };
 
     // get all the notes
     const getAllNotes = () => {
         const notes = [];
         for (let i = 0; i < localStorage.length; i++) {
             const key = localStorage.key(i);
             if (key.substring(0, 5) === 'note-') {
                 notes.push({
                     date: key.replace('note-', ''),
                     content: localStorage.getItem(localStorage.key(i))
                 });
             }
         }
         return notes;
     };
 
     // Handle Voice Command:
     const handleVoiceCommand = () => {
         alert("Hii nanba..!")
     }
 
     // 02. method: ():
     // ChatGpt Integration
     const callGPT3API = async (text) => {
         try {
             const desireText = "Convert as minutes of meeting: \n";
             const DesireOutputText = desireText + text;
 
             const chatGPTResponse = await axios.post(
                 'https://api.openai.com/v1/chat/completions',
                 {
                     model: 'gpt-3.5-turbo',
                     messages: [{ role: 'user', content: DesireOutputText }],
                     temperature: 0.7,
                 },
                 {
                     headers: {
                         'Content-Type': 'application/json',
                         Authorization: `Bearer ${apiKey}`,
                     },
                 }
             );
             // Handle the response as needed
             console.log("chat res", chatGPTResponse.data.choices[0].message.content);
             setChatGPTResponse(chatGPTResponse.data.choices[0].message.content);
             // setResponse(chatGPTResponse.data.choices[0].message.content);
         } catch (error) {
             console.error('Error calling GPT-3:', error);
         }
     };
 
 
     // const handleSubmit = (e) => {
     //     e.preventDefault(); // Prevent the form from submitting and reloading the page
     //     callGPT3API(noteContent);
     // };
 
     // Call handleCopyAndSendToChatGPT
     const handleCopyAndSendToChatGPT = (e) => {
         e.preventDefault(); // Prevent the form from submitting and reloading the page
         callGPT3API(noteContent);
     };
 
 


  return (
    <div className='testing_main container'>
            <div className="left-column">
                <h1>Speech Recognition Notes(Microphone)</h1>
                {/* <p className="page-description">
                    A tiny app that allows you to take notes by recording your voice
                </p> */}
                {/* <p className="tz-link">
                    <a
                        href="https://tutorialzine.com/2017/08/converting-from-speech-to-text-with-javascript"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read the full article on Tutorialzine »
                    </a>
                </p> */}
                <h3 className="no-browser-support">{instructions}</h3>
                {/* <form onSubmit={handleSubmit}> */}
                <div className='app'>
                    <button
                        id="start-record-btn"
                        title="Start Recording"
                        onClick={startRecording}
                        className='me-2'
                        disabled={isRecognizing}
                    >
                        Start Recognition
                    </button>
                    <button
                        id="pause-record-btn"
                        title="Pause Recording"
                        onClick={pauseRecording}
                        className='me-2'
                        disabled={!isRecognizing}
                    >
                        Pause Recognition
                    </button>
                    <button
                        id="save-note-btn"
                        title="Save Note"
                        onClick={onSaveNote}
                    >
                        Save Note
                    </button>
                    <h3 className='mt-2'>Add New Note</h3>
                    <div className='input-single'>
                        <textarea
                            id='note-textarea'
                            placeholder='Create a new note by typing or using voice recognition.'
                            rows={10} cols={70}
                            className='form-control w-100'
                            value={noteContent}
                            onChange={onNoteTextareaChange}
                        ></textarea>
                    </div>
                    <div className='card mt'>
                        <textarea
                            id='chatGPT-response'
                            rows={10} cols={70}
                            value={chatGPTResponse}
                            readOnly
                            placeholder='ChatGPT Response'
                            className='form-control w-100'></textarea>
                    </div>
                    <div className='copy-button'>
                        <button onClick={copyToClipboard} className=''>Copy To Clipboard</button>
                        <button className='copy-execute' onClick={() => handleVoiceCommand()}>Execute</button>
                        <button className='copy-execute' onClick={handleCopyAndSendToChatGPT}>ChatGPT</button>
                    </div>
                    <p id="recording-instructions" style={{ color: 'orange' }}>{instructions}</p>
                </div>
                {/* </form> */}
            </div>
            <div className='right-column'>
                <div className='card-header myNote'>
                    <h3 className='ml-4'>My Notes</h3>
                </div>
                {/* <ul id="notes">{renderNotes(notes)}</ul> */}
                <div className='card-body right-fix '>
                    {/* <ul id='notes'>
                        {notes.map(() => (
                            <li key={note.id}>
                                <a
                                    href='#'
                                    onClick={() => setNoteContent(note.content)}>
                                        {note.id}
                                    </a>
                            </li>
                        ))}
                    </ul> */}



                    <ol id="notes">{renderNotes(notes)}</ol>
                </div>
            </div>

        </div>
  )
}

export default TestImpl