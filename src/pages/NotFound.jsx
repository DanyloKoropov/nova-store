import { Link } from "react-router";

export default function NotFound() {
    return (
        <section className="page not-found-page">
            <div className="container">
                <p className="not-found-code">404</p>
                <h1>Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>

                <Link to="/" className="button-link">
                    Back to Store
                </Link>
            </div>
        </section>
    );
}
