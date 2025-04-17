// Definindo a interface para os projetos
export interface Project {
  projectTitle: string;
  category: string[];
  imgPath: string;
  descrition: string; // Mantendo o nome original do campo, mesmo com erro ortográfico
  link: string;
}

export const myProjects: Project[] = [
  { projectTitle: "Restaurante (Modelo)", category: ["css"], imgPath: "./5.png", descrition: "Modelo de página de um restaurante fictício", link: "https://steady-sundae-83389f.netlify.app/" },

  { projectTitle: "Cardápio Digital", category: ["js"], imgPath: "./16.png", descrition: "Cardápio Digital e Responsivo enviando os pedidos para whatsapp", link: "https://cardapio-one-lyart.vercel.app/" },

  { projectTitle: "Node.js + MySQL", category: ["node"], imgPath: "./15.png", descrition: "Porjeto em Node.js com MySQL para simular um CRUD", link: "https://github.com/NobreJanio/Nodejs-mysql-webapi.git" },

  { projectTitle: "angular project", category: ["angular"], imgPath: "./8.png", descrition: "Layout de um e-commerce feito em Angular e Express", link: "https://github.com/NobreJanio/projeto-angular1.git" },

  { projectTitle: "react project", category: ["react"], imgPath: "./9.png", descrition: "Próprio porffolio feito em React + Vite", link: "https://github.com/NobreJanio/Portfolio.git" },
  { projectTitle: "react project", category: ["react"], imgPath: "./17.png", descrition: "Ecommerce com Strapi", link: "https://ecommerce-90e52.web.app" },
  { projectTitle: "react project", category: ["react"], imgPath: "./18.png", descrition: "Ecommerce com redux, redux tookit, slick, react-router-dom", link: "https://lojafrutas-e2efc.web.app" },
  { projectTitle: "react project", category: ["react"], imgPath: "./23.png", descrition: "Burgeria frontend e backend com styled-components, jwt, strepi, MongoDB, Postgresql, docker ... ", link: "https://github.com/NobreJanio/BlastBurger2" },
  { projectTitle: "react project", category: ["react"], imgPath: "./24.png", descrition: "Burgeria frontend e backend com styled-components, jwt, strepi, MongoDB, Postgresql, docker ... ", link: "https://github.com/NobreJanio/BlastBurger--Backend" },

  { projectTitle: "vue project", category: ["vue"], imgPath: "./22.png", descrition: "Loja de roupas", link: "https://ecommerce-roupas-vue.web.app" },

  { projectTitle: "java bibliotaca-api", category: ["java"], imgPath: "./25.png", descrition: "Funcionalidades para controle de livros, usuários, empréstimos e categorias, com uma interface de documentação interativa através do Swagger UI.", link: "https://github.com/NobreJanio/biblioteca-api" },

  { projectTitle: "svelte project", category: ["svelte"], imgPath: "./20.png", descrition: "Chat em tempo real", link: "https://github.com/NobreJanio/realtime-chatapp" },
];