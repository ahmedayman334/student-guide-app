import toast from "react-hot-toast";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { loginRequest, type LoginPayload } from "../services/authService";

export const useLogin = () => {
	const [loading, setLoading] = useState(false);

	// const navigate = useNavigate();

	const login = async (payload: LoginPayload) => {
		if (!payload.username || !payload.password) {
			toast.error("Please fill all fields");
			console.log("error")
			return;
		}

		try {
			setLoading(true);

			const data = await loginRequest(payload);
			console.log("login response: ", data);
			toast.success("Login request sent successfully");

			// navigate("/dashboard");
		} catch (err) {
			console.error("Login error:", err);

			toast.error("Login request failed");
		} finally {
			setLoading(false);
		}
	};

	return {
		login,
		loading,
	};
};