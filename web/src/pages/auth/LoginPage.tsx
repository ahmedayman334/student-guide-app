// src/pages/auth/LoginPage.tsx

import LoginForm from "../../features/auth/components/LoginForm";
import { useLogin } from "../../features/auth/hooks/useLogin";

const LoginPage = () => {
    const { login, loading } = useLogin();

    return <LoginForm onSubmit={login} loading={loading} />;
};

export default LoginPage;
