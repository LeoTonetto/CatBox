import Image from "next/image";
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import { adicionarItemCarrinho } from "@/app/lib/api";

interface BoxCardProps {
    id: number;
    title: string;
    description: string;
    price: number;
}

export default function BoxCard({ id, title, description, price }: BoxCardProps) {

    const handleAddToCart = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            window.location.href = "/login";
            return;
        }

        try {
            // Não passamos mais usuarioId, backend pega do JWT
            await adicionarItemCarrinho(id, 1);
            window.dispatchEvent(new Event("cartUpdated"));
            window.location.href = "/carrinho";
        } catch (err) {
            console.error(err);
            alert("Erro ao adicionar o item no carrinho");
        }
    };

    return (
        <div className="border-purple-400 border-2 rounded-xl p-4 text-white flex">
            <Image src="/images/box.png" alt="caixa" width={200} height={200} />
            <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">{title}</span>
                    <span>{description}</span>
                    <span className="text-purple-400 font-semibold mt-1">R$ {Number(price).toFixed(2)}</span>
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
