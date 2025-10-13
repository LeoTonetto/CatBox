"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FadeInSection from "@/components/FadeInSection";
import Loading from "@/components/Loading";
import {
    getCarrinho,
    atualizarQuantidadeCarrinho,
    removerItemCarrinho,
} from "@/app/lib/api";

interface CartItem {
    id_carrinhoItem: number;
    produto_carrinhoItem: {
        id_produto: number;
        titulo_produto: string;
        descricao_produto: string;
        preco_produto: number;
    };
    quantidade_carrinhoItem: number;
}

export default function CarrinhoPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [usuarioId, setUsuarioId] = useState<number | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            window.location.href = "/login";
            return;
        }

        setUsuarioId(JSON.parse(storedUser).id_usuario);
    }, []);


    useEffect(() => {
        fetchCarrinho();
    }, []);

    const fetchCarrinho = async () => {
        setLoading(true);
        try {
            const carrinho = await getCarrinho();
            setCartItems(carrinho.itens_carrinho || []);
        } catch (err) {
            console.error(err);
            setCartItems([]);
        }
        setLoading(false);
    };


    const incrementQuantity = async (produtoId: number) => {
        const item = cartItems.find(i => i.produto_carrinhoItem.id_produto === produtoId);
        if (!item) return;

        const updated = await atualizarQuantidadeCarrinho(produtoId, item.quantidade_carrinhoItem + 1);

        // Atualiza localmente para não refazer fetch completo
        setCartItems(prev =>
            prev.map(ci =>
                ci.produto_carrinhoItem.id_produto === produtoId
                    ? { ...ci, quantidade_carrinhoItem: ci.quantidade_carrinhoItem + 1 }
                    : ci
            )
        );

        window.dispatchEvent(new Event("cartUpdated"));
    };

    const decrementQuantity = async (produtoId: number) => {
        const item = cartItems.find(i => i.produto_carrinhoItem.id_produto === produtoId);
        if (!item || item.quantidade_carrinhoItem <= 1) return;

        await atualizarQuantidadeCarrinho(produtoId, item.quantidade_carrinhoItem - 1);
        fetchCarrinho();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const removeItem = async (produtoId: number) => {
        await removerItemCarrinho(produtoId);
        fetchCarrinho();
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const totalPrice = cartItems.reduce(
        (sum, item) =>
            sum +
            item.produto_carrinhoItem.preco_produto *
            item.quantidade_carrinhoItem,
        0
    );

    if (loading) return <Loading />;

    return (
        <div>
            <Navbar />
            <FadeInSection alwaysVisible>
                <div className="min-h-screen p-10 bg-black text-white mt-30">
                    <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>
                    {cartItems.length === 0 ? (
                        <p>Seu carrinho está vazio.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id_carrinhoItem}
                                    className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
                                >
                                    <div>
                                        <h2 className="font-semibold text-lg">
                                            {item.produto_carrinhoItem.titulo_produto}
                                        </h2>
                                        <p className="text-gray-400">
                                            {item.produto_carrinhoItem.descricao_produto}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() =>
                                                    decrementQuantity(
                                                        item.produto_carrinhoItem.id_produto
                                                    )
                                                }
                                                className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700 transition"
                                            >
                                                -
                                            </button>
                                            <span className="text-purple-400 font-semibold">
                                                {item.quantidade_carrinhoItem}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    incrementQuantity(
                                                        item.produto_carrinhoItem.id_produto
                                                    )
                                                }
                                                className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700 transition"
                                            >
                                                +
                                            </button>
                                            <span className="text-purple-400 font-semibold ml-4">
                                                R${" "}
                                                {(
                                                    item.produto_carrinhoItem.preco_produto *
                                                    item.quantidade_carrinhoItem
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            removeItem(item.produto_carrinhoItem.id_produto)
                                        }
                                        className="bg-white px-4 py-2 rounded text-black hover:bg-red-500 hover:text-white transition cursor-pointer"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                            <div className="flex justify-between items-center mt-6 p-4 bg-gray-900 rounded-lg">
                                <span className="text-xl font-bold">Total:</span>
                                <span className="text-xl font-bold text-pink-500">
                                    R$ {totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </FadeInSection>
        </div>
    );
}
