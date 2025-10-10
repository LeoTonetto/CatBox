"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full shadow-md   shadow-purple-700 flex items-center justify-between px-8 py-3 z-50 bg-black">
            {/* LOGO */}
            <div className="flex items-center flex-shrink-0">
                <a href="/" className="flex items-center cursor-pointer">
                    <Image src="/catbox-logo.png" alt="Logo" width={70} height={70} />
                    <span style={{ fontFamily: 'Catfiles' }} className="text-4xl text-purple-500 ml-1">
                        CatBox
                    </span>
                </a>
            </div>

            {/* MENU central fixo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex gap-20 text-white font-medium">
                    <li className="hover:text-pink-500 text-purple-400 cursor-pointer transition hover:scale-110">
                        <a href="#mystery-box">
                            Mystery Box
                        </a>
                    </li>
                    <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">
                        <a href="#como-funciona">
                            Como funciona
                        </a>
                    </li>
                    <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">Suporte</li>
                </ul>
            </div>

            {/* Botão de login */}
            <div>
                <Link href="/login">
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer hover:scale-110">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
}
