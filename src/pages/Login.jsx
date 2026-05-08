import { useState } from 'react';
import { useApp } from '../context/AppContext';

function Login() {
	const { login } = useApp();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	function handleSubmit(event) {
		event.preventDefault();

		if (!email.includes('@')) {
			setError('Please enter a valid email.');
			return;
		}

		if (password.length < 6) {
			setError('Password must be at least 6 characters.');
			return;
		}

		setError('');
		login(email);
	}

	return (
		<div className="page form-page">
			<form className="login-form" onSubmit={handleSubmit}>
				<p className="small-title">Account</p>
				<h1>Login</h1>
				<p>Use any email and any password with at least 6 characters.</p>

				{error && <p className="error-text">{error}</p>}

				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="student@example.com"
				/>

				<label>Password</label>
				<input
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					placeholder="password123"
				/>

				<button className="primary-button full-width" type="submit">
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
