import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import oxxoGoLogo from '../assets/oxxo-go-logo.png';

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 60); // 3 segundos total

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400">
      {/* Logo con animación de pulso */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="mb-8"
      >
        <div className="relative">
          {/* Logo OXXO GO */}
          <img 
            src={oxxoGoLogo} 
            alt="OXXO GO Logo" 
            className="w-32 h-32 drop-shadow-2xl rounded-3xl"
          />
          
          {/* Resplandor */}
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className="h-full w-full rounded-full bg-white/30 blur-xl"></div>
          </div>
        </div>
      </motion.div>

      {/* Texto OXXO GO */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-4xl font-bold text-white drop-shadow-lg"
      >
        OXXO GO
      </motion.h1>

      {/* Barra de progreso */}
      <div className="w-64 space-y-2">
        <div className="h-2 overflow-hidden rounded-full bg-white/30 backdrop-blur-sm">
          <motion.div
            className="h-full rounded-full bg-white shadow-lg"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Contador de progreso */}
        <div className="text-center">
          <span className="text-lg font-semibold text-white drop-shadow">
            {progress}%
          </span>
        </div>
      </div>

      {/* Texto de carga */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-sm text-white/80"
      >
        Inicializando sistema...
      </motion.p>
    </div>
  );
}
