import { useState, useContext, useCallback } from "react";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useContext(globalThis.context); // Only read once, avoid re-triggering on each render

	// Handlers for input changes
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	// Login handler
	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			setError("Please fill all fields.");
		} else {
			setError("");
			// console.log("Login Successful:", { email, password });
			// router.navigate("/books");
			try {
				const response = await fetch(`http://localhost:3000/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				});
				console.log("🚀 -> file: LoginPage.jsx:25 -> handleLogin -> response:", response);
				if (!response.ok) {
					const user = await response.json();
					console.log("🚀 -> file: LoginPage.jsx:31 -> handleLogin -> user:", user);
					throw new Error(user.error);
				} else {
					const user = await response.json();
					sessionStorage.setItem('user',user.token);
					setError("");
					console.log("login Successful:", { email, password });
				}
			} catch (error) {
				console.log("🚀 -> file: LoginPage.jsx:40 -> handleLogin -> error:", error);

				setError((error.message));
			}
		}
	};

	// Navigate to signup
	const handleSignupNavigate = useCallback(() => router.navigate("auth/signup"), [router]);

	return (
		<div className="form-container">
			<h2>Login</h2>
			{error && <p className="error-message">{error}</p>}
			<form onSubmit={handleLogin}>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={handleEmailChange} // No need for useCallback here
					/>
				</div>
				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={handlePasswordChange} // No need for useCallback here
					/>
				</div>
				<button type="submit" className="form-button">
					Login
				</button>
			</form>
			<h4 onClick={handleSignupNavigate}>Create Account</h4>
		</div>
	);
};

export default LoginPage;
