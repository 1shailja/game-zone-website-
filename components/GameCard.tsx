
import React from 'react';
import { Game } from '../types';
import { Users, Clock, CreditCard, Play } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-3 py-1 bg-violet-600 rounded-full text-xs font-bold tracking-wider uppercase">
          {game.category}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {game.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 text-zinc-300 text-xs">
            <Users size={14} className="text-violet-500" />
            <span>{game.players}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300 text-xs">
            <Clock size={14} className="text-violet-500" />
            <span>{game.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">${game.price}</span>
            <span className="text-zinc-500 text-xs">/session</span>
          </div>
          <button 
            onClick={() => onSelect(game)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-violet-500 hover:text-white transition-all transform active:scale-95"
          >
            <Play size={16} fill="currentColor" />
            Book
          </button>
        </div>
      </div>
    </div>
  );
};
