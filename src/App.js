import logo from './logo.svg';
import './App.css';
import SpeechComponent from './SpeechText/SpeechComponent';
import Transaction from './SpeechText/Transaction';
import TestImpl from './SpeechText/TestImpl';
import Testing from './SpeechText/Testing';
import SpeechPOC from './SpeechText/SpeechPOC';
import { useState } from 'react';
import S1 from './SpeechText/S1';
import S2 from './SpeechText/S2';
import S3 from './SpeechText/S3';
import S4 from './SpeechText/S4';
import S5 from './SpeechText/S5';

function App() {



  const [showOverlay, setShowOverlay] = useState(true);


  const handleOverlayClick = () => {
    setShowOverlay(false);
  };


  return (
    <div className="App" onClick={handleOverlayClick}>

      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}> 
          <div className='entryImage text-white'  alt="Click to continue" >
            <p className='textOnImg'>Speech To Text</p>
            <code className='fw-bold headlineOnImg'>Example:</code>
            <h6 className='instructOnImg1'>What you are speaking,</h6>
            <h6 className='instructOnImg2'>the speech will be converted </h6>
            <h6 className='instructOnImg3'> to text and  shown to you. </h6>
            <h6 className='instructOnImg4'> You can have an example demo of it.</h6>
          🌟

            <h4 className='clickanywhereOnImg'>Click on the page to have a demo..!</h4>
            </div>
          {/* <p>Click anywhere to continue</p> */}
        </div>
      )}

{ !showOverlay &&(
      <header className="">
        {/* <SpeechComponent/> */}
        {/* <Transaction /> */}
        {/* <Testing /> */}
        {/* <SpeechPOC /> */}
        {/* <S1/> */}
        {/* <S2/> */}
        <S3/>
        {/* <S4/> */}
        {/* <S5/> */}
        {/* <TestImpl/> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>)}
    </div>
  );
}

export default App;
