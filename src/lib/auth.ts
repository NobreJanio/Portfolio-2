// Usando uma abordagem simplificada para o ambiente do navegador
// já que jsonwebtoken é uma biblioteca Node.js e não funciona no navegador

// Normalmente, estas chaves estariam em variáveis de ambiente
// const JWT_SECRET = 'your-secret-key'; // Removido pois não está sendo usado
// const JWT_EXPIRES_IN = '24h'; // Removido pois não está sendo usado

export type UserPayload = {
  id: string;
  email: string;
  name: string;
  role: string;
};

/**
 * Gera um token JWT para o usuário (versão simplificada para demonstração)
 */
export const generateToken = (user: UserPayload): string => {
  // Versão simplificada para demonstração no navegador
  // Em produção, usaríamos uma biblioteca JWT adequada para o navegador
  return btoa(JSON.stringify({
    user,
    exp: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
  }));
};

/**
 * Verifica e decodifica um token JWT (versão simplificada para demonstração)
 */
export const verifyToken = (token: string): UserPayload | null => {
  try {
    const decoded = JSON.parse(atob(token));
    
    // Verifica se o token expirou
    if (decoded.exp < Date.now()) {
      console.error('Token expirado');
      return null;
    }
    
    return decoded.user as UserPayload;
  } catch (error) {
    console.error('Erro ao verificar token JWT:', error);
    return null;
  }
};

/**
 * Middleware para verificar autenticação
 * Pode ser usado em rotas de API ou Server Components
 */
export const requireAuth = async (token?: string) => {
  if (!token) {
    throw new Error('Token de autenticação não fornecido');
  }

  const user = verifyToken(token);
  
  if (!user) {
    throw new Error('Token inválido ou expirado');
  }

  return user;
};

/**
 * Simula autenticação para demonstração
 * Em produção, isso seria conectado a um banco de dados
 */
export const mockLogin = (email: string, password: string) => {
  // Usuário de demonstração
  const demoUser = {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin',
    role: 'admin',
  };

  // Simula verificação de credenciais
  if (email === demoUser.email && password === 'password') {
    return {
      user: demoUser,
      token: generateToken(demoUser),
    };
  }

  return null;
};