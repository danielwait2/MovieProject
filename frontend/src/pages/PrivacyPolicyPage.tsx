import 'bootstrap/dist/css/bootstrap.min.css';
import './PrivacyPolicyPage.css';
import Footer from '../components/Footer';

const PrivacyPolicyPage = () => {
    return (
        <>
            
            <div className="container my-5 privacy-policy-page">
                <h1 className="mb-4">Privacy Policy</h1>
                <p className="text-muted">Last updated: April 7, 2025</p>

                <p>
                    Welcome to our Privacy Policy. Your privacy is important to
                    us. We collect the information you provide directly (such as
                    your name, email, and phone number), as well as data
                    automatically gathered from your device (including your IP
                    address, browser type, and browsing behavior). We use
                    cookies and tracking technologies to enhance your
                    experience, analyze usage, and personalize content. This
                    information helps us operate and improve our website and
                    services, respond to customer inquiries, and comply with
                    legal obligations. We do not sell or rent your data;
                    however, it may be shared with trusted service providers,
                    legal authorities when required, or as part of business
                    transfers.
                </p>

                <p>
                    We implement strong security measures to safeguard your
                    personal information and retain it only as long as
                    necessary. Depending on your location, you may have rights
                    to access, update, or delete your data. To exercise these
                    rights, please contact us at{' '}
                    <a href="mailto:cineniche@movies.com">
                        cineniche@movies.com
                    </a>
                    . Our services are not directed to children under 13, and
                    any inadvertently collected data will be promptly removed.
                    We may update this Privacy Policy periodically, with
                    significant changes posted on this page.
                </p>

                <p>
                    For further assistance, please reach out via email{' '}
                    <a href="mailto:cineniche@movies.com">
                        cineniche@movies.com
                    </a>
                    ,
                    <br />
                    phone at (123) 456-7890,
                    <br /> or visit us at 123 Main Street, Anytown, USA.
                </p>
                <Footer />
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
