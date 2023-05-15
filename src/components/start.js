import './start.css';

const Start = (props) => {

    let startGame = () => {
        let start = document.getElementById('start');
        start.style.display = 'none';
        document.body.style.overflow = 'auto'; // remove body overflow to enable scrolling
        props.countdownAdvances();
    }


    return (
        <div id='start'>
            <button id='startBtn' onClick={startGame}>Start</button>
        </div>
    )

}


export default Start;
