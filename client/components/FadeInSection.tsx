"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInSectionProps {
    children: ReactNode;
    delay?: number;
}

export default function FadeInSection({ children, delay = 0 }: FadeInSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay }}
        >
            {children}
        </motion.div>
    );
}
