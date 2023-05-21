import './gameover.css';

const GameOver = (props) => {

    let restartGame = () => {
        props.setMode('startMenu');
    }

    return (
        <div id='gameover'>
            <div id='gameoverPopup'>
                <p>Congratulation! Your time is {props.timeRecord}.</p>
                <button id='restartBtn' onClick={restartGame}>Play again?</button>
            </div>
        </div>
    )

}

export default GameOver;
