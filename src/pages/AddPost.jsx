import React from "react";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import Animate from "../components/Animate";

function AddPost() {
    return (
        <Animate className="py-6">
            <Container>
                <PostForm />
            </Container>
        </Animate>
    );
}

export default AddPost;
