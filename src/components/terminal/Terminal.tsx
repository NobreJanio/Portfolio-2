'use client';

import { useState, useEffect, useRef, SetStateAction } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Login from './Login';
import Dashboard from '@/components/dashboard/Dashboard';
import { FaTerminal } from 'react-icons/fa';
import { Project, myProjects } from "@/data/myProjects"; // Mover import para cá
import { resumeData } from '@/data/resumeData'; // Importar dados do currículo

type Command = {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
};

type CommandHandler = {
  [key: string]: (args: string[]) => React.ReactNode;
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [introComplete, setIntroComplete] = useState(false); // Keep this state
  const [showLogin, setShowLogin] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null); // Ref for the scrollable area
  const inputRef = useRef<HTMLInputElement>(null);
  const contactNameInputRef = useRef<HTMLInputElement>(null); // Add ref for contact name input
  const endOfHistoryRef = useRef<HTMLDivElement>(null); // Ref to scroll to bottom
  const [historyIndex, setHistoryIndex] = useState<number>(-1); // Add state for history index
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  // State for contact form
  const [showContactForm, setShowContactForm] = useState(false); // New state for form visibility
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState<string | null>(null);

  // Function to add command output to history programmatically
  const addCommandToHistory = (command: string, output: React.ReactNode) => {
    setHistory(prev => [
      ...prev,
      { command, output, timestamp: new Date() }
    ]);
  };

  // Refactored Contact Form Submit Handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    setContactError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao enviar a mensagem.');
      }

      setContactStatus('success');
      addCommandToHistory('contact --form', <div className="text-green-400">Mensagem enviada com sucesso! Formulário fechado.</div>);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setShowContactForm(false); // Close form on success

    } catch (error: any) {
      console.error('Contact form error:', error);
      setContactStatus('error');
      setContactError(error.message || 'Ocorreu um erro inesperado.');
      // Optionally add an error message to history, but don't close form on error
      addCommandToHistory('contact --form', <div className="text-red-400">Erro ao enviar: {error.message || 'Ocorreu um erro inesperado.'}</div>);
      // setShowContactForm(false); // Keep form open on error
    }
  };

  // Comandos disponíveis no terminal
  const commandHandlers: CommandHandler = {
    help: () => (
      <div className="text-green-400">
        <p className="mb-2">Comandos disponíveis:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>about - Informações sobre mim</li>
          <li>experience - Minha experiência profissional</li>
          <li>education - Minha formação acadêmica</li>
          <li>certifications - Certificações e cursos</li>
          <li>projects - Lista de projetos</li>
          <li>skills [--filter tecnologia] - Minhas habilidades técnicas</li>
          <li>contact [--form] - Informações de contato</li>
          <li>social - Redes sociais</li>
          <li>github - Estatísticas do GitHub (placeholder)</li>
          <li>login - Acesso à área restrita</li>
          <li>clear - Limpa o terminal</li>
          <li>help - Mostra esta ajuda</li>
          <li>logout - Sai da área restrita</li>
          <li>dashboard - Acessa o dashboard (requer login)</li>
          <li>close_form - Fecha o formulário de contato</li>
        </ul>
      </div>
    ),
    about: () => (
      <div className="text-blue-400">
        <p className="text-xl font-bold mb-2">Sobre Mim</p>
        <p className="mb-2 whitespace-pre-wrap">{resumeData.profile}</p>
      </div>
    ),
    experience: () => (
      <div className="text-orange-400">
        <p className="text-xl font-bold mb-2">Experiência Profissional</p>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{exp.role} @ {exp.company}</p>
            <p className="text-sm text-gray-400">{exp.location} | {exp.period}</p>
            <ul className="list-disc pl-5 mt-1 text-sm">
              {exp.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
    education: () => (
      <div className="text-indigo-400">
        <p className="text-xl font-bold mb-2">Formação Acadêmica</p>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <p className="font-semibold">{edu.course}</p>
            <p className="text-sm text-gray-400">{edu.institution} | {edu.period}</p>
          </div>
        ))}
      </div>
    ),
    certifications: () => (
      <div className="text-teal-400">
        <p className="text-xl font-bold mb-2">Certificações e Cursos</p>
        <ul className="list-disc pl-5 space-y-1">
          {resumeData.certifications.map((cert, index) => (
            <li key={index}>{cert.name} - {cert.institution}</li>
          ))}
        </ul>
      </div>
    ),
    projects: () => {
      // Projetos já importados no topo do arquivo
      return (
        <div className="text-purple-400">
          <p className="text-xl font-bold mb-2">Meus Projetos</p>
          <div className="space-y-3">
            {myProjects.map((project: Project, index: number) => (
              <div key={index}>
                <p className="font-bold">{project.projectTitle}</p>
                <p className="text-sm">{project.category.join(', ')}</p>
                <p className="text-xs text-gray-400">{project.descrition}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline"
                >
                  {project.link.includes('github.com') ? 'Ver no GitHub' : 'Ver projeto'}
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    },
    skills: (args) => {
      const filter = args.find((arg) => arg.startsWith('--filter='))?.split('=')[1];

      const skills = resumeData.skills;

      const filteredSkills = filter
        ? Object.entries(skills).reduce((acc, [category, techs]) => {
            const filtered = (techs as string[]).filter((tech: string) =>
              tech.toLowerCase().includes(filter.toLowerCase())
            );
            if (filtered.length > 0) {
              acc[category as keyof typeof skills] = filtered;
            }
            return acc;
          }, {} as typeof skills)
        : skills;

      return (
        <div className="text-yellow-400">
          <p className="text-xl font-bold mb-2">Minhas Habilidades</p>
          {Object.keys(filteredSkills).length > 0 ? (
            Object.entries(filteredSkills).map(([category, techs]) => (
              <div key={category} className="mb-2">
                <p className="font-bold capitalize">{category}</p>
                <p>{(techs as string[]).join(', ')}</p>
              </div>
            ))
          ) : (
            <p>Nenhuma habilidade encontrada com o filtro: {filter}</p>
          )}
        </div>
      );
    },
    contact: (args) => {
      const showForm = args.includes('--form');

      if (showForm) {
        setShowContactForm(true);
        // Return a message indicating the form is opening, instead of the form itself
        return <div className="text-cyan-400">Abrindo formulário de contato... Use 'close_form' para fechar.</div>;
      }

      // Se não for para abrir o formulário, mostra as informações de contato
      return (
        <div className="text-cyan-400">
          <p className="text-xl font-bold mb-2">Contato</p>
          <p>Email: <a href={`mailto:${resumeData.contact.email}`} className="underline">{resumeData.contact.email}</a></p>
          <p>LinkedIn: <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="underline">Perfil LinkedIn</a></p>
          <p>GitHub: <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="underline">Perfil GitHub</a></p>
          <p className="mt-2">Use o comando <code className="bg-gray-700 px-1 rounded">contact --form</code> para abrir o formulário de contato.</p>
        </div>
      );
    },
    close_form: () => {
      if (showContactForm) {
        setShowContactForm(false);
        setContactStatus('idle');
        setContactError(null);
        return <div className="text-yellow-400">Formulário de contato fechado.</div>;
      } else {
        return <div className="text-yellow-400">Nenhum formulário de contato aberto.</div>;
      }
    },
    clear: () => {
      setTimeout(() => setHistory([]), 0);
      return null;
    },
    login: () => {
      setShowLogin(true);
      return (
        <div className="text-yellow-400">
          <p>Iniciando processo de autenticação...</p>
        </div>
      );
    },
    logout: () => {
      if (authToken) {
        setAuthToken(null);
        setShowDashboard(false);
        return (
          <div className="text-green-400">
            <p>Logout realizado com sucesso!</p>
          </div>
        );
      }
      return (
        <div className="text-red-400">
          <p>Você não está autenticado.</p>
        </div>
      );
    },
    dashboard: () => {
      if (!authToken) {
        return (
          <div className="text-red-400">
            <p>Acesso negado. Use o comando &apos;login&apos; para autenticar.</p>
          </div>
        );
      }
      setShowDashboard(true);
      return (
        <div className="text-green-400">
          <p>Carregando dashboard...</p>
        </div>
      );
    },
    social: () => (
      <div className="text-blue-400">
        <p className="text-xl font-bold mb-2">Redes Sociais</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
            <span className="mr-2">🔗</span>
            <span>LinkedIn</span>
          </a>
          <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
            <span className="mr-2">🐙</span>
            <span>GitHub</span>
          </a>
          {/* Adicione outros links sociais se existirem em resumeData */}
          {/* Exemplo:
          <a href={resumeData.contact.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
            <span className="mr-2">🐦</span>
            <span>Twitter</span>
          </a>
          */}
        </div>
      </div>
    ),
    github: () => {
      // Idealmente, buscaria dados reais da API do GitHub
      const stats = {
        commits: 1247,
        pullRequests: 83,
        issues: 42,
        stars: 156,
        repositories: 28,
        contributions: [4, 7, 2, 8, 6, 3, 5, 9, 4, 6, 7, 8] // Dados simulados
      };

      return (
        <div className="text-purple-400">
          <p className="text-xl font-bold mb-2">GitHub Stats (Simulado)</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Commits:</span>
              <span className="font-mono">{stats.commits}</span>
            </div>
            <div className="flex justify-between">
              <span>Pull Requests:</span>
              <span className="font-mono">{stats.pullRequests}</span>
            </div>
            <div className="flex justify-between">
              <span>Issues:</span>
              <span className="font-mono">{stats.issues}</span>
            </div>
            <div className="flex justify-between">
              <span>Stars:</span>
              <span className="font-mono">{stats.stars}</span>
            </div>
            <div className="flex justify-between">
              <span>Repositórios:</span>
              <span className="font-mono">{stats.repositories}</span>
            </div>
            <div className="mt-2">
              <p className="mb-1">Contribuições (Últimos 12 meses):</p>
              <div className="flex space-x-1 overflow-x-auto pb-2">
                {stats.contributions.map((value, index) => (
                  <div
                    key={index}
                    className="w-4 h-4 rounded-sm flex-shrink-0"
                    style={{
                      backgroundColor: `rgba(129, 140, 248, ${Math.max(0.1, value / 10)})`,
                      // transform: `scaleY(${value / 10 + 0.2})` // Scale pode ser visualmente estranho
                    }}
                    title={`${value} contribuições`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    },
  };

  // Introdução animada - Keep the original sequence
  const introText = [
    'Iniciando sistema...', 800,
    'Carregando módulos...', 800,
    'Verificando integridade...', 800,
    'Estabelecendo conexão segura...', 800,
    'Acessando banco de dados...', 800,
    'Bem-vindo ao Terminal Hacker Portfolio v2.0', 1000,
    'Digite "help" para ver os comandos disponíveis.', 1000,
    () => {
      // Use a callback at the end of the sequence
      setIntroComplete(true);
    }
  ];

  const fixedHelpMessage = 'Digite "help" para ver os comandos disponíveis.'; // Keep this

  useEffect(() => {
    // Scroll to the bottom when history changes or intro completes
    endOfHistoryRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Foca no input quando a introdução está completa e nenhum modal está aberto
    if (introComplete && inputRef.current && !showLogin && !showDashboard && !showContactForm) {
      // Use setTimeout to ensure focus happens after potential layout shifts/scrolls
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [history, introComplete, showLogin, showDashboard, showContactForm]); // Add dependencies

  // Effect to focus contact form input when it appears
  useEffect(() => {
    if (showContactForm && contactNameInputRef.current) {
      // Use setTimeout to ensure the element is rendered and focusable
      setTimeout(() => contactNameInputRef.current?.focus(), 0);
    }
  }, [showContactForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    setInput(currentInput);

    // Reset history index if user starts typing a new command
    if (historyIndex !== -1) {
      setHistoryIndex(-1);
    }

   if (currentInput.trim() === '') {
     setSuggestions([]);
     setShowSuggestions(false);
     return;
   }

   const filteredCommands = Object.keys(commandHandlers).filter(cmd =>
     cmd.startsWith(currentInput.toLowerCase())
   );

   setSuggestions(filteredCommands);
   setActiveSuggestionIndex(0); // Reset active suggestion index
   setShowSuggestions(filteredCommands.length > 0 && currentInput.length > 0); // Show only if there are suggestions and input
  };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const targetElement = e.target as HTMLElement;
    // Allow default behavior if inside contact form inputs/textarea
    if (targetElement.closest('.contact-form-container') && (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
        // Allow specific keys like arrows, backspace, delete, tab within the form
        if (!['ArrowUp', 'ArrowDown', 'Tab', 'Enter'].includes(e.key)) {
            return;
        }
        // Prevent terminal history navigation if inside form
        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.stopPropagation(); // Stop propagation to prevent terminal handling
            return;
        }
        // Allow Tab and Enter default behavior within the form
        if (e.key === 'Tab' || e.key === 'Enter') {
            return;
        }
    }

     const commandHistory = history.map(h => h.command).filter(Boolean); // Filter out potential undefined/null commands

     if (e.key === 'ArrowUp') {
       e.preventDefault();
       if (showSuggestions && suggestions.length > 0) {
         setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
       } else if (commandHistory.length > 0) {
         const newIndex = historyIndex === -1
           ? commandHistory.length - 1
           : Math.max(0, historyIndex - 1);
         if (newIndex >= 0 && newIndex < commandHistory.length) { // Bounds check
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
         }
       }
     } else if (e.key === 'ArrowDown') {
       e.preventDefault();
       if (showSuggestions && suggestions.length > 0) {
         setActiveSuggestionIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
       } else if (historyIndex !== -1 && historyIndex < commandHistory.length - 1) {
         const newIndex = historyIndex + 1;
         setHistoryIndex(newIndex);
         setInput(commandHistory[newIndex]);
       } else {
         // If at the end of history or no history selected, clear input
         setHistoryIndex(-1);
         setInput('');
       }
     } else if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
       e.preventDefault();
       setInput(suggestions[activeSuggestionIndex]);
       setSuggestions([]);
       setShowSuggestions(false);
     } else if (e.key === 'Escape') {
       if (showSuggestions) {
         // e.preventDefault(); // Optional: prevent other escape actions
         setShowSuggestions(false);
         setSuggestions([]);
       }
     } else if (e.key === 'Enter') {
        // Enter is handled by form onSubmit, but if suggestions are shown, apply suggestion first
        if (showSuggestions && suggestions.length > 0) {
            e.preventDefault(); // Prevent form submission
            setInput(suggestions[activeSuggestionIndex]);
            setSuggestions([]);
            setShowSuggestions(false);
            // Do NOT submit here, let the user press Enter again to submit the completed command
        } else {
            // If no suggestions, let the form submit handle it (calls handleSubmit)
        }
     }
   };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const args = trimmedInput.split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1);

    let output: React.ReactNode;

    // Special handling for closing form via input
    if (command === 'close_form') {
        output = commandHandlers.close_form([]);
    } else if (command in commandHandlers) {
      output = commandHandlers[command](commandArgs);
    } else {
      output = (
        <p className="text-red-500">
          Comando não reconhecido: {command}. Digite &quot;help&quot; para ver os comandos disponíveis.
        </p>
      );
    }
    
    // Efeito sonoro de tecla (opcional)
    const keySound = new Audio();
    keySound.volume = 0.2;
    keySound.play().catch(() => {});
    
    if (command !== 'clear') {
      setHistory(prev => [
        ...prev,
        { command: input, output, timestamp: new Date() }
      ]);
    }
    
    setInput('');
    setHistoryIndex(-1); // Reset history index on submit
    setSuggestions([]); // Clear suggestions on submit
    setShowSuggestions(false);
  };

  // Handlers para autenticação
  const handleLoginSuccess = (token: string) => {
    setAuthToken(token);
    setShowLogin(false);
    // Adiciona uma mensagem de sucesso ao histórico ou executa o comando 'dashboard'
    addCommandToHistory('login', <div className="text-green-400">Login bem-sucedido! Use o comando 'dashboard' para acessar.</div>);
  };

  const handleLoginCancel = () => {
    setShowLogin(false);
    addCommandToHistory('login', <div className="text-yellow-400">Login cancelado.</div>);
  };

  const handleLogout = () => {
    if (!authToken) return; // Se não estiver logado, não faz nada
    setAuthToken(null);
    setShowDashboard(false);
    addCommandToHistory('logout', <div className="text-green-400">Logout realizado com sucesso!</div>);
  };

  const handleTerminalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;

    // Se o clique ocorreu dentro de um elemento interativo (input, textarea, button, a)
    // OU dentro de um dos contêineres especiais (login, dashboard, formulário de contato),
    // não faça nada e permita o comportamento padrão.
    if (
      targetElement.closest('input, textarea, button, a') ||
      targetElement.closest('.login-component-container') ||
      targetElement.closest('.dashboard-component-container') ||
      targetElement.closest('.contact-form-container')
    ) {
      return;
    }

    // Caso contrário (clique no fundo ou em texto não interativo), foca no input principal do terminal
    // Apenas foca se a introdução estiver completa e nenhum modal estiver aberto
    if (introComplete && inputRef.current && !showLogin && !showDashboard && !showContactForm) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="flex flex-col h-screen bg-black text-gray-300 font-mono text-sm p-2 border border-gray-700 rounded-lg shadow-lg"
      // onKeyDown={handleKeyDown} // Moved to input element
      // onClick={handleTerminalClick} // Moved to inner div to avoid interfering with header/input
      // tabIndex={0} // No longer needed here
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center">
          <FaTerminal className="mr-2 text-green-400" />
          {/* Apply green color to the title */}
          <h1 className="text-sm font-semibold text-green-400">Terminal Portfolio - {authToken ? 'Autenticado' : 'Visitante'}</h1>
        </div>
        {/* Add window controls if needed */}
      </div>

      {/* Main Terminal Area - Split into fixed top and scrollable history */}
      <div className="flex flex-col flex-grow overflow-hidden p-4" onClick={handleTerminalClick}> {/* Added flex-grow */}
      
          {/* Scrollable History Area (including Intro/Help, History, and Input) */}
          <div ref={terminalRef} className="flex-grow overflow-y-auto mb-2"> {/* Added flex-grow */}
               {/* Fixed Top Section (Intro/Help) - MOVED INSIDE */}
          <div className="flex-shrink-0">
            {/* Animated Intro */}
            {!introComplete ? (
              <TypeAnimation
                sequence={introText}
                wrapper="div"
                cursor={true}
                repeat={0}
                speed={60}
                className="text-green-400 whitespace-pre-line block mb-2" // Added mb-2
              />
            ) : (
              // Show fixed help message after intro is complete
              <div className="text-green-400 whitespace-pre-line block mb-2">{fixedHelpMessage}</div>
            )}
          </div>

          {/* History - Render only after intro is complete */}
          {introComplete && history.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <span className="flex-1 whitespace-pre-wrap break-words">{entry.command}</span>
              </div>
              <div className="pl-4 text-gray-300 whitespace-pre-wrap break-words">
                {entry.output}
              </div>
            </div>
          ))}

          {/* Input Form - Moved INSIDE the scrollable history area */}
          {introComplete && !showLogin && !showDashboard && !showContactForm && (
            <form onSubmit={handleSubmit} className="mt-2"> {/* Adjusted margin */}
              <div className="flex items-center relative">
                <span className="text-green-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown} // Use handleKeyDown for terminal input
                  className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 caret-green-500 terminal-input"
                  placeholder="Digite um comando..."
                  autoComplete="off"
                  disabled={!introComplete || showLogin || showDashboard || showContactForm}
                />
                {/* Suggestions Box */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute bottom-full left-0 mb-1 w-full bg-gray-800 border border-gray-700 rounded shadow-lg max-h-40 overflow-y-auto z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={suggestion} // Use suggestion as key if unique, or index if not
                        className={`px-3 py-1 cursor-pointer ${index === activeSuggestionIndex ? 'bg-gray-700 text-green-400' : 'text-gray-300 hover:bg-gray-600'}`}
                        onClick={() => {
                          setInput(suggestion);
                          setSuggestions([]);
                          setShowSuggestions(false);
                          inputRef.current?.focus();
                        }}
                        onMouseEnter={() => setActiveSuggestionIndex(index)} // Optional: highlight on hover
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>
          )}

            {/* Element to scroll to */}
            <div ref={endOfHistoryRef} />
          </div>

          {/* Input Form - Moved outside the scrollable history area but inside the main terminal container */}
          {/* {introComplete && !showLogin && !showDashboard && !showContactForm && (
            <form onSubmit={handleSubmit} className="mt-6 px-2 pb-2">        
              <div className="flex items-center relative">
                <span className="text-green-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown} // Use handleKeyDown for terminal input
                  className="flex-1 bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 caret-green-500 terminal-input"
                  placeholder="Digite um comando..."
                  autoComplete="off"
                  disabled={!introComplete || showLogin || showDashboard || showContactForm}
                />
                {/* Suggestions Box */}
                {/* {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute bottom-full left-0 mb-1 w-full bg-gray-800 border border-gray-700 rounded shadow-lg max-h-40 overflow-y-auto z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={suggestion} // Use suggestion as key if unique, or index if not
                        className={`px-3 py-1 cursor-pointer ${index === activeSuggestionIndex ? 'bg-gray-700 text-green-400' : 'text-gray-300 hover:bg-gray-600'}`}
                        onClick={() => {
                          setInput(suggestion);
                          setSuggestions([]);
                          setShowSuggestions(false);
                          inputRef.current?.focus();
                        }}
                        onMouseEnter={() => setActiveSuggestionIndex(index)} // Optional: highlight on hover
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )} */}
              {/* </div>
            </form>
          )} */}

          {/* Modals rendered outside the main flow */}
          {showLogin && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20 p-4">
              <Login
                onSuccess={handleLoginSuccess}
                onCancel={() => {
                  setShowLogin(false);
                  addCommandToHistory('login', <div className="text-yellow-400">Login cancelado.</div>);
                }}
              />
            </div>
          )}

          {showDashboard && authToken && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20 p-4">
              <Dashboard
                token={authToken}
                onLogout={() => {
                  commandHandlers.logout([]); // Call logout handler
                  setShowDashboard(false); // Ensure dashboard closes
                }}
              />
            </div>
          )}

          {showContactForm && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-20 p-4 contact-form-container">
              <form onSubmit={handleContactSubmit} className="bg-gray-800 border border-gray-700 rounded-md p-6 w-full max-w-lg space-y-4">
                <h2 className="text-xl font-bold text-cyan-400 mb-3">Formulário de Contato</h2>
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                  <input
                    ref={contactNameInputRef} // Ref for focus
                    id="contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  ></textarea>
                </div>
                {contactStatus === 'error' && contactError && (
                  <div className="text-red-400 text-sm py-1">{contactError}</div>
                )}
                {contactStatus === 'success' && (
                   <div className="text-green-400 text-sm py-1">Mensagem enviada!</div>
                )}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => commandHandlers.close_form([])} // Use handler to close
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
                  >
                    Fechar (ou use 'close_form')
                  </button>
                  <button
                    type="submit"
                    disabled={contactStatus === 'sending'}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded disabled:opacity-50"
                  >
                    {contactStatus === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        </div>
      );
    };

export default Terminal;
 // Add missing closing div tag here