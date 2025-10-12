"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email_usuario: email,
                    senha_usuario: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "E-mail ou senha incorretos");
                return;
            }

            const data = await response.json();

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));

            // Redirecionar para página principal
            window.location.href = "/";
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao conectar ao servidor. Tente novamente.");
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen w-full bg-[#0b0b0d] text-white px-4">
            {/* Card de login */}
            <FadeInSection center alwaysVisible>
                <div className="w-full max-w-md bg-[#111113]/70 border border-purple-900/20 rounded-2xl p-10 shadow-xl flex flex-col items-center">
                    {/* Logo e título */}
                    <div className="flex flex-col items-center mb-8">
                        <Image src="/catbox-logo.png" alt="Logo" width={70} height={70} />
                        <h1
                            style={{ fontFamily: "Catfiles" }}
                            className="text-4xl text-purple-400 mt-3"
                        >
                            CatBox
                        </h1>
                        <p className="text-gray-400 mt-1 text-sm text-center">
                            Acesse sua conta para continuar
                        </p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                        <div>
                            <label className="block mb-2 text-sm text-gray-300">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemplo@email.com"
                                className="w-full px-4 py-3 rounded-lg bg-[#1b1b1f] border border-[#2f2f35] text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm text-gray-300">Senha</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="w-full px-4 py-3 rounded-lg bg-[#1b1b1f] border border-[#2f2f35] text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg mt-2 transition-transform hover:scale-[1.02] shadow-md"
                        >
                            Entrar
                        </button>

                        {/* Links */}
                        <div className="flex flex-col items-center text-sm mt-6 gap-2">
                            <Link
                                href="/cadastro"
                                className="text-purple-400 hover:underline hover:text-purple-300 transition"
                            >
                                Registre-se
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-400 hover:text-purple-300 transition"
                            >
                                ← Voltar para a Home
                            </Link>
                        </div>
                    </form>
                </div>
            </FadeInSection>
        </div>
    );
}
