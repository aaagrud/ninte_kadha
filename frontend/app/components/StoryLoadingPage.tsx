import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface StoryLoadingPageProps {
  onLoadingComplete: () => void;
  redirectPath?: string;
}

const StoryLoadingPage: React.FC<StoryLoadingPageProps> = ({ 
  onLoadingComplete,
  redirectPath = '/book/page'
}) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  
  const loadingMessages = [
    "Let the AI weave your dream story...",
    "Cooking up your personalized tale...",
    "Sprinkling magic into your story...",
    "Gathering stardust for your adventure...",
    "Brewing a potion of imagination..."
  ];
  
  const [message, setMessage] = useState(loadingMessages[0]);
  
  useEffect(() => {
    // Simple approach with direct timeouts
    
    // Change messages
    const messageTimer = setTimeout(() => {
      setMessage(loadingMessages[1]);
    }, 600);
    
    // Progress steps
    setTimeout(() => setProgress(20), 600);   // 0.6s
    setTimeout(() => {
      setProgress(40);
      setMessage(loadingMessages[2]);
    }, 1200);  // 1.2s
    
    setTimeout(() => setProgress(60), 1800);  // 1.8s
    
    setTimeout(() => {
      setProgress(80);
      setMessage(loadingMessages[3]);
    }, 2400);  // 2.4s
    
    // Final step and transition
    const finalTimer = setTimeout(() => {
      setProgress(100);
      setMessage(loadingMessages[4]);
      
      // Transition after a short delay
      setTimeout(() => {
        setShowLoader(false);
        setTimeout(() => {
          // Try both navigation methods for reliability
          if (onLoadingComplete) {
            onLoadingComplete();
          }
          
          // Direct navigation as fallback
          if (redirectPath) {
            window.location.href = redirectPath;
          }
        }, 500);
      }, 200);
    }, 3000);
    
    return () => {
      clearTimeout(messageTimer);
      clearTimeout(finalTimer);
    };
  }, [redirectPath]);
  
  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div 
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-blue-100 z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-md px-6 py-8 flex flex-col items-center">
            {/* Cloud SVG */}
            <div className="mb-8 relative w-32 h-32">
              <Image 
                src="/images/thinking-cloud.svg" 
                alt="Thinking cloud" 
                width={128}
                height={128}
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            {/* Loading message */}
            <motion.h2 
              className="text-2xl font-bold text-purple-700 mb-6 text-center"
              initial={{ y: 5 }}
              animate={{ y: -5 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 1.5 
              }}
            >
              {message}
            </motion.h2>
            
            {/* Candy-striped loading bar */}
            <div className="w-full h-8 bg-white rounded-full overflow-hidden border-2 border-pink-300 shadow-lg">
              <div 
                className="h-full rounded-full relative overflow-hidden transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div 
                  className="absolute inset-0 candy-stripe-bg"
                  style={{
                    background: `repeating-linear-gradient(
                      45deg,
                      #FF9EB1,
                      #FF9EB1 10px,
                      #FFD0D0 10px,
                      #FFD0D0 20px
                    )`
                  }}
                />
              </div>
            </div>
            
            {/* Progress percentage */}
            <p className="mt-2 text-purple-600 font-medium">
              {progress}% complete
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryLoadingPage; 