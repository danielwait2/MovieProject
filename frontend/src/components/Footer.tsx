import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Footer.css';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer py-3">
            <div className="container text-center">
                <p className="copyright mb-0">
                    © {new Date().getFullYear()} CineNiche All rights reserved.
                </p>
                <p className="mb-0">
                    <Link to="/privacyPolicy" className="me-3">
                        Privacy Policy
                    </Link>
                    <Link to="/admin">
                        Manage
                    </Link>
                </p>
            </div>
        </footer>
        
    );
};

export default Footer;
