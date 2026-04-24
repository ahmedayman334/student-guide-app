// src/shared/services/api.ts

import axios from "axios";

const api = axios.create({
	baseURL: "https://ahmedamara.pythonanywhere.com/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
