import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { CgSpinner } from "react-icons/cg";
import { useForm } from "react-hook-form";
import conf from "../conf/conf";
import { login as authLogin } from "../store/authSlice";

function GuestLogin() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { handleSubmit } = useForm();

    const login = async (data) => {
        setIsLoggingIn(true);
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
            console.log(error.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="my-4">
            <form
                onSubmit={handleSubmit(() =>
                    login({
                        email: conf.guestEmail,
                        password: conf.guestPassword,
                    })
                )}
            >
                <button
                    type="submit"
                    className="flex items-center gap-2 py-2 px-6 mx-auto bg-violet-500 duration-300 text-white rounded-full hover:bg-violet-800"
                >
                    {isLoggingIn ? (
                        <>
                            <CgSpinner className="animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        "Sign in as Guest"
                    )}
                </button>
            </form>
        </div>
    );
}

export default GuestLogin;
