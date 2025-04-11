import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';
import { addUser, baseURL } from '../api/MoviesAPI';
import { User } from '../types/User';

function RegisterPage() {
    const navigate = useNavigate();

    // State for registration form fields
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    // State for other user information
    const [formData, setFormData] = useState<User>({
        userId: 0,
        name: '',
        phone: '',
        email: '',
        age: 0,
        gender: '',
        netflix: 0,
        amazonPrime: 0,
        disneyPlus: 0,
        paramountPlus: 0,
        max: 0,
        hulu: 0,
        appleTvPlus: 0,
        peacock: 0,
        city: '',
        state: '',
        zip: '',
    });

    // State for feedback messages
    const [error, setError] = useState<string>('');
    const [info, setInfo] = useState<string>('');

    // Update formData for all fields except email/password
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Closes the registration modal (redirects home)
    const handleClose = () => {
        navigate('/');
    };

    // Submit handler that makes two API calls sequentially.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submit action

        // Input validation
        if (!email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            setInfo('Please fill in all fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            setInfo('Please enter a valid email address.');
            return;
        }
        if (password.length < 14) {
            setError('Password must be at least 14 characters long.');
            setInfo('Password must be at least 14 characters long.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setInfo('Passwords do not match.');
            return;
        }

        // Clear previous messages
        setError('');
        setInfo('');

        // Prepare the data object for the APIs
        const userData = {
            email,
            password,
        };

        try {
            // First API call: Create the user
            const newUserData = await addUser(formData);
            console.log('User created:', newUserData);

            // Second API call: Register the user
            const registerResponse = await fetch(`${baseURL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Send userData directly without wrapping it in another object
                body: JSON.stringify(userData),
            });
            registerResponse
            setInfo('Registration successful, please log in');
        } catch (err) {
            console.error(err);
            setError('Error registering.');
            setInfo('Error registering.');
        }
    };

    return (
        <div className="register-modal-overlay">
            <div className="register-modal-content">
                <button className="close-modal" onClick={handleClose}>
                    X
                </button>
                <h5 className="modal-title">Register</h5>

                <form onSubmit={handleSubmit}>
                    {/* Row 1: Full Name + Age */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="age">
                                Age
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age || ''}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Row 2: Gender + City */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="gender">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="city">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Row 3: State + Zip */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="state">
                                State
                            </label>
                            <select
                                id="state"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Select State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                {/* Add additional states as needed */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="zip">
                                Zip
                            </label>
                            <input
                                type="text"
                                id="zip"
                                name="zip"
                                value={formData.zip}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Row 4: Phone + Email */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="phone">
                                Phone
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
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
                    </div>

                    {/* Row 5: Password + Confirm Password */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                className="form-label"
                                htmlFor="confirmPassword"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="register-button-wrapper">
                        <button className="register-button" type="submit">
                            Register
                        </button>
                    </div>
                </form>

                {error && <p className="modal-error">{error}</p>}
                {info && <p className="modal-info">{info}</p>}
            </div>
        </div>
    );
}

export default RegisterPage;
