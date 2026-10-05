import { Link } from "react-router-dom";
import "./NotFound.css";

export function NotFound() {
    return (
        <main className="not-found-page">
            <div className="not-found-content">
                <p className="not-found-code">404</p>
                <h1>Page not found</h1>
                <p className="not-found-message">We couldn't find the page you were looking for.</p>
                <Link className="not-found-home" to="/">Back to Login</Link>
            </div>
        </main>
    );
}