
import React, { useState, useMemo } from 'react';
import { GAMES } from './constants';
import { Game } from './types';
import { GameCard } from './components/GameCard';
import { AIChat } from './components/AIChat';
import { Search, Filter, Gamepad2, Sparkles, MapPin, Phone, Instagram, Twitter } from 'lucide-react';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase()) || 
                          game.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || game.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const categories = ['All', 'VR', 'Arcade', 'Physical', 'Simulator'];

  return (
    <div className="min-h-screen flex flex-col selection:bg-violet-500 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="p-2 bg-violet-600 rounded-xl group-hover:rotate-12 transition-transform">
              <Gamepad2 size={24} />
            </div>
            <span className="font-heading text-2xl font-black tracking-tighter">NEXUS<span className="text-violet-500">ZONE</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Games</a>
            <a href="#" className="hover:text-white transition-colors">Tournaments</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>

          <button className="px-6 py-2 bg-zinc-900 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-all font-bold">
            Sign In
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black"></div>
          
          <div className="relative z-10 text-center max-w-4xl px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/20 border border-violet-500/50 rounded-full text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> The Ultimate Entertainment Hub
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black mb-6 leading-tight">
              LEVEL UP YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 neon-glow uppercase">Weekend</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Experience the next generation of gaming with immersive VR, competitive simulators, and classic arcade action.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                BOOK YOUR SLOT
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-zinc-700 hover:border-white rounded-2xl font-black text-lg transition-all">
                BROWSE GAMES
              </button>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-2 uppercase">Our Games</h2>
              <p className="text-zinc-500">Choose your challenge from our curated library.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search games..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                      categoryFilter === cat 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.length > 0 ? (
              filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onSelect={(g) => setSelectedGame(g)} 
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="inline-block p-6 bg-zinc-900 rounded-full mb-4">
                  <Gamepad2 size={48} className="text-zinc-700" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-400">No games found</h3>
                <p className="text-zinc-600">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </section>

        {/* Info Banner */}
        <section className="bg-violet-600 py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="font-heading text-5xl font-black mb-2 uppercase">50+</div>
              <div className="text-violet-200 font-bold uppercase tracking-wider">Premium Games</div>
            </div>
            <div>
              <div className="font-heading text-5xl font-black mb-2 uppercase">4.9/5</div>
              <div className="text-violet-200 font-bold uppercase tracking-wider">User Rating</div>
            </div>
            <div>
              <div className="font-heading text-5xl font-black mb-2 uppercase">24/7</div>
              <div className="text-violet-200 font-bold uppercase tracking-wider">Gaming Support</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-violet-600 rounded-lg">
                  <Gamepad2 size={20} />
                </div>
                <span className="font-heading text-xl font-black">NEXUS<span className="text-violet-500">ZONE</span></span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                The city's premier gaming destination. High-end hardware, competitive atmosphere, and endless fun.
              </p>
              <div className="flex gap-4">
                <button className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </button>
                <button className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Games Catalog</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Cafe Menu</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Member Perks</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Career</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Support</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li><a href="#" className="hover:text-violet-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-violet-400 transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
              <ul className="space-y-4 text-zinc-500 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-violet-500 mt-0.5" />
                  <span>123 Cyber Plaza, <br />Future City, FC 56001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-violet-500" />
                  <span>+1 (555) 000-ZONE</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
            © {new Date().getFullYear()} NEXUS Game Zone. All rights reserved. Built for champions.
          </div>
        </div>
      </footer>

      {/* Booking Modal (Simplified) */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedGame(null)}></div>
          <div className="relative bg-zinc-900 border border-violet-500/30 rounded-3xl w-full max-w-lg p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <button onClick={() => setSelectedGame(null)} className="text-zinc-500 hover:text-white transition-colors">
                Close
              </button>
            </div>
            
            <h3 className="font-heading text-3xl font-bold mb-2 uppercase">{selectedGame.title}</h3>
            <p className="text-zinc-400 mb-8">{selectedGame.description}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-zinc-500 uppercase text-xs font-bold">Base Price</span>
                <span className="text-xl font-bold">${selectedGame.price}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-zinc-500 uppercase text-xs font-bold">Capacity</span>
                <span className="font-bold">{selectedGame.players}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-zinc-800">
                <span className="text-zinc-500 uppercase text-xs font-bold">Duration</span>
                <span className="font-bold">{selectedGame.duration}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-lg shadow-violet-500/20">
              CONFIRM RESERVATION
            </button>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;
