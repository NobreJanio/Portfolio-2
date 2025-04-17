export interface Experience { 
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  course: string;
  period: string;
}

export interface Certification {
  name: string;
  institution: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  database: string[];
  testing: string[];
  devops: string[];
  others: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    portfolio: string;
    github: string;
  };
  profile: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: Skills;
  languages: {
    name: string;
    level: string;
    details: string;
  }[];
}

export const resumeData: ResumeData = {
  name: "JÂNIO ALBERTO DA NÓBREGA JÚNIOR",
  title: "Desenvolvedor Full Stack",
  location: "Recife, PE | Disponível para mudanças",
  contact: {
    phone: "+55 (81) 99600-3937",
    email: "janionobrega@hotmail.com",
    linkedin: "https://www.linkedin.com/in/janiojunior31/",
    portfolio: "Portfólio", // Placeholder - Add actual URL if available
    github: "https://github.com/NobreJanio"
  },
  profile: "Desenvolvedor Full Stack com mais de 3 anos de experiência no desenvolvimento de soluções tecnológicas robustas e escaláveis. Especialista em React.js, Node.js, TypeScript e Next.js, com foco em entregar aplicações que aliam design intuitivo, performance otimizada e alinhamento com as melhores práticas de mercado. Com experiência em Design Systems, Metodologias Ágeis (Scrum/Kanban) e SEO, trago um histórico de colaborações em projetos que aumentaram a eficiência de processos e aprimoraram a experiência do usuário. Minha paixão pela tecnologia me leva a explorar continuamente novas ferramentas e compartilhar conhecimentos com equipes.",
  experience: [
    {
      role: "DESENVOLVEDOR FULL STACK",
      company: "FREELANCER",
      location: "RECIFE, PE",
      period: "MAI 2021 - ATUAL",
      description: [
        "Desenvolvimento de componentes reutilizáveis em React.js, reduzindo o tempo de implementação em 30%.",
        "Integração de APIs RESTful e GraphQL, otimizando fluxos de dados e escalabilidade de aplicações.",
        "Implementação de designs responsivos com TailwindCSS e Material-UI, aumentando a acessibilidade e usabilidade em 40%."
      ]
    },
    {
      role: "DESENVOLVEDOR REACT",
      company: "FREELANCER",
      location: "RECIFE, PE",
      period: "JAN 2023 - DEZ 2023",
      description: [
        "Criação de interfaces modernas e dinâmicas utilizando React.js e Redux, alinhadas às melhores práticas de UX/UI.",
        "Resolução de bugs críticos e execução de testes unitários e de integração com Jest e Cypress."
      ]
    },
    {
      role: "DESENVOLVEDOR BACKEND",
      company: "FREELANCER",
      location: "RECIFE, PE",
      period: "JUL 2022 - DEC 2022",
      description: [
        "Desenvolvimento de APIs escaláveis em Node.js, com autenticação e controle de acesso via JWT.",
        "Gerenciamento de bancos de dados relacionais (PostgreSQL) e não-relacionais (MongoDB)."
      ]
    },
    {
      role: "DESENVOLVEDOR FRONTEND",
      company: "FREELANCER",
      location: "RECIFE, PE",
      period: "JAN 2022 - JUN 2022",
      description: [
        "Construção de layouts adaptáveis para diferentes dispositivos usando HTML5, CSS3 e JavaScript.",
        "Aplicação de técnicas de Cross-Browser Compatibility para garantir funcionalidade em diferentes navegadores."
      ]
    }
  ],
  education: [
    {
      institution: "CENTRO UNIVERSITÁRIO DAS AMÉRICAS (FAM)",
      course: "Análise e Desenvolvimento de Sistemas",
      period: "2021 - 2023"
    },
    {
      institution: "UNINASSAU",
      course: "Biomedicina",
      period: "2012 - 2018"
    }
  ],
  certifications: [
    { name: "Bootcamp Full Stack", institution: "Gama Academy: HTML, CSS, JavaScript, React.js" },
    { name: "DevClub Full Stack", institution: "HTML, CSS, TypeScript, Node.js, React Native" },
    { name: "Decola Tech", institution: "Avanade: C# com .NET" },
    { name: "CapGemini Full Stack", institution: "Angular, API, Java, Lógica de Programação Avançada" }
  ],
  skills: {
    frontend: ["React.js", "Angular", "Vue", "Next.js", "Redux", "TailwindCSS", "Material-UI"],
    backend: ["Node.js", "Express.js", "REST API", "GraphQL"],
    database: ["MySQL", "PostgreSQL", "MongoDB"],
    testing: ["Jest", "Cypress", "TDD"],
    devops: ["Docker", "CI/CD", "GitHub Actions"],
    others: ["TypeScript", "JavaScript ES6+", "HTML5", "CSS3", "Sass"]
  },
  languages: [
    {
      name: "Inglês",
      level: "Intermediário",
      details: "Capacidade de leitura e escrita profissional e técnica."
    }
  ]
};