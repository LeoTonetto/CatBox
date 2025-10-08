import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <nav className="top-0 left-0 w-full shadow-md shadow-purple-700 flex items-center justify-between px-8 py-3 z-50">
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="flex items-center cursor-pointer">
            <Image src="/catbox-logo.png" alt="Logo" width={70} height={70} />
            <span style={{ fontFamily: 'Catfiles' }} className="text-4xl text-purple-400 ml-1">
              CatBox
            </span>
          </a>
        </div>

        {/* MENU central fixo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-20 text-white font-medium">
            <li className="hover:text-orange-500 text-purple-400 cursor-pointer">Mystery Box</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Como funciona</li>
            <li className="hover:text-purple-400 cursor-pointer transition">Suporte</li>
          </ul>
        </div>

        {/* LOGIN à direita */}
        <div>
          <button className="bg-purple-800 text-white px-4 py-2 rounded-xs hover:bg-purple-600 transition cursor-pointer">
            Login
          </button>
        </div>
      </nav>
      <main className="flex w-full items-center w-full mt-10">
        <div className="text-center w-full block">
          <p className="text-5xl">
            ABLUBLUBLÉ DA SILVA
          </p>
          <p>
            Super idol de xiàoróng dōu méi nǐ de tián bā yuè zhèngwǔ de yángguāng dōu méi nǐ yàoyǎn rè'ài bǎi líng wǔ dù de nǐ dī dī qīngchún de zhēngliúshuǐ
          </p>
        </div>
        <div className="w-fit"><Image src="/images/example2.png" alt="Logo" width={1700} height={1700}></Image></div>
      </main>
    </div>
  );
}
