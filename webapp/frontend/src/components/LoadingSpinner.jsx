import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  overlay = false,
  type = 'crystal' 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const spinnerTypes = {
    crystal: 'spinner-crystal',
    dice: 'spinner-dice',
    magic: 'spinner-magic'
  };

  const containerClass = overlay ? 'loading-overlay' : 'loading-container';
  
  return (
    <div className={containerClass}>
      <div className={`loading-spinner ${sizeClasses[size]} ${spinnerTypes[type]}`}>
        {type === 'dice' && (
          <div className="dice-spinner">
            <div className="dice-face">🎲</div>
          </div>
        )}
        {type === 'magic' && (
          <div className="magic-spinner">
            <div className="magic-circle">
              <div className="magic-rune">✦</div>
              <div className="magic-rune">✧</div>
              <div className="magic-rune">✦</div>
              <div className="magic-rune">✧</div>
            </div>
          </div>
        )}
        {type === 'crystal' && (
          <div className="crystal-spinner">
            <div className="crystal-core"></div>
            <div className="crystal-ring"></div>
            <div className="crystal-ring crystal-ring-2"></div>
          </div>
        )}
      </div>
      {message && <p className="loading-message">{message}</p>}
      
      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--ff9-bg-card);
          border-radius: 12px;
          border: 2px solid var(--ff9-border-primary);
          box-shadow: 0 4px 15px var(--ff9-shadow-secondary);
          backdrop-filter: blur(10px);
        }
        
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(5px);
        }
        
        .loading-spinner {
          position: relative;
          display: inline-block;
        }
        
        .spinner-small {
          width: 30px;
          height: 30px;
        }
        
        .spinner-medium {
          width: 50px;
          height: 50px;
        }
        
        .spinner-large {
          width: 80px;
          height: 80px;
        }
        
        /* Crystal Spinner */
        .crystal-spinner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .crystal-core {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, var(--ff9-crystal-blue), var(--ff9-crystal-purple));
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: crystal-pulse 2s ease-in-out infinite;
          box-shadow: 0 0 20px var(--ff9-shadow-crystal);
        }
        
        .crystal-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top: 3px solid var(--ff9-crystal-blue);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: crystal-spin 1.5s linear infinite;
        }
        
        .crystal-ring-2 {
          border-top: 3px solid var(--ff9-crystal-purple);
          animation: crystal-spin 1.5s linear infinite reverse;
          animation-delay: 0.3s;
        }
        
        /* Dice Spinner */
        .dice-spinner {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .dice-face {
          font-size: 2rem;
          animation: dice-roll 1s ease-in-out infinite;
          filter: drop-shadow(0 0 10px var(--ff9-shadow-gold));
        }
        
        /* Magic Spinner */
        .magic-spinner {
          width: 100%;
          height: 100%;
          position: relative;
        }
        
        .magic-circle {
          width: 100%;
          height: 100%;
          position: relative;
          animation: magic-rotate 3s linear infinite;
        }
        
        .magic-rune {
          position: absolute;
          font-size: 1.2rem;
          color: var(--ff9-text-gold);
          text-shadow: 0 0 15px var(--ff9-shadow-gold);
          animation: magic-pulse 2s ease-in-out infinite;
        }
        
        .magic-rune:nth-child(1) {
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .magic-rune:nth-child(2) {
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          animation-delay: 0.5s;
        }
        
        .magic-rune:nth-child(3) {
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 1s;
        }
        
        .magic-rune:nth-child(4) {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          animation-delay: 1.5s;
        }
        
        .loading-message {
          margin-top: 1rem;
          color: var(--ff9-text-primary);
          font-family: var(--ff9-font-body);
          font-size: 1rem;
          text-align: center;
          animation: text-pulse 2s ease-in-out infinite;
        }
        
        /* Animations */
        @keyframes crystal-spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes crystal-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes dice-roll {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.1); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.1); }
        }
        
        @keyframes magic-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes magic-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes text-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .loading-container {
            padding: 1rem;
          }
          
          .loading-message {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;