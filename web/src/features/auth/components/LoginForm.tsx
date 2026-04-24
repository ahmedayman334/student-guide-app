// src/features/auth/components/LoginForm.tsx

import { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link } from "react-router-dom";
import type { LoginPayload } from "../services/authService";

type LoginFormProps = {
    onSubmit: (payload: LoginPayload) => void;
    loading: boolean;
};

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
    const [form, setForm] = useState<LoginPayload>({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f3f4f6]">
            <div className="w-[420px] bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-col items-center">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <FaUserGraduate className="text-indigo-600 text-2xl" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Continue your scholarly progress today.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">
                            username:
                        </label>

                        <div className="relative mt-1">
                            <MdOutlineEmail className="absolute left-3 top-3 text-gray-400" />

                            <input
                                name="username"
                                type="text"
                                value={ form.username }
                                placeholder="name@university.edu"
                                className="w-full pl-10 pr-3 py-3 bg-indigo-50 rounded-xl outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <label>Password:</label>
                        </div>

                        <div className="relative mt-1">
                            <IoMdLock className="absolute left-3 top-3 text-gray-400" />

                            <input
                                name="password"
                                type="password"
                                value={form.password}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-10 py-3 bg-indigo-50 rounded-xl outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-400 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? "Signing in..." : "Sign In to Dashboard →"}
                    </button>
                </form>

                <p className="text-center text-sm mt-6">
                    New to the guide?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium"
                    >
                        Create Student Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
