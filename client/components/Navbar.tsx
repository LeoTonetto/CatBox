"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { getCarrinho } from "@/app/lib/api";

export default function Navbar() {
    const [user, setUser] = useState<{ nome_usuario: string } | null>(null);
    const [cartCount, setCartCount] = useState(0);
    const router = useRouter();

    const goToSection = (id: string) => {
        router.push(`/#${id}`);
    };

    const checkAuth = () => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            setUser(null);
            return false;
        }

        try {
            setUser(JSON.parse(storedUser));
            return true;
        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
            return false;
        }
    };

    const fetchCartCount = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCartCount(0);
            return;
        }

        try {
            const carrinho = await getCarrinho(); // agora não passa usuarioId
            const total = carrinho.itens_carrinho.reduce(
                (sum: number, item: any) => sum + item.quantidade_carrinhoItem,
                0
            );
            setCartCount(total);
        } catch (err) {
            console.error("Erro ao carregar carrinho:", err);
            setCartCount(0);
        }
    };

    useEffect(() => {
        const loggedIn = checkAuth();
        if (loggedIn) fetchCartCount();

        const handleCartUpdated = () => fetchCartCount();
        window.addEventListener("cartUpdated", handleCartUpdated);

        return () => window.removeEventListener("cartUpdated", handleCartUpdated);
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        sessionStorage.setItem("loggedOut", "true");
        setUser(null);
        setCartCount(0);
        router.push("/");
    };

    return (
        <nav className="fixed top-0 left-0 w-full shadow-md shadow-purple-700 flex items-center justify-between px-8 py-3 z-50 bg-black">
            {/* LOGO */}
            <div className="flex items-center flex-shrink-0">
                <Link href="/" className="flex items-center cursor-pointer">
                    <Image src="/catbox-logo.png" alt="Logo" width={70} height={70} />
                    <span style={{ fontFamily: "Catfiles" }} className="text-4xl text-purple-500 ml-1">
                        CatBox
                    </span>
                </Link>
            </div>

            {/* MENU central */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex gap-20 text-white font-medium">
                    <li className="hover:text-pink-500 text-purple-400 cursor-pointer transition hover:scale-110">
                        <a onClick={() => goToSection("mystery-box")}>Mystery Box</a>
                    </li>
                    <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">
                        <a onClick={() => goToSection("como-funciona")}>Como funciona</a>
                    </li>
                    <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">
                        Suporte
                    </li>
                </ul>
            </div>

            {/* LADO DIREITO */}
            <div className="flex items-center gap-5 relative">
                {user ? (
                    <>
                        <span className="text-purple-400 font-light">
                            Olá, {user.nome_usuario.split(" ")[0]} 👋
                        </span>
                        <Link href="/perfil">
                            <UserIcon className="h-7 w-7 text-gray-400" />
                        </Link>
                        <Link href="/carrinho" className="relative">
                            <ShoppingCartIcon className="h-7 w-7 text-pink-600" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={handleLogout} className="text-gray-400 cursor-pointer">
                            Sair
                        </button>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700 transition cursor-pointer hover:scale-110">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
