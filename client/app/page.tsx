"use client";

import Image from "next/image";
import BoxCard from "@/components/BoxCard";
import FAQItem from '@/components/FAQItem';
import FadeInSection from "@/components/FadeInSection";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { getProdutos } from "@/app/lib/api";

interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  email_usuario: string;
}

interface Produto {
  id_produto: number;
  titulo_produto: string;
  descricao_produto: string;
  preco_produto: number;
}

export default function Home() {
  const [user, setUser] = useState<Usuario | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Buscar produtos do backend
    const fetchProdutos = async () => {
      try {
        const data = await getProdutos();
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div>
      <Navbar />

      <Image
        src="/background-main.webp"
        alt="Fundo"
        fill
        priority
        className="object-cover opacity-5 -z-10"
      />

      <FadeInSection alwaysVisible>
        <main className="relative flex w-full items-center min-h-screen">
          <div className="text-left w-full flex flex-col ml-10 gap-10">
            <p className="text-5xl font-bold text-blue-300">
              ABLUBLUBLÉ DA SILVA
            </p>
            <p className="mr-10">
              Super idol de xiàoróng dōu méi nǐ de tián...
            </p>
            <a
              href="#mystery-box"
              className="bg-pink-500 hover:bg-purple-500 cursor-pointer text-white font-semibold w-40 px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-110 flex justify-center items-center"
            >
              Conheça mais
            </a>
          </div>

          <div className="w-fit">
            <Image src="/images/example2.png" alt="Imagem divulgação" width={1700} height={1700} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 -z-9"></div>
        </main>
      </FadeInSection>

      <FadeInSection alwaysVisible>
        <section id="mystery-box" className="min-h-screen p-10 flex flex-col justify-center">
          <span className="text-3xl font-bold">Nossas opções</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-10">
            {produtos.map((p) => (
              <BoxCard
                key={p.id_produto}
                id={p.id_produto}
                title={p.titulo_produto}
                description={p.descricao_produto}
                price={p.preco_produto}
              />
            ))}
          </div>
        </section>
      </FadeInSection>
      <FadeInSection alwaysVisible>
        <section id="como-funciona" className="bg-purple-500 flex flex-col gap-20 min-h-[50vh] justify-center p-10 scroll-mt-15">
          <span className="text-3xl font-bold">
            Como Funciona
          </span>
          <span className="text-xl">
            A Mystery Box é uma maneira prática, segura e divertida de adquirir chaves de ativação de jogos digitais. Ao comprar uma box, você recebe uma chave de jogo surpresa, selecionada de forma automatizada e aleatória por nosso algoritmo interno, a partir de um catálogo previamente definido pela nossa equipe de curadoria. Isso significa que você não receberá jogos extremamente desconhecidos ou de baixo valor, garantindo uma experiência justa e de qualidade.
          </span>
          <span className="text-xl">
            Cada box possui um nível, e quanto maior o nível escolhido, maiores são as chances de receber um jogo de maior valor. As boxes podem conter desde títulos independentes premiados até jogos consagrados e edições especiais.
          </span>
        </section>
      </FadeInSection>

      <FadeInSection alwaysVisible>
        <section className="flex flex-col items-center w-full min-h-[50vh] p-10 scroll-mt-10">
          <span className="text-3xl font-bold text-center w-full">
            FAQ
          </span>
          <FAQItem question="O que é uma Mystery Box?" answer="É uma forma de adquirir uma chave de jogo digital surpresa, selecionada automaticamente a partir de um catálogo de jogos cuidadosamente escolhidos." />
          <FAQItem question="Como é feito o envio?" answer="Após a confirmação da sua compra, nossa plataforma seleciona automaticamente uma key (chave) de jogo do nosso acervo interno e disponibiliza para você na diretamente na sua conta." />
          <FAQItem question="Já possuo o jogo que recebi. Tenho direito a reembolso?" answer="Infelizmente não. As chaves são produtos digitais de uso único e não podem ser reutilizadas. Como o sorteio é totalmente aleatório e não temos acesso à sua biblioteca Steam, não é possível oferecer trocas ou reembolsos nesses casos. Isso garante a imparcialidade e integridade do processo." />
          <FAQItem question="O que fazer se minha chave não funcionar?" answer="Entre em contato com nosso suporte imediatamente. Nossa equipe irá verificar o problema e, se confirmado, fornecer uma nova chave sem custo adicional." />
        </section>
      </FadeInSection>
    </div>
  );
}
