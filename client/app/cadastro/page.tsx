"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (name.length > 100) {
            alert("O nome não pode ter mais que 100 caracteres!");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }

        const validarCPF = (cpf: string) => {
            cpf = cpf.replace(/\D/g, "");

            if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

            let soma = 0;
            for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
            let dig1 = (soma * 10) % 11;
            if (dig1 === 10 || dig1 === 11) dig1 = 0; // aqui é bom checar também 11
            if (dig1 !== parseInt(cpf[9])) return false;

            soma = 0;
            for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
            let dig2 = (soma * 10) % 11;
            if (dig2 === 10 || dig2 === 11) dig2 = 0;

            return dig2 === parseInt(cpf[10]);
        };


        if (!validarCPF(cpf)) {
            alert("CPF inválido!");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome_usuario: name,
                    email_usuario: email,
                    cpf_usuario: cpf.replace(/\D/g, ""),
                    senha_usuario: password,
                    // se você quiser mandar CPF, precisaria incluir na entidade DTO e no backend
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro: ${errorData.message || "Não foi possível cadastrar"}`);
                return;
            }

            const data = await response.json();
            alert(`Usuário cadastrado com sucesso!`);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setCPF("");
            router.push("/login");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Ocorreu um erro ao cadastrar. Tente novamente.");
        }
    };

    const formatCPF = (value: string) => {
        // Remove tudo que não é número
        const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);

        // Aplica a máscara
        let masked = onlyNumbers;
        if (onlyNumbers.length > 3 && onlyNumbers.length <= 6) {
            masked = onlyNumbers.replace(/(\d{3})(\d+)/, "$1.$2");
        } else if (onlyNumbers.length > 6 && onlyNumbers.length <= 9) {
            masked = onlyNumbers.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
        } else if (onlyNumbers.length > 9) {
            masked = onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
        }

        return masked;
    };


    return (
        <div className="relative flex items-center justify-center min-h-screen w-full bg-[#0b0b0d] text-white px-4">
            {/* Card de cadastro */}
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
                            Crie sua conta para começar
                        </p>
                    </div>

                    {/* Formulário */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                        <div>
                            <label className="block mb-2 text-sm text-gray-300">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Seu nome completo"
                                className="w-full px-4 py-3 rounded-lg bg-[#1b1b1f] border border-[#2f2f35] text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                                required
                            />
                        </div>

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

                        <input
                            type="text"
                            value={cpf}
                            onChange={(e) => setCPF(formatCPF(e.target.value))}
                            placeholder="000.000.000-00"
                            className="w-full px-4 py-3 rounded-lg bg-[#1b1b1f] border border-[#2f2f35] text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                            required
                        />

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

                        <div>
                            <label className="block mb-2 text-sm text-gray-300">Confirmar Senha</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="********"
                                className="w-full px-4 py-3 rounded-lg bg-[#1b1b1f] border border-[#2f2f35] text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg mt-2 transition-transform hover:scale-[1.02] shadow-md"
                        >
                            Cadastrar
                        </button>

                        {/* Links */}
                        <div className="flex flex-col items-center text-sm mt-6 gap-2">
                            <Link
                                href="/login"
                                className="text-purple-400 hover:underline hover:text-purple-300 transition"
                            >
                                Já tem uma conta? Entre
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
