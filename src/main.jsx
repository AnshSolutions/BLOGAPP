import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";

const Protected = React.lazy(() => import("./components/AuthLayout.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Singup.jsx"));
const AllPosts = React.lazy(() => import("./pages/AllPosts.jsx"));
const AddPost = React.lazy(() => import("./pages/AddPost.jsx"));
const EditPost = React.lazy(() => import("./pages/EditPost.jsx"));
const Post = React.lazy(() => import("./pages/Post.jsx"));
const PostsByGenre = React.lazy(() => import("./pages/PostsByGenre.jsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));
const Profile = React.lazy(() => import("./pages/Profile.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <Protected authenticaton={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Protected authenticaton={false}>
                        <Signup />
                    </Protected>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <Protected authenticaton>
                        <AllPosts />
                    </Protected>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <Protected authenticaton>
                        <AddPost />
                    </Protected>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protected authenticaton>
                        <EditPost />
                    </Protected>
                ),
            },
            {
                path: "/post/:slug",
                element: (
                    <Protected authenticaton>
                        <Post />
                    </Protected>
                ),
            },
            {
                path: "posts-by-genre/:genre",
                element: (
                    <Protected authenticaton>
                        <PostsByGenre />
                    </Protected>
                ),
            },
            {
                path: "profile",
                element: (
                    <Protected authenticaton>
                        <Profile />
                    </Protected>
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
