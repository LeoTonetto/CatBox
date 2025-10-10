"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number;
    center?: boolean;
    alwaysVisible?: boolean; // nova prop
}

export default function FadeInSection({ children, delay = 0, center = false, alwaysVisible = false }: FadeInSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 7 }}
            animate={alwaysVisible ? { opacity: 1, y: 0 } : undefined}
            whileInView={alwaysVisible ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={center ? "flex justify-center w-full" : "w-full"}
        >
            {children}
        </motion.div>
    );
}
