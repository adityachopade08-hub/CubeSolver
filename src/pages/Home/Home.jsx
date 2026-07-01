import "./Home.css";
import Hero from "../../components/Hero/Hero";
import Button from "../../components/Button/Button";

function Home() {
    return (
        <main className="home">
            <Hero />

            <div className="buttons">

                <Button text="Play Cube" to="/play" />

                <Button text="Solve Cube" to="/solve" />

                <Button text="Learn" to="/learn" />

                <Button text="Settings" to="/settings" />

            </div>
        </main>
    );
}

export default Home;