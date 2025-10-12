import Image from "next/image";
import { ArrowRightIcon } from '@heroicons/react/24/solid'

interface BoxCardProps {
    id: number;
    title: string;
    description: string;
    price: number;
}

export default function BoxCard({ id, title, description, price }: BoxCardProps) {

    const handleAddToCart = () => {
        const storedCart = localStorage.getItem("cart");
        let cart = storedCart ? JSON.parse(storedCart) : [];

        // Verifica se o item já está no carrinho
        const index = cart.findIndex((item: any) => item.id === id);
        if (index >= 0) {
            cart[index].quantity += 1;
        } else {
            cart.push({ id, title, description, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated")); // atualiza o Navbar
        window.location.href = "/carrinho"; // redireciona direto
    };

    return (
        <div className="border-purple-400 border-2 rounded-xl p-4 text-white flex">
            <Image src="/images/box.png" alt="caixa" width={200} height={200} />
            <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">{title}</span>
                    <span>{description}</span>
                    <span className="text-purple-400 font-semibold mt-1">R$ {price.toFixed(2)}</span>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="flex gap-5 items-center bg-pink-500 hover:bg-purple-500 cursor-pointer text-white font-semibold w-40 px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-110 mt-2"
                >
                    Comprar
                    <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
