import { useEffect, useState } from 'react';
import './App.css';
import keyboard from './Asset/keyboard-image.png';
import data from './Asset/data.json';

function App() {
  const [wrong,setwrong]=useState(false);
  const [inputvalue, setinputvalue]=useState("");
  const [starttime,setstarttime]=useState(0);
  const [timetaken,settimetaken]=useState(0);
  const [correct,setcorrect]=useState(0)
  const [incorrect,setincorrect]=useState(0);
  var string=data[0].text;  
  

  function handleinputchange(e){
    if(starttime===0)
      setstarttime(Date.now());
    if(string===e.target.value)
      completed();
    if(!string.startsWith(e.target.value)){
      setwrong(true);
      setTimeout(() => setwrong(false), 500);
      setincorrect(incorrect+1);
      return;
    }
    setinputvalue(e.target.value);
    setcorrect(correct+1);
  }

  function completed(){
    var endtime=Date.now();
    settimetaken((endtime-starttime)/1000);
  }

  return (
    <>
      <div className='outer'>
        <h1 style={{textAlign:"center"}}>Speedy Keys</h1>
        <div className={`question ${wrong?'wrong':''}`}>
          {string}
        </div>
        <input className='answer' 
              value={inputvalue} 
              onChange={handleinputchange}/>
        <div className={`result  ${timetaken===0?"d-none":""}`}>
          <div className='wpm'>
            {Math.round((correct*12)/timetaken)} wpm
          </div>
          <div className='accuracy box-down'>
            <div className='parameter'>Gross Speed</div> 
            <div className="value">{Math.round(((correct+incorrect)*12)/timetaken)}</div> 
          </div>
          <div className='accuracy box-down'>
            <div className='parameter'>Accuracy</div> 
            <div className="value">{Math.round(((incorrect)/correct)*100)}%</div> 
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
            <div className="value">{timetaken}</div>
          </div>
        </div>
        <img src={keyboard} alt='keyboard' className={` keyboard image ${timetaken===0?"":"d-none"}`}/>
      </div>
    </>
  );
}

export default App;
