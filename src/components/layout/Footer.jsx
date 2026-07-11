export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <p>© {currentYear} NovaStore. All rights reserved.</p>
            </div>
        </footer>
    );
}
