'use client';

import { useState, useEffect } from 'react';
import { verifyToken, UserPayload } from '@/lib/auth';

type DashboardProps = {
  token: string;
  onLogout: () => void;
};

const Dashboard = ({ token, onLogout }: DashboardProps) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Dados simulados para o dashboard
  const mockData = {
    githubStats: {
      commits: 1247,
      pullRequests: 83,
      issues: 42,
      stars: 156,
      repositories: 28,
    },
    productivity: {
      dailyCommits: [4, 7, 2, 8, 6, 3, 5],
      languages: [
        { name: 'JavaScript', percentage: 45 },
        { name: 'TypeScript', percentage: 30 },
        { name: 'Python', percentage: 15 },
        { name: 'Other', percentage: 10 },
      ],
      projectsCompleted: 12,
    },
    feedback: [
      { name: 'João Silva', role: 'Tech Lead', comment: 'Excelente trabalho na implementação da arquitetura de microserviços.' },
      { name: 'Maria Oliveira', role: 'Product Manager', comment: 'Entregou todas as features antes do prazo e com alta qualidade.' },
      { name: 'Carlos Mendes', role: 'CTO', comment: 'Demonstra grande conhecimento técnico e capacidade de resolver problemas complexos.' },
    ],
  };

  useEffect(() => {
    // Verifica o token e carrega os dados do usuário
    const validateToken = () => {
      try {
        const userData = verifyToken(token);
        if (userData) {
          setUser(userData);
        } else {
          // Token inválido, faz logout
          onLogout();
        }
      } catch (error) {
        console.error('Erro ao validar token:', error);
        onLogout();
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token, onLogout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-green-500">Carregando dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg border border-gray-700 w-full h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-400">Dashboard <span className="text-sm text-gray-400">v1.0</span></h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-300">Logado como</p>
            <p className="font-medium text-green-400">{user.name}</p>
          </div>
          <button 
            onClick={onLogout}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('overview')}
        >
          Visão Geral
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'productivity' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('productivity')}
        >
          Produtividade
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'feedback' ? 'text-green-400 border-b-2 border-green-400' : 'text-gray-400 hover:text-gray-200'}`}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-blue-400">Contribuições GitHub</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Commits</span>
                  <span className="font-mono">{mockData.githubStats.commits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pull Requests</span>
                  <span className="font-mono">{mockData.githubStats.pullRequests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issues</span>
                  <span className="font-mono">{mockData.githubStats.issues}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stars</span>
                  <span className="font-mono">{mockData.githubStats.stars}</span>
                </div>
                <div className="flex justify-between">
                  <span>Repositórios</span>
                  <span className="font-mono">{mockData.githubStats.repositories}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-purple-400">Projetos Recentes</h3>
              <ul className="space-y-2">
                <li className="border-b border-gray-700 pb-2">
                  <div className="font-medium">API RESTful</div>
                  <div className="text-xs text-gray-400">Concluído em 12/05/2023</div>
                </li>
                <li className="border-b border-gray-700 pb-2">
                  <div className="font-medium">Dashboard Admin</div>
                  <div className="text-xs text-gray-400">Concluído em 28/07/2023</div>
                </li>
                <li className="border-b border-gray-700 pb-2">
                  <div className="font-medium">E-commerce Frontend</div>
                  <div className="text-xs text-gray-400">Concluído em 15/09/2023</div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-yellow-400">Tecnologias</h3>
              <div className="space-y-3">
                {mockData.productivity.languages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang.name}</span>
                      <span>{lang.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'productivity' && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-cyan-400">Commits Diários</h3>
              <div className="h-40 flex items-end justify-between">
                {mockData.productivity.dailyCommits.map((count, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="bg-green-500 w-8 rounded-t" 
                      style={{ height: `${count * 10}px` }}
                    ></div>
                    <div className="text-xs mt-2">Dia {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3 text-pink-400">Estatísticas</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-400">{mockData.productivity.projectsCompleted}</div>
                  <div className="text-sm text-gray-300">Projetos Concluídos</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-400">98%</div>
                  <div className="text-sm text-gray-300">Código Testado</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400">4.9/5</div>
                  <div className="text-sm text-gray-300">Avaliação Média</div>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-400">24</div>
                  <div className="text-sm text-gray-300">Certificações</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-3 text-green-400">Feedback de Líderes</h3>
            
            {mockData.feedback.map((item, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                <p className="italic mb-2">&quot;{item.comment}&quot;</p>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-green-400">{item.name}</span>
                  <span className="text-gray-400">{item.role}</span>
                </div>
              </div>
            ))}

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Estes são feedbacks reais de líderes e clientes.</p>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm">
                Ver mais feedbacks
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;