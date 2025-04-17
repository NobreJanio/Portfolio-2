import { NextResponse } from 'next/server';

import { myProjects } from '../../../../myProjects';

// Dados para a API do portfólio
const portfolioData = {
  about: {
    name: 'Desenvolvedor Full Stack',
    bio: 'Desenvolvedor apaixonado por criar soluções inovadoras e interfaces interativas.',
    experience: '5+ anos de experiência em desenvolvimento web',
    location: 'São Paulo, Brasil',
    interests: ['Arquitetura de Software', 'UI/UX', 'DevOps', 'Inteligência Artificial']
  },
  projects: myProjects.map((project, index) => ({
    id: index + 1,
    title: project.projectTitle,
    description: project.descrition,
    technologies: project.category,
    githubUrl: project.link.includes('github.com') ? project.link : null,
    liveUrl: !project.link.includes('github.com') ? project.link : null,
    imageUrl: project.imgPath
  })),
  skills: {
    frontend: ['React', 'Next.js', 'Vue.js', 'Angular', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'NestJS', 'Django', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Git', 'GitHub Actions', 'Terraform'],
    other: ['Clean Architecture', 'TDD', 'Agile/Scrum', 'UI/UX', 'Microservices', 'REST API Design']
  },
  contact: {
    email: 'contato@exemplo.com',
    linkedin: 'linkedin.com/in/seuusuario',
    github: 'github.com/seuusuario',
    twitter: 'twitter.com/seuusuario'
  },
  githubStats: {
    commits: 1247,
    pullRequests: 83,
    issues: 42,
    stars: 156,
    repositories: 28,
    contributions: [4, 7, 2, 8, 6, 3, 5, 9, 4, 6, 7, 8]
  }
};

// Rota GET para obter todos os dados do portfólio
export async function GET(request: Request) {
  // Extrair parâmetros da URL se necessário
  const { searchParams } = new URL(request.url);
  const section = searchParams.get('section');
  
  // Retornar seção específica ou todos os dados
  if (section && section in portfolioData) {
    return NextResponse.json({
      data: portfolioData[section as keyof typeof portfolioData]
    });
  }
  
  return NextResponse.json({ data: portfolioData });
}

// Rota POST para simular envio de mensagem de contato
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, email e mensagem' },
        { status: 400 }
      );
    }
    
    // Simulação de processamento bem-sucedido
    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso!',
      id: `msg_${Date.now()}`
    });
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}