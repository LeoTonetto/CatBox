import Image from "next/image";

interface BoxCardProps {
    title: string;
    description: string;
    href: string;
}

export default function BoxCard({ title, description, href }: BoxCardProps) {
    return (
        <div className="border-purple-400 border-2 rounded-xl p-4 text-white flex">
            <Image src="/images/box.png" alt="caixa" width={200} height={200} />
            <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                    <span className="text-2xl font-bold">{title}</span>
                    <span>{description}</span>
                </div>
                <a href={href}>
                    <button className="bg-pink-500 hover:bg-purple-500 cursor-pointer text-white font-semibold w-40 px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-110">
                        Comprar
                    </button>
                </a>
            </div>
        </div>
    );
}
