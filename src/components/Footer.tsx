import React from 'react';
import { Heart, Stars } from 'lucide-react';

function Footer() {
  return (
    <footer className="mt-12 text-center relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/30 border border-purple-700/20 backdrop-blur-sm">
          <span className="text-xs text-purple-300">Built with</span>
          <Heart className="w-3 h-3 text-pink-400 animate-pulse" />
          <span className="text-xs text-purple-300">by</span>
          <a 
            href="https://www.facebook.com/LikhonDasAxtillar" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs font-medium bg-gradient-to-r from-violet-400 to-purple-400 text-transparent bg-clip-text hover:from-violet-300 hover:to-purple-300 transition-all"
          >
            Lik Ho N!
          </a>
          <Stars className="w-3 h-3 text-violet-400" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;