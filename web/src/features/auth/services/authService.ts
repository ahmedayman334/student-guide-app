import api from "../../../shared/services/api";

export type LoginPayload = {
	username: string;
	password: string;
};

export type Student = {
	id: number;
	username: string;
	password: string;
	name?: string;
};

export type LoginResponse = {
	token: string;
	// student: Student;
};

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
	const response = await api.post("/login/", payload);

	console.log(response);

	return {
		token: "fake-token",
	};
};
