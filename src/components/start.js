import './start.css';

const Start = (props) => {

    let startGame = () => {
        let start = document.getElementById('start');
        start.style.display = 'none';
        document.body.style.overflow = 'auto'; // remove body overflow to enable scrolling
        props.countdownAdvances();
    }


    const lowerStartGame = () => {
        props.setMode('lower');
        setTimeout(startGame, 500)
    }

    

    return (
        <div id='start'>
            <button id='startBtn' onClick={startGame}>Upper Case</button>
            <button id='startBtn' onClick={lowerStartGame}>Lower Case</button>
        </div>
    )

}


export default Start;
