import { useState,useEffect } from 'react';
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
  const [i,seti]=useState(18);             
  const [string,setstring]=useState(data[i].text)
  const [timeleft,settimeleft]=useState(timeinput);

  function handleinputchange(e){
    if(timetaken)
      return;
    if(starttime===0){
      start();
    }
    if(string===e.target.value){
      setinputvalue("");
      console.log("Now we will change the i =",i);
      seti(i+1);
      console.log("Changed value of i is ,",i);
      setstring(data[i].text);
      console.log("Now the changed string is ",string);
      return;
    }
    if(e.target.value.length===49)
      setinputvalue(inputvalue+" ")
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
          <select>
            <option>Basic</option>
            <option>Intermediate</option>
            <option>Advanced</option>
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
        <div className={`result  ${timetaken && "d-none"}`}>
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
        </div>
        <img src={keyboard} alt='keyboard' className={` keyboard image ${timetaken===0?"":"d-none"}`}/>
      </div>
    </>
  );
}

export default App;
