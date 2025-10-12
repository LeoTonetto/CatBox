"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import FadeInSection from "@/components/FadeInSection";
import Loading from "@/components/Loading";

interface CartItem {
    id: number;
    title: string;
    description: string;
    price: number;
    quantity: number;
}

export default function CarrinhoPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loggedOut = sessionStorage.getItem("loggedOut");

        if (!token) {
            if (loggedOut) {
                // logout acabou de acontecer, não vai pro login
                sessionStorage.removeItem("loggedOut");
                setLoading(false);
                setCartItems([]); // carrinho vazio
            } else {
                // usuário realmente não está logado, vai pra login
                window.location.href = "/login";
            }
            return;
        }

        // usuário logado, carrega carrinho
        const storedCart = localStorage.getItem("cart");
        if (storedCart) setCartItems(JSON.parse(storedCart));
        setLoading(false);
    }, []);




    const updateCartStorage = (updatedCart: CartItem[]) => {
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const incrementQuantity = (id: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateCartStorage(updatedCart);
    };

    const decrementQuantity = (id: number) => {
        const updatedCart = cartItems
            .map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                    : item
            );
        updateCartStorage(updatedCart);
    };

    const removeItem = (id: number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        updateCartStorage(updatedCart);
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        alert("Redirecionando para o Stripe...");
    };

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
                            {cartItems.map(item => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center p-4 bg-gray-800 rounded-lg"
                                >
                                    <div>
                                        <h2 className="font-semibold text-lg">{item.title}</h2>
                                        <p className="text-gray-400">{item.description}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => decrementQuantity(item.id)}
                                                className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700 transition"
                                            >
                                                -
                                            </button>
                                            <span className="text-purple-400 font-semibold">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => incrementQuantity(item.id)}
                                                className="bg-gray-600 px-2 py-1 rounded hover:bg-gray-700 transition"
                                            >
                                                +
                                            </button>
                                            <span className="text-purple-400 font-semibold ml-4">
                                                R$ {(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
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

                            <button
                                onClick={handleCheckout}
                                className="mt-4 w-full bg-green-500 text-white cursor-pointer py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    )}
                </div>
            </FadeInSection>
        </div>
    );
}
