'use client';

import Terminal from '../components/terminal/Terminal';

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4 h-full">
      <div className="w-full max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-6 text-center font-mono glitch-text">
          Jânio Alberto da Nóbrega Júnior
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-green-500 mb-6 text-center font-mono glitch-text">
          Desenvolvedor Full-Stack
        </h1>
        <Terminal />
        <div className="mt-4 text-gray-500 text-center text-xs">
          <p>© 2025 Hacker Portfolio. Todos os direitos reservados.</p>
          <p>Desenvolvido com Next.js, TypeScript e Tailwind CSS</p>
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
