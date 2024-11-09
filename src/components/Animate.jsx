import React from "react";
import { motion } from "framer-motion";

function Animate({ children, className = "", ...props }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            }}
            exit={{ opacity: 0 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export default Animate;
