import { useState } from 'react';
import './App.css';

function App() {
  const [typingstatus,settypingstatus]=useState(true);
  const string="a quick brown fox jumps over the lazy dog";
  function handleinputchange(e){
    if(!string.startsWith(e.target.value)){
      settypingstatus(false);
    }
    else{
      settypingstatus(true);
    }
  }
  return (
    <>
      <div className='outer'>
        <h1 style={{textAlign:"center"}}>Speedy Keys</h1>
        <div className='question-lines'>
          a quick brown fox jumps over the lazy dog
        </div>
        <div className={`input-outer ${typingstatus?"true":"false"}`}>
          <input className="main-input"  onChange={handleinputchange}/>
        </div>
      </div>
    </>
  );
}

export default App;
