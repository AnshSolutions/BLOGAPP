import React from "react";
import { Link } from "react-router-dom";

function GenresContainer({ genreList = [] }) {
    return (
        <div className="flex gap-2 flex-wrap my-2">
            {genreList.map((genre) => (
                <div key={genre} className="grow">
                    <Link
                        to={`/posts-by-genre/${genre}`}
                        className="block text-white text-sm text-center bg-[#29ca8e] py-1 px-2 rounded-xl duration-300 hover:bg-[#156748]"
                    >
                        {genre}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default GenresContainer;
