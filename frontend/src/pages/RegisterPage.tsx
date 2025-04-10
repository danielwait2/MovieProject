import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';

function RegisterPage() {
    // State variables for registration fields
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    // Handle form submission for registration
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Your registration API call logic goes here. For example:
        try {
            // const response = await fetch( registration endpoint, { ... });
            // Assume success and navigate to movies:
            navigate('/movies');
        } catch (err: any) {
            setError(err.message || 'Registration failed.');
        }
    };

    // Close the modal and return to homepage
    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="register-modal-overlay">
            <div className="register-modal-content">
                {/* Close ("X") button */}
                <button className="close-modal" onClick={handleClose}>
                    X
                </button>
                <h5 className="modal-title">Register</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="register-button-wrapper">
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </div>
                </form>
                {error && <p className="modal-error">{error}</p>}
            </div>
        </div>
    );
}

export default RegisterPage;
