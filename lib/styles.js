'use client';

// Define color variables to be used across components
export const colors = {
  background: '#fffdf7',
  foreground: '#1a1a1a',
  card: '#ffffff',
  cardForeground: '#1a1a1a',
  popover: '#ffffff',
  popoverForeground: '#1a1a1a',
  primary: '#ffc107',
  primaryForeground: '#1a1a1a',
  secondary: '#ffecb3',
  secondaryForeground: '#1a1a1a',
  muted: '#f8f8f8',
  mutedForeground: '#6c6c6c',
  accent: '#ffd54f',
  accentForeground: '#1a1a1a',
  destructive: '#ff3d00',
  destructiveForeground: '#ffffff',
  border: '#e6e6e6',
  input: '#e6e6e6',
  ring: '#ffc107',
  weldingBlue: '#3d5afe',
  weldingDark: '#333333',
  weldingOrange: '#ff9800',
  weldingRed: '#ff5252'
}

export const shadows = {
  yellow: '0 4px 14px rgba(255, 193, 7, 0.25)',
  card: '0 4px 10px rgba(0, 0, 0, 0.05)',
  cardHover: '0 10px 25px rgba(0, 0, 0, 0.1)'
}

export const transitions = {
  standard: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  hover: 'transform 0.3s ease'
}

export const gradients = {
  yellowGradient: 'linear-gradient(135deg, #ffc107, #ff9800)',
  textGradient: 'linear-gradient(90deg, #ff9800, #ffc107)'
}

// Create CSS for keyframes to be added to head
export const createGlobalStyles = () => {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes spark {
        0%, 100% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
      
      @keyframes weld {
        0% { width: 0%; }
        100% { width: 100%; }
      }
      
      .animate-spark {
        animation: spark 2s infinite;
      }
      
      .animate-weld {
        animation: weld 3s ease-in-out;
      }
      
      .text-gradient {
        background: ${gradients.textGradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .bg-gradient-yellow {
        background: ${gradients.yellowGradient};
      }
      
      .shadow-yellow {
        box-shadow: ${shadows.yellow};
      }
      
      .hover-up {
        transition: ${transitions.hover};
      }
      
      .hover-up:hover {
        transform: translateY(-5px);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }
  return () => {};
}

// Custom utility function for conditional class names
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}