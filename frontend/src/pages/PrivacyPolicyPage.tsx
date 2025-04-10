import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
    return (
        <>
            <div className="container my-5 privacy-policy-page bg-dark text-white">
                {/* Header Section */}
                <br />
                <header className="mb-5 text-center">
                    <h1 className="display-4">CineNiche Privacy Policy</h1>
                    <p className="text-muted">Last updated: April 9, 2025</p>
                </header>

                {/* Introduction Section */}
                <section className="mb-5">
                    <p className="lead">
                        CineNiche is committed to protecting your privacy. This
                        privacy policy explains how our organization collects,
                        uses, and stores the personal data we collect from you
                        when you use our streaming platform or visit our
                        website.
                    </p>
                </section>

                {/* Topics Section */}

                <hr />

                {/* Data Collection Section */}
                <section className="mb-5">
                    <h2>What data do we collect?</h2>
                    <p>CineNiche collects the following data:</p>
                    <ul className="list-group mb-3">
                        <li className="list-group-item">
                            Personal identification information (Name, email
                            address, phone number, date of birth, etc.)
                        </li>
                        <li className="list-group-item">
                            Payment and billing information (card details,
                            billing address)
                        </li>
                        <li className="list-group-item">
                            User profile details (watchlist, viewing history,
                            ratings, preferences)
                        </li>
                        <li className="list-group-item">
                            Login credentials and authentication tokens
                        </li>
                        <li className="list-group-item">
                            Device information and IP address
                        </li>
                        <li className="list-group-item">
                            Cookies and usage data
                        </li>
                    </ul>
                </section>

                <hr />

                {/* Data Collection Methods Section */}
                <section className="mb-5">
                    <h2>How do we collect your data?</h2>
                    <p>
                        You directly provide CineNiche with most of the data we
                        collect. We collect and process data when you:
                    </p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Register for a CineNiche account
                        </li>
                        <li className="list-group-item">
                            Subscribe to one of our streaming plans
                        </li>
                        <li className="list-group-item">
                            Stream content or browse our platform
                        </li>
                        <li className="list-group-item">
                            Voluntarily complete a survey or provide feedback
                        </li>
                        <li className="list-group-item">
                            Contact our support team
                        </li>
                        <li className="list-group-item">
                            Use your browser’s cookies while visiting our
                            website
                        </li>
                    </ul>
                    <p className="mt-3">
                        CineNiche may also receive your data indirectly from the
                        following sources:
                    </p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Social login providers (e.g., Google or Apple
                            Sign-In)
                        </li>
                        <li className="list-group-item">
                            Advertising or analytics partners
                        </li>
                        <li className="list-group-item">Payment processors</li>
                    </ul>
                </section>

                <hr />

                {/* Data Usage Section */}
                <section className="mb-5">
                    <h2>How will we use your data?</h2>
                    <p>CineNiche collects your data so that we can:</p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Provide personalized streaming services and content
                            recommendations
                        </li>
                        <li className="list-group-item">
                            Process your subscription and manage your account
                        </li>
                        <li className="list-group-item">
                            Improve our platform and customer support
                        </li>
                        <li className="list-group-item">
                            Send you updates about new content, promotions, and
                            service changes
                        </li>
                        <li className="list-group-item">
                            Analyze usage data to enhance user experience and
                            prevent fraud
                        </li>
                    </ul>
                    <p className="mt-3">
                        If you agree, CineNiche may share your data with
                        selected partner companies to offer relevant services or
                        content.
                    </p>
                    <p>
                        <strong>Partners may include:</strong>
                    </p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Payment gateways (e.g., Stripe, PayPal)
                        </li>
                        <li className="list-group-item">
                            Advertising networks
                        </li>
                        <li className="list-group-item">
                            Analytics providers (e.g., Google Analytics)
                        </li>
                        <li className="list-group-item">
                            Content licensors or studios
                        </li>
                    </ul>
                    <p className="mt-3">
                        When CineNiche processes your subscription, we may send
                        your data to credit reference agencies to prevent
                        fraudulent activity.
                    </p>
                </section>

                <hr />

                {/* Data Storage Section */}
                <section className="mb-5">
                    <h2>How do we store your data?</h2>
                    <p>
                        CineNiche securely stores your data in encrypted cloud
                        databases hosted within the European Union and the
                        United States, protected by firewalls, encryption, and
                        role-based access control.
                    </p>
                    <p>
                        We retain your data for as long as your account is
                        active or as necessary to comply with legal obligations.
                        Once your data is no longer needed, it will be securely
                        deleted or anonymized using automated processes.
                    </p>
                </section>

                <hr />

                {/* Marketing Section */}
                <section className="mb-5">
                    <h2>Marketing</h2>
                    <p>
                        CineNiche would like to send you information about new
                        releases, special offers, and features we think you’ll
                        enjoy, as well as offers from our carefully selected
                        partners.
                    </p>
                    <p>
                        You can opt out of marketing at any time. You have the
                        right to stop CineNiche from contacting you for
                        marketing purposes or sharing your data with third
                        parties for marketing.
                    </p>
                    <p>
                        To opt out, click the unsubscribe link in any marketing
                        email or update your preferences in your account
                        settings.
                    </p>
                </section>

                <hr />

                {/* Data Protection Rights Section */}
                <section className="mb-5">
                    <h2>What are your data protection rights?</h2>
                    <p>
                        CineNiche wants to ensure you are fully aware of your
                        data protection rights. You are entitled to the
                        following:
                    </p>
                    <ul className="list-group">
                        <li className="list-group-item">
                            The right to access – You can request copies of your
                            personal data.
                        </li>
                        <li className="list-group-item">
                            The right to rectification – You can request
                            correction of inaccurate or incomplete data.
                        </li>
                        <li className="list-group-item">
                            The right to erasure – You can request deletion of
                            your data, under certain conditions.
                        </li>
                        <li className="list-group-item">
                            The right to restrict processing – You can request
                            limited use of your data, under certain conditions.
                        </li>
                        <li className="list-group-item">
                            The right to object to processing – You can object
                            to how we process your data, under certain
                            conditions.
                        </li>
                        <li className="list-group-item">
                            The right to data portability – You can request that
                            your data be transferred to another organization or
                            directly to you.
                        </li>
                    </ul>
                    <p className="mt-3">
                        To make a request, contact us using the details below.
                        We will respond within one month.
                    </p>
                </section>

                <hr />

                {/* Cookies Information Section */}
                <section className="mb-5">
                    <h2>Cookies</h2>
                    <p>
                        Cookies are small text files placed on your device to
                        collect visitor behavior information and enhance your
                        browsing experience. For more info, visit{' '}
                        <a
                            href="https://www.allaboutcookies.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            allaboutcookies.org
                        </a>
                        .
                    </p>
                </section>

                <hr />

                {/* How Cookies Are Used Section */}
                <section className="mb-5">
                    <h2>How do we use cookies?</h2>
                    <p>CineNiche uses cookies to:</p>
                    <ul className="list-group">
                        <li className="list-group-item">Keep you signed in</li>
                        <li className="list-group-item">
                            Personalize your browsing and viewing experience
                        </li>
                        <li className="list-group-item">
                            Analyze how you use our website
                        </li>
                        <li className="list-group-item">
                            Show relevant advertisements based on your behavior
                        </li>
                    </ul>
                </section>

                <hr />

                {/* Types of Cookies Section */}
                <section className="mb-5">
                    <h2>What types of cookies do we use?</h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Essential cookies – Necessary for login, navigation,
                            and security.
                        </li>
                        <li className="list-group-item">
                            Functionality cookies – Remember preferences like
                            language or subtitle settings.
                        </li>
                        <li className="list-group-item">
                            Performance cookies – Help us understand how
                            visitors use our platform.
                        </li>
                        <li className="list-group-item">
                            Advertising cookies – Track your browsing to deliver
                            personalized ads on our or partner sites.
                        </li>
                    </ul>
                </section>

                <hr />

                {/* Manage Cookies Section */}
                <section className="mb-5">
                    <h2>How to manage cookies</h2>
                    <p>
                        You can configure your browser to reject or delete
                        cookies. However, this may affect functionality or
                        personalized features on the CineNiche platform.
                    </p>
                </section>

                <hr />

                {/* External Privacy Policies Section */}
                <section className="mb-5">
                    <h2>Privacy policies of other websites</h2>
                    <p>
                        The CineNiche platform may contain links to external
                        websites. Our privacy policy applies only to our
                        platform. If you click on a third-party link, please
                        read their privacy policy.
                    </p>
                </section>

                <hr />

                {/* Changes to Privacy Policy Section */}
                <section className="mb-5">
                    <h2>Changes to our privacy policy</h2>
                    <p>
                        CineNiche regularly reviews and updates this privacy
                        policy. Updates will be posted on this page.
                    </p>
                    <p>
                        <strong>Last updated:</strong> April 9, 2025
                    </p>
                </section>

                <hr />

                {/* Contact Section */}
                <section className="mb-5">
                    <h2>How to contact us</h2>
                    <p>
                        If you have any questions about CineNiche’s privacy
                        policy or would like to exercise your data rights:
                    </p>
                    <p>
                        Email us at:{' '}
                        <a href="mailto:support@cineniche.com">
                            support@cineniche.com
                        </a>
                    </p>
                    <p>Call us: +1 (555) 123-4567</p>
                    <p>Write to us at:</p>
                    <address>
                        CineNiche Privacy Office
                        <br />
                        123 Stream Lane
                        <br />
                        Los Angeles, CA 90001
                        <br />
                        United States
                    </address>
                </section>

                <hr />

                {/* Authority Contact Section */}
                <section className="mb-5">
                    <h2>How to contact the appropriate authority</h2>
                    <p>
                        If you wish to file a complaint or feel that CineNiche
                        hasn’t handled your concern properly, you may contact
                        your local data protection authority or:
                    </p>
                    <p>
                        <strong>Information Commissioner’s Office (UK)</strong>
                        <br />
                        Wycliffe House, Water Lane
                        <br />
                        Wilmslow, Cheshire, SK9 5AF
                        <br />
                        Email:{' '}
                        <a href="mailto:ico@ico.org.uk">ico@ico.org.uk</a>
                    </p>
                </section>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
