# Portfolio Interativo

Um portfolio moderno e interativo desenvolvido com Next.js, apresentando um terminal interativo, sistema de autenticação e formulário de contato. O projeto combina design profissional com funcionalidades interativas para criar uma experiência única de apresentação de trabalhos e habilidades.

## Tecnologias Utilizadas

- **Next.js 14** - Framework React com renderização do lado do servidor
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Tailwind CSS** - Framework CSS utilitário para estilização
- **Firebase** - Plataforma para hospedagem e autenticação
- **Formspree** - Serviço para processamento de formulários de contato
- **Prisma** (opcional) - ORM para gerenciamento de banco de dados

## Instalação e Configuração

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITÓRIO]
cd [NOME_DO_DIRETÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env.local` na raiz do projeto
- Adicione as variáveis necessárias seguindo o exemplo em `.env.local.example`

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

## Como Usar

### Terminal Interativo
O terminal interativo permite navegar pelo portfolio usando comandos de terminal. Alguns comandos disponíveis:
- `help` - Lista todos os comandos disponíveis
- `about` - Exibe informações sobre o desenvolvedor
- `projects` - Lista os projetos disponíveis

### Autenticação
O sistema de autenticação está integrado com Firebase. Para configurar:
1. Crie um projeto no Firebase
2. Adicione as credenciais do Firebase ao arquivo de ambiente
3. Configure os métodos de autenticação desejados no console do Firebase

### Formulário de Contato
O formulário de contato utiliza Formspree para processamento. Para configurar:
1. Crie uma conta no Formspree
2. Configure o endpoint do formulário nas variáveis de ambiente

## Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
