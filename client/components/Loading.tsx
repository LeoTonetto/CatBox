// components/Loading.tsx
"use client";

import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <Image
                src="/favicon.ico"
                alt="Carregando..."
                width={500}
                height={500}
                className="animate-pulse"
            />
        </div>
    );
}
