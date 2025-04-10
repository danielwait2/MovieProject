import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/RegisterPage.css';

function RegisterPage() {
    // State variables for registration fields
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [zip, setZip] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'fullName':
                setFullName(value);
                break;
            case 'age':
                setAge(value);
                break;
            case 'gender':
                setGender(value);
                break;
            case 'phone':
                // Remove non-digit characters
                const digits = value.replace(/\D/g, '').substring(0, 10);
                let formatted = digits;
                if (digits.length > 6) {
                    formatted = `${digits.substring(0, 3)}-${digits.substring(3, 6)}-${digits.substring(6)}`;
                } else if (digits.length > 3) {
                    formatted = `${digits.substring(0, 3)}-${digits.substring(3)}`;
                }
                setPhone(formatted);
                break;
            case 'city':
                setCity(value);
                break;
            case 'stateName':
                setStateName(value);
                break;
            case 'zip':
                setZip(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            default:
                break;
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

        try {
            // Example: call your backend API
            // const response = await fetch('/api/register', { ... });
            // if (!response.ok) throw new Error('Registration failed.');
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
                <button className="close-modal" onClick={handleClose}>
                    X
                </button>
                <h5 className="modal-title">Register</h5>

                <form onSubmit={handleSubmit}>
                    {/* Row 1: Full Name + Age */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fullName">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={fullName}
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
                                value={age}
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
                                value={gender}
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
                                value={city}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>

                    {/* Row 3: State + Zip */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="stateName">
                                State
                            </label>
                            <select
                                id="stateName"
                                name="stateName"
                                value={stateName}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">Select State</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
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
                                value={zip}
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
                                value={phone}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
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
