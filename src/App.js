import './App.css';
import {useState, useEffect, useRef} from 'react';
import Start from './components/start';
import Replay from '@mui/icons-material/Replay';
import GameOver from './components/gameover';
import { set } from 'date-fns/esm';

function App() {

  
  const [mode, setMode ] = useState('startMenu');
  const [startTime, setStartTime ] = useState('');

  let timeRecord;

  let startTimer = () => {
    setStartTime(Date.now());
    console.log('timer start')
    console.log(startTime);
  }

  function reportTime() {
    const endTime = Date.now();
    timeRecord = (endTime - startTime)/1000;
    console.log(timeRecord);
    console.log(startTime);
  }

const LetterFactory = (letter) => {
  return { letter,
    sound: '/sounds/' + letter + ".wav",
    status: 'unchosen',
  }
};

const alphabet = [
  LetterFactory('A'), LetterFactory('B'), LetterFactory('C'), LetterFactory('D'), LetterFactory('E'),
  LetterFactory('F'), LetterFactory('G'), LetterFactory('H'), LetterFactory('I'), LetterFactory('J'),
  LetterFactory('K'), LetterFactory('L'), LetterFactory('M'), LetterFactory('N'), LetterFactory('O'),
  LetterFactory('P'), LetterFactory('Q'), LetterFactory('R'), LetterFactory('S'), LetterFactory('T'),
  LetterFactory('U'), LetterFactory('V'), LetterFactory('W'), LetterFactory('X'), LetterFactory('Y'),
  LetterFactory('Z'),
]

function shuffleArray(alphabet) {
  const shuffledArray = [...alphabet];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}


const readLetter = (letter) => {
  const audio = new Audio(process.env.PUBLIC_URL + letter.sound);
  audio.play();
}

let shuffledAlphabet = shuffleArray(alphabet);
let countdownArr = shuffleArray(alphabet);

let currentLetter;
let i=-1;

let countdown = () => {

    return () => {
      i++;
      if (i === 26) {
        endGame();
      } else {
        currentLetter = countdownArr[i]?.letter;
        setTimeout(() => {
          if (i < 26) {
            readLetter(countdownArr[i]);
          }
        }, 1000);
      }
      console.log('current letter: ' + countdownArr[i]?.letter);
      console.log('current letter: ' + currentLetter);
    };
  };
const countdownAdvances = countdown();


const clickLetter = (letter, event) => {
  console.log(letter);
  console.log('current letter: ' + currentLetter);
  if (letter === currentLetter) {
    event.target.classList.add('correct');
    reportTime();
    let congrats = document.getElementById('congrats');
    congrats.textContent = `Congratulations! Your time is ${timeRecord} seconds.`;
    countdownAdvances();
  } else {
    event.target.classList.add('shake')
    setTimeout(() => {
      event.target.classList.remove('shake');
    }, 300);
  }
};




const repeat = () => {
  const audio = new Audio(process.env.PUBLIC_URL + '/sounds/' + currentLetter + ".wav");
  audio.play();
}

useEffect(() => {
  if (mode==='startMenu' || mode==='gameover'){
    return
  } else {
    countdownAdvances();
  }
}, [mode]);

const gameoverScreen = document.getElementById('gameover');

const endGame = () => {
  gameoverScreen.style.display = 'flex';
  
}

const replay = () => {
  gameoverScreen.style.display = 'none';
  const boxes = document.getElementsByClassName('letterBtn');
  Array.from(boxes).forEach(box => {
    box.classList.remove('correct');
  });
  setMode('startMenu');
}



  return (
    <div id='letterContainer'>

      {mode === 'startMenu' && (
        <Start countdownAdvances={countdownAdvances} setMode={setMode} startTimer={startTimer}/>
      )}
      
      
      <div id='gameover'>
            <div id='gameoverPopup'>
                <p id='congrats'></p>
                <button id='restartBtn' onClick={replay}>Play again?</button>
            </div>
      </div>

      {shuffledAlphabet.map((item) => {
        if (mode === 'lower') {
          return (
            <div className='letterBtn' onClick={(event) => clickLetter(item.letter, event)}>
              {item.letter.toLowerCase()}
            </div>)
          }
        else {
        return (
          <div className='letterBtn' onClick={(event) => clickLetter(item.letter, event)}>
            {item.letter}
          </div>)
        }
        })}
        <div id='redoMetaContainer'> <div id='redoContainer'> < Replay onClick={repeat} className='redo'/> <p id='redoLabel'>Replay sound</p> </div> </div>
    </div>
  );
}

export default App;
