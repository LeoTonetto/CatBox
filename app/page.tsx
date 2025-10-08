import Image from "next/image";
import BoxCard from "@/components/BoxCard";

export default function Navbar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full shadow-md shadow-purple-700 flex items-center justify-between px-8 py-3 z-50 bg-black">
        {/* LOGO */}
        <div className="flex items-center flex-shrink-0">
          <a href="/" className="flex items-center cursor-pointer">
            <Image src="/catbox-logo.png" alt="Logo" width={70} height={70} />
            <span style={{ fontFamily: 'Catfiles' }} className="text-4xl text-purple-500 ml-1">
              CatBox
            </span>
          </a>
        </div>

        {/* MENU central fixo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-20 text-white font-medium">
            <li className=" text-purple-400 cursor-pointer transition hover:scale-110">
              <a href="#mystery-box" className="hover:text-pink-500 text-purple-400 cursor-pointer transition hover:scale-110">
                Mystery Box
              </a>
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">Como funciona</li>
            <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">Suporte</li>
          </ul>
        </div>

        {/* LOGIN à direita */}
        <div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-xs hover:bg-purple-700 transition cursor-pointer hover:scale-110">
            Login
          </button>
        </div>
      </nav>
      <main className="flex w-full items-center min-h-screen">
        <div className="text-left w-full flex flex-col ml-10 gap-10">
          <p className="text-5xl font-bold text-blue-300">
            ABLUBLUBLÉ DA SILVA
          </p>
          <p className="mr-10">
            Super idol de xiàoróng dōu méi nǐ de tián bā yuè zhèngwǔ de yángguāng dōu méi nǐ yàoyǎn rè'ài bǎi líng wǔ dù de nǐ dī dī qīngchún de zhēngliúshuǐ
          </p>
          <a href="#mystery-box">
            <button className="bg-pink-500 hover:bg-purple-500 cursor-pointer text-white font-semibold w-40 px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-110">
              Conheça mais
            </button>
          </a>
        </div>
        <div className="w-fit">
          <Image src="/images/example2.png" alt="Imagem divulgação" width={1700} height={1700} />
        </div>
      </main>
      <section id="mystery-box" className="p-10">
        <span className="text-3xl font-bold">
          Nossas opções
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-10">
          <BoxCard title="Box Nivel 1" description="iuiu" href="#mystery-box" />
          <BoxCard title="Box Nivel 2" description="iuiu" href="#mystery-box" />
          <BoxCard title="Box Nivel 3" description="iuiu" href="#mystery-box" />
        </div>
      </section>
    </div>
  );
}
