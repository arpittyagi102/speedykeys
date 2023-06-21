import React, { useState,useEffect } from 'react';
import './App.css';
import keyboard from './Asset/keyboard-image.png';
import data from './Asset/data.json';

function App() {

  const [wrong,setwrong]=useState(false);
  const [inputvalue, setinputvalue]=useState("");
  const [timeinput,settimeinput]=useState(30);
  const [starttime,setstarttime]=useState(0);
  const [timetaken,settimetaken]=useState(0);
  const [correct,setcorrect]=useState(0)
  const [incorrect,setincorrect]=useState(0);
  const [i,seti]=useState(4);             
  const [string,setstring]=useState(data[i].text)
  const [timeleft,settimeleft]=useState(timeinput);
  const [diffinput,setdiffinput]=useState(18);

  function restart(){
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
  
  function handleinputchange(e){
    if(timetaken)
      return;
    if(starttime===0){
      start();
    }
    if(string===e.target.value){
      setinputvalue("");
      seti(prevIndex => prevIndex + 1)
      return;
    }
    /* if(e.target.value.length===49)
      setinputvalue(inputvalue+" ") */
    if(!string.startsWith(e.target.value)){
      setwrong(true);
      setTimeout(() => setwrong(false), 500);
      setincorrect(incorrect+1);
      return;
    }
    setinputvalue(e.target.value);
    setcorrect(correct+1);
  }

  useEffect(() => {
    if (i < data.length) {
      if(data[i])
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


  function start(){
    setstarttime(Date.now());
    setTimeout(() => {
      completed();
    }, timeinput*1000);  
    settimeleft(timeinput);
  }

  function completed(){
    var endtime=Date.now();
    settimetaken((endtime-starttime)/1000);
  }

  return (
    <>
      <div className='outer'>
        {starttime===0 ? 
        (
          <h1 style={{textAlign:"center"}}>Speedy Keys</h1>
        ):(
          <h1 style={{textAlign:"center"}}>{timeleft}</h1>
        )}
        <div className='dropdowns'>
          <select value={diffinput} onChange={restartbydiffinput}>
            <option value={0}>Basic</option>
            <option value={19}>Intermediate</option>
            <option value={30}>Advanced</option>
          </select>
          <select value={timeinput} onChange={(e)=>{settimeinput(e.target.value)}}>
            <option value="30">00:30</option>
            <option value="60">01:00</option>
            <option value="120">02:00</option>
            <option value="300">05:00</option>
          </select>
        </div>
        <div className={`question ${wrong?'wrong':''}`}>
          {string}
        </div>
        <textarea className='answer' 
              value={inputvalue} 
              onChange={handleinputchange}
              autoFocus
              />
        <div className={`result  ${ timetaken===0 && "d-none"}`}>
          <div className='wpm'>
            {Math.round((correct*12)/timeinput)} wpm
          </div>
          <div className='accuracy box-down'>
            <div className='parameter'>Gross Speed</div> 
            <div className="value">{Math.round(((correct+incorrect)*12)/timeinput)}</div> 
          </div>
          <div className='accuracy box-down'>
            <div className='parameter'>Accuracy</div> 
            <div className="value">{Math.round(((correct)/(incorrect+correct))*100)}%</div> 
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
              <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}><g transform="scale(5.12,5.12)"><path d="M25,2c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175c10.51712,0 19,8.48288 19,19c0,10.51712 -8.48288,19 -19,19c-10.51712,0 -19,-8.48288 -19,-19c0,-5.4758 2.30802,-10.39189 6,-13.85547v3.85547c-0.0102,0.72127 0.36875,1.39216 0.99175,1.75578c0.623,0.36361 1.39351,0.36361 2.01651,0c0.623,-0.36361 1.00195,-1.0345 0.99175,-1.75578v-11h-11c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h4.52539c-4.61869,4.20948 -7.52539,10.27232 -7.52539,17c0,12.67888 10.32112,23 23,23c12.67888,0 23,-10.32112 23,-23c0,-12.67888 -10.32112,-23 -23,-23z"></path></g></g>
            </svg>
          </div>
        </div>
        <img src={keyboard} alt='keyboard' className={`keyboard image ${timetaken!==0 && "d-none"}`}/>
      </div>
    </>
  );
}

export default App;
