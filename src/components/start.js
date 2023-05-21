import './start.css';

const Start = (props) => {

/*     let startGame = () => {
        let start = document.getElementById('start');
        start.style.display = 'none';
        document.body.style.overflow = 'auto'; // remove body overflow to enable scrolling
        
    } */


    const lowerStartGame = () => {
        props.setMode('lower');
        props.startTimer();
        /* setTimeout(() => startGame(), 500); */
      };

      const upperStartGame = () => {
        props.setMode('upper');
        props.startTimer();
        /* setTimeout(() => startGame(), 500); */
      };

    

    return (
        <div id='start'>
            <button id='startBtn' onClick={upperStartGame}>ABC</button>
            <button id='startBtn' onClick={lowerStartGame}>abc</button>
        </div>
    )

}


export default Start;
