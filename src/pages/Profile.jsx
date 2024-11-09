import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import Animate from "../components/Animate";

import { toast } from "react-toastify";
import FlexCard from "../components/FlexCard";
import LogoutBtn from "../components/header/LogoutBtn";
import ProfileSkeleton from "../components/loaders/ProfileSkeleton";

import { FaUser } from "react-icons/fa";
import { MdCreate, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Profile() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    let date = new Date(userData?.registration).getDate();
    let month = new Date(userData?.registration).getMonth() + 1;
    let year = new Date(userData?.registration).getFullYear();

    let userPosts = posts?.filter((post) => post.userId === userData?.$id);

    const getNumberOfDays = (dateString) => {
        const givenDate = new Date(dateString);

        const currentDate = new Date();
        const differenceInMilliseconds = currentDate - givenDate;

        const millisecondsInOneDay = 1000 * 60 * 60 * 24;
        const differenceInDays = Math.floor(
            differenceInMilliseconds / millisecondsInOneDay
        );

        return differenceInDays;
    };

    const deletePost = (id, postImage) => {
        appwriteService
            .deletePost(id)
            .then((status) => {
                if (status) {
                    appwriteService.deleteFile(postImage);
                }
                const updatedPosts = posts?.filter((post) => post.$id !== id);
                setPosts(updatedPosts);
            })
            .then(() => {
                toast.success("Post deleted successfully!", {
                    position: "bottom-right",
                });
            })
            .catch(() => {
                toast.error("Could not delete post!", {
                    position: "bottom-right",
                });
            });
    };

    useEffect(() => {
        appwriteService
            .getPosts([])
            .then((data) => setPosts(data.documents))
            .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <Animate>
            <main className="relative w-[95%] max-w-[1200px] mx-auto min-h-[90vh]">
                <section className="text-slate-800 space-y-6 p-4 my-4">
                    <div className="flex items-center gap-4 text-4xl">
                        <FaUser className="text-6xl" />
                        <h1 className="font-semibold">{userData?.name}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold">
                            <MdEmail className="text-xl" />
                        </h2>
                        <p className="font-semibold">{userData?.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <h2 className="font-bold">Joined on:</h2>
                        <p className="font-semibold">{`${date}/${month}/${year}`}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <h2 className="font-bold">Posts:</h2>
                        <p className="font-semibold">{userPosts?.length}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/add-post"
                            className="text-green-500 px-4 py-2 inline-flex items-center gap-1 font-semibold border border-green-500 rounded-full duration-300 hover:bg-green-500 hover:text-white"
                        >
                            <MdCreate className="text-2xl" />
                            Create Post
                        </Link>
                        <LogoutBtn className="flex items-center gap-2 text-[#29ca8e] font-semibold border border-[#29ca8e] rounded-full px-4 py-2 duration-300 hover:bg-[#29ca8e] hover:text-white" />
                    </div>
                </section>

                <section>
                    {userPosts?.length ? (
                        <div className="my-4">
                            <h1 className="text-slate-800 text-2xl font-semibold">
                                My Posts
                            </h1>
                            {userPosts.map((post) => (
                                <FlexCard
                                    key={post.featuredImage}
                                    {...post}
                                    onDelete={() =>
                                        deletePost(post.$id, post.featuredImage)
                                    }
                                    getNumberOfDays={() =>
                                        getNumberOfDays(post.$createdAt)
                                    }
                                />
                            ))}
                        </div>
                    ) : null}
                </section>
            </main>
        </Animate>
    ) : (
        <ProfileSkeleton />
    );
}

export default Profile;
