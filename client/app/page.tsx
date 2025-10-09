import Image from "next/image";
import BoxCard from "@/components/BoxCard";
import FAQItem from '@/components/FAQItem';
import FadeInSection from "@/components/FadeInSection";

export default function Navbar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full shadow-md   shadow-purple-700 flex items-center justify-between px-8 py-3 z-50 bg-black">
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
            <li className="hover:text-pink-500 text-purple-400 cursor-pointer transition hover:scale-110">
              <a href="#mystery-box">
                Mystery Box
              </a>
            </li>
            <li className="hover:text-purple-400 cursor-pointer transition hover:scale-110">
              <a href="#como-funciona">
                Como funciona
              </a>
            </li>
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
      <FadeInSection>
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
      </FadeInSection>
      <FadeInSection>
        <section id="mystery-box" className="min-h-screen p-10 scroll-mt-5 flex flex-col justify-center">
          <span className="text-3xl font-bold">
            Nossas opções
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-10">
            <BoxCard title="Box Nivel 1" description="iuiu" href="#mystery-box" />
            <BoxCard title="Box Nivel 2" description="iuiu" href="#mystery-box" />
            <BoxCard title="Box Nivel 3" description="iuiu" href="#mystery-box" />
            <BoxCard title="Kit 3 Box" description="iuiu" href="#mystery-box" />
          </div>
        </section>
      </FadeInSection>
      <FadeInSection>
        <section id="como-funciona" className="bg-purple-500 flex flex-col gap-20 min-h-[50vh] justify-center p-10 scroll-mt-15">
          <span className="text-3xl font-bold">
            Como Funciona
          </span>
          <span className="text-xl">
            A Mystery Box é uma maneira prática, segura e divertida de adquirir chaves de ativação de jogos digitais.
            Ao comprar uma box, você recebe uma chave de jogo surpresa, selecionada de forma automatizada e aleatória por nosso algoritmo interno, a partir de um catálogo previamente definido pela nossa equipe de curadoria.

            Isso significa que você não receberá jogos extremamente desconhecidos ou de baixo valor, garantindo uma experiência justa e de qualidade.
          </span>
          <span className="text-xl">
            Cada box possui um nível, e quanto maior o nível escolhido, maiores são as chances de receber um jogo de maior valor.
            As boxes podem conter desde títulos independentes premiados até jogos consagrados e edições especiais.
          </span>
        </section>
        <section className="flex flex-col items-center w-full min-h-[50vh] p-10 scroll-mt-10">
          <span className="text-3xl font-bold text-center w-full">
            FAQ
          </span>
          <FAQItem
            question="O que é uma Mystery Box?"
            answer="É uma forma de adquirir uma chave de jogo digital surpresa, selecionada automaticamente a partir de um catálogo de jogos cuidadosamente escolhidos."
          />
          <FAQItem
            question="Como é feito o envio?"
            answer="Após a confirmação da sua compra, nossa plataforma seleciona automaticamente uma key (chave) de jogo do nosso acervo interno e disponibiliza para você na diretamente na sua conta."
          />
          <FAQItem
            question="Já possuo o jogo que recebi. Tenho direito a reembolso?"
            answer="Infelizmente não. As chaves são produtos digitais de uso único e não podem ser reutilizadas. Como o sorteio é totalmente aleatório e não temos acesso à sua biblioteca Steam, não é possível oferecer trocas ou reembolsos nesses casos. Isso garante a imparcialidade e integridade do processo."
          />
          <FAQItem
            question="O que fazer se minha chave não funcionar?"
            answer="Entre em contato com nosso suporte imediatamente. Nossa equipe irá verificar o problema e, se confirmado, fornecer uma nova chave sem custo adicional."
          />
        </section>
      </FadeInSection>
    </div>
  );
}
