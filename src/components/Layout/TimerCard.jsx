import "./TimerCard.css";

function TimerCard({ time }) {

    return (

        <div className="timerCard">

            <p>Timer</p>

            <h1>{time}</h1>

        </div>

    );

}

export default TimerCard;