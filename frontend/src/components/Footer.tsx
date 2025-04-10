import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer py-3">
            <div className="container text-center">
                <p className="copyright mb-0">
                    © {new Date().getFullYear()} CineNiche All rights reserved.
                </p>
                <p className="mb-0">
                    <a href="/privacyPolicy" className="privacy-link me-3">
                        Privacy Policy
                    </a>
                    <a href="/admin" className="privacy-link">
                        Manage
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
