"use client";

import { useEffect, useState } from 'react';
// 1. Importamos a lista de imagens do seu arquivo externo
import { IMAGENS_JOGO } from './carts';

export default function JogoDaMemoria() {
  const [cartas, setCartas] = useState([]);
  const [viradas, setViradas] = useState([]); 
  const [resolvidas, setResolvidas] = useState([]); 
  const [acertos, setAcertos] = useState(0);

  // 2. Calculamos dinamicamente quantos pares existem
  const totalParesParaVencer = IMAGENS_JOGO.length;

  useEffect(() => {
    // 3. Usamos a variável IMAGENS_JOGO em vez do array fixo anterior
    const lista = [...IMAGENS_JOGO, ...IMAGENS_JOGO]
      .map((img, i) => ({ id: i, imagem: img }))
      .sort(() => Math.random() - 0.5);
      
    setCartas(lista);
  }, []);

  const handleClique = (index) => {
    if (
      resolvidas.includes(index) || 
      viradas.includes(index) || 
      viradas.length === 2
    ) return;

    const novasViradas = [...viradas, index];
    setViradas(novasViradas);

    if (novasViradas.length === 2) {
      const [prim, seg] = novasViradas;

      if (cartas[prim].imagem === cartas[seg].imagem) {
        setResolvidas((prev) => [...prev, prim, seg]);
        setAcertos((prev) => prev + 1);
        setViradas([]);
      } else {
        setTimeout(() => {
          setViradas([]);
        }, 1000);
      }
    }
  };

  return (
    <section className="bg-amber-900 min-h-screen py-10">
      
      <div className="flex flex-col items-center">
        {/* Ajustei o h1 para ser mais responsivo (removi o ml-30 fixo que podia quebrar no mobile) */}
        <h1 className="font-bold text-center text-3xl border-2 rounded-2xl p-2 px-8 bg-amber-600 text-white shadow-xl mb-6">
          Jogo da Memória
        </h1>
        
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl px-10 mb-10 gap-6 text-white">
          <p className='text-2xl text-center md:text-left max-w-2xl'>
            Encontre todos os pares iguais de imagens:
          </p>
          <div className="bg-amber-600 font-bold p-3 px-8 border-2 text-2xl rounded-2xl shadow-lg">
            Acertos: {acertos} / {totalParesParaVencer}
          </div>
        </div>
      </div>
    <div className="relative max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto px-4">
        {cartas.map((carta, index) => {
          const isFlipped = viradas.includes(index) || resolvidas.includes(index);
          const isSolved = resolvidas.includes(index);

          return (
           <div key={carta.id} className="relative h-48 [perspective:1000px] cursor-pointer" onClick={() => handleClique(index)}>
          <div className={`relative w-full h-full transition-all duration-500 hover:scale-110 [transform-style:preserve-3d] 
            ${(viradas.includes(index) || resolvidas.includes(index)) ? '[transform:rotateY(180deg)]' : ''} 
            ${resolvidas.includes(index) ? 'animate-pop' : ''}`}>
                {/* LADO DA FRENTE */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-2xl flex items-center justify-center text-7xl font-bold shadow-lg">
                  <span className="text-amber-900">?</span>
                </div>

                {/* LADO DE TRÁS */}
                <div className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-2xl overflow-hidden shadow-lg border-4 border-transparent transition-opacity duration-500 
                  ${isSolved ? 'opacity-50' : 'opacity-100'}`}>
                  <img 
                    src={carta.imagem} 
                    className="w-full h-full object-cover" 
                    alt='Carta do jogo' 
                  />
                  {isSolved && (
                    <div className="absolute inset-0 border-4 border-green-500 rounded-2xl flex items-center justify-center"></div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {acertos === totalParesParaVencer && acertos > 0 && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-md animate-fadeIn transition-all">
          <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-amber-500 text-center scale-100 animate-pop">
            <h2 className="text-4xl font-bold text-amber-900 mb-2">🎉 Vitória!</h2>
            <p className="text-xl text-amber-800 mb-6">Você memorizou todos os {totalParesParaVencer} pares.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-10 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Jogar Novamente
            </button>
          </div>
        </div>
      )}
  </div>
    </section>
  );
}