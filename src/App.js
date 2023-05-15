import './App.css';
import {useEffect} from 'react';
import Start from './components/start';

function App() {

const LetterFactory = (letter) => {
  return { letter,
    sound: '/sounds/' + letter + ".wav",
    status: 'unchosen',
  }
};

let alphabet = [
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

const countdownArr = shuffleArray(alphabet);

const readLetter = (letter) => {
  const audio = new Audio(process.env.PUBLIC_URL + letter.sound);
  audio.play();
}

let currentLetter;

let countdown = () => {
  let i=-1;
  return () => {
    i++;
    if (i === 25) {
      alert("game over!")
    } else currentLetter = countdownArr[i].letter;
    setTimeout(readLetter(countdownArr[i]), 1000);
    console.log('current letter: ' + countdownArr[i].letter);
    console.log('current letter: ' + currentLetter)
  }
}

const countdownAdvances = countdown();




let shuffledAlphabet = shuffleArray(alphabet);
console.table(shuffledAlphabet);

const clickLetter = (letter, event) => {
  if (letter === currentLetter) {
    event.target.classList.add('correct');
    countdownAdvances();
  }
}



  return (
    <div id='letterContainer'>
      <Start countdownAdvances={countdownAdvances}/>

      {shuffledAlphabet.map((item) => {
        return (
          <div className='letterBtn' onClick={(event) => clickLetter(item.letter, event)}>
            {item.letter}
          </div>)
      })}
    </div>
  );
}

export default App;
