import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import service from "../appwrite/config";
import Animate from "../components/Animate";
import PostCard from "../components/PostCard";
import GridSkeleton from "../components/loaders/GridSkeleton";

function PostsByGenre({ className = "", ...props }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { genre } = useParams();

    const filteredPosts = posts
        ? posts.filter((post) => post.genre == genre)
        : [];

    useEffect(() => {
        service
            .getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                    setLoading(false);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return !loading ? (
        <main className="min-h-screen">
            <Animate className="w-[95%] max-w-[1200px] mx-auto py-8" {...props}>
                <div className="border-l-8 border-[#29ca8e] px-2">
                    <h1 className="text-xl font-semibold text-slate-800 my-4 md:text-2xl">
                        <span className="inline-block text-[#29ca8e] first-letter:uppercase">
                            {genre}
                        </span>{" "}
                        related articles
                    </h1>
                </div>
                <div className="sm:grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <PostCard
                            key={post.$id}
                            {...post}
                            className="rounded-lg my-4 h-[200px] sm:my-0 sm:h-[240px]"
                        />
                    ))}
                </div>
            </Animate>
        </main>
    ) : (
        <GridSkeleton />
    );
}

export default PostsByGenre;
