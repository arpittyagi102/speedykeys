import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [wrong,setwrong]=useState(false);
  const [inputvalue, setinputvalue]=useState("");
  const [starttime,setstarttime]=useState(0);
  const [timetaken,settimetaken]=useState(0);
  const [mistakes,setmistakes]=useState(0);
  var string="a quick brown fox jumps over the lazy dog";  
  string="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

  function handleinputchange(e){
    if(starttime===0)
      setstarttime(Date.now());
    if(string===e.target.value)
      completed();
    if(!string.startsWith(e.target.value)){
      setwrong(true);
      setTimeout(() => setwrong(false), 500);
      setmistakes(mistakes+1);
      return;
    }
    setinputvalue(e.target.value);
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
        <div>
          Your WPM = {Math.round((string.length*12)/timetaken)}
        </div>
        <div>
          Your accuracy = {Math.round(((string.length-mistakes)/string.length)*100)}
        </div>
      </div>
    </>
  );
}

export default App;
