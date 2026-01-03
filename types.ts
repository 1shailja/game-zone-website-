
export interface Game {
  id: string;
  title: string;
  description: string;
  players: string;
  duration: string;
  price: number;
  image: string;
  category: 'VR' | 'Arcade' | 'Physical' | 'Simulator';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
