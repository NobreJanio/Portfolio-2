'use client';

import Terminal from '../components/terminal/Terminal';

export default function Home() {
  return (
    <div className="bg-black h-screen flex flex-col p-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 overflow-hidden">
        <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-2 text-center font-mono glitch-text flex-shrink-0">
          Jânio Alberto da Nóbrega Júnior
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-4 text-center font-mono glitch-text flex-shrink-0">
          Desenvolvedor Full-Stack
        </h1>
        <Terminal />
        <div className="mt-2 text-gray-500 text-center text-xs flex-shrink-0">
          <p>© 2025 Hacker Portfolio. Todos os direitos reservados.</p>
          <p>Desenvolvido com Next.js, TypeScript e Tailwind CSS</p>
          <p><a href="https://portfoliojanio.web.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Versão Antiga</a></p>
        </div>
      </div>
      <style jsx global>{`
        .glitch-text {
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                     -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                     0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 2s infinite;
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                       -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                       0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                       -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                       0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                       0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                       -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                       0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                       -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                       0.05em 0 0 rgba(0, 255, 0, 0.75),
                       0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                       0.05em 0 0 rgba(0, 255, 0, 0.75),
                       0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                       -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                       -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }
      `}</style>
    </div>
  );
}
