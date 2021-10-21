import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import axios from 'axios';

const Signup = (props) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [toHome, setToHome] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);
    const [unknownError, setUnknownError] = React.useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setAuthError(false);
        setUnknownError(false);
        axios.get('/sanctum/csrf-cookie')
            .then(response => {
                axios.post('auth/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: repeatPassword
                }).then(response => {
                        setToHome(true);
                }).catch(error => {
                    if (error.response && error.response.status === 422) {
                        setAuthError(true);
                    } else {
                        setUnknownError(true);
                        console.error(error);
                    }
                });
            });
    }

    if (toHome === true) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="name"
                        name="name"
                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        name="password_confirmation"
                        className={"form-control" + (authError || unknownError ? ' is-invalid' : '')}
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>

                {authError ? <div className="alert alert-danger">Credentials not recognised. Please try again.</div> : null}
                {unknownError ? <div className="alert alert-danger">There was an error submitting your details.</div> : null}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;