import React from "react";
import { Signup as SignupComponent } from "../components";
import Animate from "../components/Animate";
function Signup() {
    return (
        <Animate
            className="py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <SignupComponent />
        </Animate>
    );
}

export default Signup;
