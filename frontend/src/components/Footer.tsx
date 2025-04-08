import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer py-3 bg-light">
            <div className="container text-center">
                <p className="copyright mb-0">
                    © {new Date().getFullYear()} Your Company Name. All rights
                    reserved.
                </p>
                <p className="mb-0">
                    <a href="/privacyPolicy" className="privacy-link">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
