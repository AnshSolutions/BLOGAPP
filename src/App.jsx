import { useState, useEffect, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import authService from "./appwrite/auth";

import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        setLoading(true);
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, [authStatus, dispatch]);

    return !loading ? (
        <>
            <AnimatePresence>
                <div className="min-h-screen">
                    <Header />
                    <main location={location} key={location.pathname}>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </main>
                    <Footer />
                    <ScrollToTop />
                </div>
            </AnimatePresence>
            <ToastContainer />
        </>
    ) : (
        <Loading />
    );
}

export default App;
