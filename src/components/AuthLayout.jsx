import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children, authenticaton = true }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(true);
        if (authenticaton && authStatus !== authenticaton) {
            navigate("/login");
        } else if (!authenticaton && authStatus !== authenticaton) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authenticaton]);

    return loader ? <div>loading...</div> : <>{children}</>;
}

export default Protected;
