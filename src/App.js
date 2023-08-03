import React, { useState, useEffect } from 'react';
import './App.css';
import keyboard from './Asset/keyboard-image.png';
import keyboardlight from './Asset/KeyboardLight.jpg';
import data from './Asset/data.json';

function App() {

  const [wrong, setwrong] = useState(false);
  const [inputvalue, setinputvalue] = useState("");
  const [timeinput, settimeinput] = useState(30);
  const [starttime, setstarttime] = useState(0);
  const [timetaken, settimetaken] = useState(0);
  const [correct, setcorrect] = useState(0)
  const [incorrect, setincorrect] = useState(0);
  const [i, seti] = useState(0);
  const [string, setstring] = useState(data[i].text)
  const [timeleft, settimeleft] = useState(timeinput);
  const [diffinput, setdiffinput] = useState(18);
  const [mode, setMode] = useState(false)

  function restart() {
    setinputvalue("");
    setstarttime(0);
    settimetaken(0);
    setcorrect(0);
    setincorrect(0);
    seti(diffinput);
  }
  
  function restartbydiffinput(e){
    const newValue = parseInt(e.target.value)
    setdiffinput(newValue);
    setinputvalue("");
    setstarttime(0);
    settimetaken(0);
    setcorrect(0);
    setincorrect(0);
    seti(newValue);
  }

  function handleinputchange(e) {
    if (timetaken)
      return;
    if (starttime === 0) {
      start();
    }
    if (string === e.target.value) {
      setinputvalue("");
      seti(prevIndex => prevIndex + 1)
      return;
    }
    /* if(e.target.value.length===49)
      setinputvalue(inputvalue+" ") */
    if(!string.startsWith(e.target.value)){
      setwrong(true);
      setTimeout(() => setwrong(false), 500);
      setincorrect(incorrect + 1);
      return;
    }
    setinputvalue(e.target.value);
    setcorrect(correct + 1);
  }

  useEffect(() => {
    if (i < data.length) {
      if (data[i])
        setstring(data[i].text);
    }
  }, [i]);

  useEffect(() => {
    let interval = null;
    if (timeleft > 0) {
      interval = setInterval(() => {
        settimeleft(timeleft => timeleft - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timeleft]);


  function start() {
    setstarttime(Date.now());
    setTimeout(() => {
      completed();
    }, timeinput * 1000);
    settimeleft(timeinput);
  }

  function completed() {
    var endtime = Date.now();
    settimetaken((endtime - starttime) / 1000);
  }

  return (
    <>
      <div className={`outer ${mode===true?"light":""}`}>
        {starttime === 0 ?
          (
            <h1  className={`Heading ${mode===true?"Headinglight":""}`}>Speedy Keys</h1>
          ) : (
            <h1 className={`time ${mode===true?"timeLight":""}`}>{timeleft}</h1>
          )}
          {
            mode===false?(
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={50} height={50} viewBox="0,0,256,256" style={{fill: '#000000',position:"absolute",top:"10px",right:"10px"}} onClick={()=>{setMode(true)}}>
                <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth={1} strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={10} strokeDasharray strokeDashoffset={0} fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}><g transform="scale(5.12,5.12)"><path d="M24.90625,3.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953zM10.65625,9.84375c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.20703,-0.22266 -0.50781,-0.33594 -0.8125,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0zM39.03125,9.84375c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.3125,-0.29687 0.40234,-0.76172 0.21875,-1.15234c-0.1875,-0.39453 -0.60156,-0.62109 -1.03125,-0.56641zM25,15c-5.51562,0 -10,4.48438 -10,10c0,5.51563 4.48438,10 10,10c5.51563,0 10,-4.48437 10,-10c0,-5.51562 -4.48437,-10 -10,-10zM4.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM38.71875,24c-0.55078,0.07813 -0.9375,0.58984 -0.85937,1.14063c0.07813,0.55078 0.58984,0.9375 1.14063,0.85938h6c0.35938,0.00391 0.69531,-0.18359 0.87891,-0.49609c0.17969,-0.3125 0.17969,-0.69531 0,-1.00781c-0.18359,-0.3125 -0.51953,-0.5 -0.87891,-0.49609h-6c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM15,33.875c-0.22656,0.03125 -0.4375,0.14453 -0.59375,0.3125l-4.25,4.25c-0.29687,0.24219 -0.43359,0.62891 -0.34766,1.00391c0.08594,0.37109 0.37891,0.66406 0.75,0.75c0.375,0.08594 0.76172,-0.05078 1.00391,-0.34766l4.25,-4.25c0.29688,-0.28516 0.38672,-0.72656 0.22656,-1.10547c-0.15625,-0.37891 -0.53516,-0.62109 -0.94531,-0.61328c-0.03125,0 -0.0625,0 -0.09375,0zM34.6875,33.875c-0.375,0.06641 -0.67578,0.33984 -0.78125,0.70313c-0.10547,0.36719 0.00391,0.75781 0.28125,1.01563l4.25,4.25c0.24219,0.29688 0.62891,0.43359 1.00391,0.34766c0.37109,-0.08594 0.66406,-0.37891 0.75,-0.75c0.08594,-0.375 -0.05078,-0.76172 -0.34766,-1.00391l-4.25,-4.25c-0.1875,-0.19922 -0.44531,-0.30859 -0.71875,-0.3125c-0.03125,0 -0.0625,0 -0.09375,0c-0.03125,0 -0.0625,0 -0.09375,0zM24.90625,37.96875c-0.04297,0.00781 -0.08594,0.01953 -0.125,0.03125c-0.46484,0.10547 -0.79297,0.52344 -0.78125,1v6c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-6c0.01172,-0.28906 -0.10547,-0.56641 -0.3125,-0.76172c-0.21094,-0.19922 -0.49609,-0.29687 -0.78125,-0.26953z" /></g></g>
              </svg>
            ):(
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 128 128" style={{position:"absolute",top:"10px",right:"10px"}} onClick={()=>{setMode(false)}}><path d="M24.93 97.563a47.669 47.669 0 0 0 37.77 16.793 48.152 48.152 0 0 0 46.657-46.664 47.668 47.668 0 0 0-16.793-37.764 1.992 1.992 0 0 0-3.232 1.942 52.529 52.529 0 0 1 1.222 15.713 51.944 51.944 0 0 1-47.993 47.971 52.532 52.532 0 0 1-15.689-1.223 1.991 1.991 0 0 0-1.942 3.232z" /><path d="m34.386 63.716 3.579 3.484a3.478 3.478 0 0 1 1 3.079l-.845 4.926a1 1 0 0 0 1.446 1.051l4.424-2.326a3.478 3.478 0 0 1 3.237 0l4.423 2.326a1 1 0 0 0 1.45-1.047l-.845-4.926a3.477 3.477 0 0 1 1-3.078l3.579-3.489a1 1 0 0 0-.552-1.7l-4.95-.716a3.477 3.477 0 0 1-2.618-1.9L46.5 54.913a1 1 0 0 0-1.787 0L42.5 59.395a3.478 3.478 0 0 1-2.619 1.9l-4.946.719a1 1 0 0 0-.549 1.702zM41.747 31.576a2.055 2.055 0 0 1-.25-.015l-14.629-1.822a2 2 0 0 1-.966-3.575L36.343 18.2l-8.525-1.14A2.064 2.064 0 0 1 26 15.294a2.007 2.007 0 0 1 2.255-2.214l13.412 1.794a2 2 0 0 1 .948 3.572l-10.394 7.929 9.707 1.208a2 2 0 0 1-.181 3.993zM64.014 40.938a2.055 2.055 0 0 1-.25-.015l-12.7-1.581a2 2 0 0 1-.966-3.575l8.555-6.527-6.755-.9a2.064 2.064 0 0 1-1.82-1.767 2.008 2.008 0 0 1 2.255-2.21l11.641 1.558a2 2 0 0 1 .948 3.573l-8.5 6.488 7.775.968a2 2 0 0 1-.18 3.993z" /></svg>
            )
          }
          
        <div  className={`dropdowns ${mode===true?"DropdownLight":""}`}>
          <select value={diffinput} onChange={restartbydiffinput}>
            <option value={0}>Basic</option>
            <option value={19}>Intermediate </option>
            <option value={30}>Advanced</option>
          </select>
          <select value={timeinput} onChange={(e) => { settimeinput(e.target.value) }}>
            <option value="30">00:30</option>
            <option value="60">01:00</option>
            <option value="120">02:00</option>
            <option value="300">05:00</option>
          </select>
        </div>
        <div className={`question ${wrong ? 'wrong' : ''} ${mode===true?"questionLight":""}`}>
          {string}
        </div>
        <textarea className={`answer ${mode===true?"answerLight":""}`}
          value={inputvalue}
          onChange={handleinputchange}
          autoFocus
        />
        <div className={`result  ${timetaken === 0 && "d-none"} ${mode===true?"resultLight":""}`}>
          <div className='wpm'>
            {Math.round((correct * 12) / timeinput)} wpm
          </div>
          <div className='accuracy box-down'>
            <div className='parameter'>Gross Speed</div>
            <div className="value">{Math.round(((correct + incorrect) * 12) / timeinput)}</div>
          </div>
          <div className='accuracy box-down'>
            <div className='parameter'>Accuracy</div>
            <div className="value">{Math.round(((correct) / (incorrect + correct)) * 100)}%</div>
          </div>
          <div className='correct box-down'>
            <div className='parameter'>Correct Characters</div>
            <div className="value">{correct}</div>
          </div>
          <div className="incorrect box-down">
            <div className='parameter'>Incorrect Characters</div>
            <div className="value">{incorrect}</div>
          </div>
          <div className="time box-down">
            <div className='parameter'>Time Taken</div>
            <div className="value">{Math.round(timeinput)} s</div>
          </div>
          <div className='refresh box-down'>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256" className='refresh-icon' onClick={restart}>
              <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(5.12,5.12)"><path d="M25,2c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175c10.51712,0 19,8.48288 19,19c0,10.51712 -8.48288,19 -19,19c-10.51712,0 -19,-8.48288 -19,-19c0,-5.4758 2.30802,-10.39189 6,-13.85547v3.85547c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-11h-11c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h4.52539c-4.61869,4.20948 -7.52539,10.27232 -7.52539,17c0,12.67888 10.32112,23 23,23c12.67888,0 23,-10.32112 23,-23c0,-12.67888 -10.32112,-23 -23,-23z"></path></g></g>
            </svg>
          </div>
        </div>
        <img src={`${mode===true?keyboardlight:keyboard}`} alt='keyboard' className={`keyboard image ${timetaken !== 0 && "d-none"} `} />
      </div>
    </>
  );
}

export default App;
