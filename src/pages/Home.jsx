import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Animate from "../components/Animate";
import Carousel from "../components/Carousel";
import HomeSkeleton from "../components/loaders/HomeSkeleton";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        setLoading(true);
        if (authStatus) {
            appwriteService
                .getPosts([])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [authStatus]);

    if (!authStatus) {
        return (
            <div className="min-h-[60vh] md:min-h-[70vh]">
                <div className="p-10">
                    <div className="max-w-[500px] mx-auto">
                        <img
                            src="https://i.ibb.co/5BCcDYB/Remote2.png"
                            alt="person-on-the-beach"
                            className="block w-full"
                        />
                    </div>
                    <div className="text-center p-4 my-6">
                        <h1 className="text-xl text-slate-800 font-semibold">
                            <Link
                                to="/login"
                                className="inline-block bg-gradient-to-r from-[#29ca8e] to-violet-500 text-white text-sm rounded-full px-4 py-2 duration-300 hover:-translate-y-1"
                            >
                                Login/Guest
                            </Link>{" "}
                            to read blogs.
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    return !loading ? (
        <Animate>
            {posts.length > 0 && (
                <div className="max-w-[1440px] mx-auto">
                    <Carousel posts={posts.slice(0, 10)} />
                </div>
            )}
            <Container className="w-[95%] max-w-[1200px] mx-auto py-10">
                <h1 className="text-2xl font-semibold text-slate-800 mb-4 md:text-3xl">
                    Recent Blog Posts
                </h1>
                <div className="gap-4 md:max-h-[700px] md:grid md:grid-cols-4 md:grid-rows-2">
                    {posts.slice(0, 8).map((post, index) => (
                        <PostCard
                            key={post.$id}
                            {...post}
                            className={`rounded-lg h-[180px] first-of-type:col-span-2 first-of-type:row-span-2 ${
                                index === 1 ? "col-span-2" : ""
                            } my-4 sm:h-[250px] md:my-0 md:h-auto`}
                            titleSize={index === 0 ? "md:text-4xl" : ""}
                        />
                    ))}
                </div>
                {posts.length > 8 && (
                    <Link
                        to="/all-posts"
                        className="block text-center p-2 bg-[#29ca8e] text-white rounded-full my-4 max-w-[200px] mx-auto duration-300 hover:bg-[#156748]"
                    >
                        View All
                    </Link>
                )}
            </Container>
        </Animate>
    ) : (
        <HomeSkeleton />
    );
}

export default Home;
