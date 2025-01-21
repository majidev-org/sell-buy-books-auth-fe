import { useState } from "react";

const SignupPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSignup = async (e) => {
		e.preventDefault();
		if (!username || !email || !password) {
			setError("Please fill all fields.");
		} else {
			const response = await fetch(`http://localhost:3000/users`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, email, password })
			});
			if (!response.ok) {
				setError("Unable to create user.");
			} else {
				const user = await response.json();
				console.dir(user);
				setError("");
				console.log("Signup Successful:", { username, email, password });
			}
		}
	};

	return (
		<div className="form-container">
			<h2>Sign Up</h2>
			{error && <p className="error-message">{error}</p>}
			<form onSubmit={handleSignup}>
				<div className="form-group">
					<label>Username</label>
					<input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Password</label>
					<input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				{/* <div className="form-group">
					<label>Confirm Password</label>
					<input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
				</div> */}
				<button type="submit" className="form-button">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupPage;
