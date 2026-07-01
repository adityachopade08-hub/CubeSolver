import "./Button.css";
import { Link } from "react-router-dom";

function Button({ text, to }) {
    return (
        <Link to={to}>
            <button className="btn">
                {text}
            </button>
        </Link>
    );
}

export default Button;