import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import GuestLogin from "./GuestLogin";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        setError("");
        setLoading(true);

        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }));
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-[1000px] mx-auto overflow-hidden w-[95%] rounded-xl shadow-md shadow-gray-400 md:flex md:min-h-[600px]">
            <div className="flex items-center my-4 md:my-0 md:w-[65%] md:py-6">
                <div className="w-full mx-auto md:w-[65%]">
                    <h2 className="text-center text-3xl text-[#29ca8e] font-bold leading-tight my-8 md:text-4xl">
                        Login to Your Account
                    </h2>
                    {error && (
                        <p className="text-red-600 my-4 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit(login)} className="px-10">
                        <div className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="rounded-full"
                                {...register("email", {
                                    required: true,
                                })}
                                required
                            />

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="rounded-full"
                                    {...register("password", {
                                        required: true,
                                    })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                    className="absolute z-10 right-4 bottom-3 text-slate-500"
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <Button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-full text-sm py-3 px-6 mx-auto sm:w-[180px]"
                                bgColor="bg-[#29ca8e] duration-300 hover:bg-[#156748]"
                            >
                                {loading ? (
                                    <>
                                        <CgSpinner className="animate-spin text-xl" />
                                        Signing-in...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </div>
                    </form>

                    <GuestLogin />
                </div>
            </div>
            <div className="bg-[#29ca8e] text-white flex items-center bg-gradient-to-r from-[#26bc84] to-[#29ca8e] md:my-0 md:w-[35%]">
                <div className="text-center p-4 mx-auto">
                    <h1 className="text-xl font-bold md:text-4xl">New Here?</h1>
                    <p className="text-md my-2 md:my-6">
                        Sign up and discover amazing blog posts and even write
                        your own!
                    </p>
                    <Link
                        to="/signup"
                        className="inline-block rounded-full text-sm py-3 px-6 mx-auto bg-white text-[#29ca8e] duration-300 hover:bg-[#156748] hover:text-white sm:w-[180px]"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Login;
