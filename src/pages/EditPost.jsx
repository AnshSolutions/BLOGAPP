import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { useEffect } from "react";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import Animate from "../components/Animate";

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        }
    }, [slug, navigate]);

    return (
        <Animate
            className="py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Container>
                <PostForm post={post} />
            </Container>
        </Animate>
    );
}

export default EditPost;
