# 🧩 Memory Game - React

Este projeto é um **Jogo da Memória** dinâmico, interativo e totalmente responsivo, desenvolvido originalmente para compor o ecossistema de sites da **CP2eJR**. 

O jogo foi construído utilizando **Next.js**, **Tailwind CSS** e conceitos avançados de estado do **React**, focando em uma experiência de usuário fluida com animações 3D e lógica escalável.

![Demonstração do Jogo](./public/Demonstracao/seu_arquivo.gif)

## 🚀 Como Customizar o Jogo

A maior vantagem deste projeto é a sua facilidade de configuração. O tabuleiro se ajusta automaticamente conforme a quantidade de imagens que você definir.

### 1. Preparando as Imagens
Coloque todos os arquivos de imagem (PNG, JPG, SVG, etc.) que deseja usar como pares dentro da pasta:
`public/`

### 2. Configurando o Array de Cartas
Para alterar as imagens ou aumentar a dificuldade (número de pares), você não precisa mexer na lógica do jogo. Basta editar o arquivo:
`app/carts.ts` (ou o diretório onde você salvou suas constantes)

Edite o array conforme o exemplo abaixo:

```typescript
// Basta adicionar ou remover caminhos de imagens aqui
export const IMAGENS_JOGO = [
  "/A.png",
  "/B.png",
  "/C.png",
  "/D.png",
  "/E.png",
  "/F.png",
  // Se você adicionar mais imagens aqui, o jogo aumentará de tamanho sozinho!
];