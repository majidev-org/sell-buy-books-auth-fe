
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
const App = () => {
	return (
		<div>
			<h1>React Authentication</h1>
			<div style={{ display: "flex", gap: "20px",flexDirection:'column', justifyContent: "center" }}>
				<LoginPage />
				<SignupPage />
			</div>
		</div>
	);
};

export default App;
