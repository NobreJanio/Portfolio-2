'use client';

import { useState } from 'react';
import { mockLogin } from '@/lib/auth';

type LoginProps = {
  onSuccess: (token: string) => void;
  onCancel: () => void;
};

const Login = ({ onSuccess, onCancel }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulando um pequeno atraso como em uma chamada de API real
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificando as credenciais com a função mockLogin
      console.log('Tentando login com:', email, password);
      const result = mockLogin(email, password);
      console.log('Resultado do login:', result);
      
      if (result && result.token) {
        // Login bem-sucedido
        console.log('Login bem-sucedido, token:', result.token);
        onSuccess(result.token);
      } else {
        console.log('Login falhou, credenciais inválidas');
        setError('Credenciais inválidas. Tente: admin@example.com / password');
      }
    } catch (err) {
      setError('Ocorreu um erro durante o login. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-md p-4 w-full max-w-md">
      <h2 className="text-xl font-bold text-green-400 mb-4">Acesso Restrito</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="admin@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="password"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-400 text-sm py-2">
            {error}
          </div>
        )}
        
        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Autenticando...' : 'Entrar'}
          </button>
        </div>
      </form>
      
      <div className="mt-4 text-xs text-gray-400">
        <p>Para demonstração, use:</p>
        <p>Email: admin@example.com</p>
        <p>Senha: password</p>
      </div>
    </div>
  );
};

export default Login;