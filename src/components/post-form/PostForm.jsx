import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import appwriteSerice from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { genres } from "../../constants/genres";
import { toast } from "react-toastify";

export default function PostForm({ post }) {
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active",
                author: post?.author || "",
                genre: post?.genre || "general",
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setSubmitting(true);
        if (post) {
            const file = data.image[0]
                ? await appwriteSerice.uploadFile(data.image[0])
                : null;

            if (file) {
                appwriteSerice.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteSerice.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) {
                toast.success("Post Updated!", {
                    position: "bottom-right",
                });
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteSerice.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteSerice.createPost({
                    ...data,
                    userId: userData.$id,
                    author: userData.name,
                });

                if (dbPost) {
                    toast.success("Post added!", {
                        position: "bottom-right",
                    });
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        setSubmitting(false);
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
    }, []);

    useEffect(() => {
        watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="lg:flex gap-4">
            <div className="grow lg:w-[70%]">
                <Input
                    label={post ? "Title" : "An interesing title: "}
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                    required
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        });
                    }}
                    readOnly
                />
                <RTE
                    label="Content: "
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="lg:w-[30%]">
                <Input
                    label={post ? "Replace current image" : "Featured Image"}
                    type="file"
                    className="font-semibold my-4 md:my-0"
                    accept="image/png, image/jpg, image/jpeg"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <p className="text-center my-4 font-semibold uppercase">
                            current image
                        </p>
                        <img
                            src={appwriteSerice.getFilePreview(
                                post.featuredImage
                            )}
                            alt={post.title}
                            className="w-full max-w-[300px] mx-auto rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={genres}
                    label="Add Genre: "
                    className="mb-4"
                    {...register("genre", { required: true })}
                />
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="block w-full max-w-[200px] mx-auto rounded-full"
                >
                    {post
                        ? submitting
                            ? "Updating Post..."
                            : "Update"
                        : submitting
                        ? "Adding Post..."
                        : "Add Post"}
                </Button>
            </div>
        </form>
    );
}
