import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full shadow-md flex items-center justify-between px-8 py-3 z-50">
      {/* LOGO à esquerda */}
      <div className="flex items-center">
        <a href="/" className="cursor-pointer">
          <Image
            src="/catbox-logo.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </a>
      </div>

      {/* MENU central */}
      <ul className="flex gap-20 text-white font-medium">
        <li className="hover:text-orange-500 text-purple-400 cursor-pointer">Mystery Box</li>
        <li className="hover:text-purple-400 cursor-pointer transition">Como funciona</li>
        <li className="hover:text-purple-400 cursor-pointer transition">Suporte</li>
      </ul>

      {/* LOGIN à direita */}
      <div>
        <button className="bg-purple-800 text-white px-4 py-2 rounded-xs hover:bg-purple-600 transition cursor-pointer">
          Login
        </button>
      </div>
    </nav>
  );
}
