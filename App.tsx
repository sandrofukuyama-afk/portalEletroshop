
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Wrench, 
  ShieldCheck, 
  RefreshCcw, 
  MonitorPlay,
  Clock
} from 'lucide-react';
import { SystemButton } from './types';
import LauncherButton from './components/LauncherButton';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const systems: SystemButton[] = [
    {
      id: 'nebula',
      name: 'NebulaPOS',
      url: 'https://nebulapos.app',
      description: 'Caixa • Vendas • Recebimentos',
      icon: <Rocket className="w-12 h-12 text-blue-400" />
    },
    {
      id: 'repair',
      name: 'RepairTech',
      url: 'https://repairtechbrjp.app',
      description: 'Assistência técnica • Garantia',
      icon: <Wrench className="w-12 h-12 text-orange-400" />
    },
    {
      id: 'ips',
      name: 'IPS Manager',
      url: 'https://ipsmanager.app',
      description: 'Gestão • Recibos • Auditoria',
      icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />
    },
    {
      id: 'buyback',
      name: 'BuyBack',
      url: 'https://reuse-trade-hub.vercel.app',
      description: 'Recompra • Reuse • Trade',
      icon: <RefreshCcw className="w-12 h-12 text-purple-400" />
    },
    {
      id: 'tv',
      name: 'TV Assinatura',
      url: 'https://tv-assinatura-manager-090b4fa3.base44.app',
      description: 'Planos • Clientes • Pagamentos',
      icon: <MonitorPlay className="w-12 h-12 text-red-400" />,
      fullWidth: true
    }
  ];

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(currentTime);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between pt-[calc(2rem+env(safe-area-inset-top))]">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Casa Blanca Eletroshop
          </h1>
          <p className="text-xl text-gray-400 font-light">
            Sistemas de balcão e atendimento
          </p>
        </div>
        
        <div className="mt-6 md:mt-0 text-right">
          <div className="flex items-center justify-end space-x-3 text-3xl font-mono text-white mb-1">
            <Clock className="w-8 h-8 text-gray-500" />
            <span>{formattedTime}</span>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {formattedDate}
          </p>
        </div>
      </header>

      {/* Launcher Grid */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {systems.map((system) => (
            <LauncherButton key={system.id} system={system} />
          ))}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-12 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Casa Blanca Eletroshop • Terminal PDV Ativo</p>
      </footer>
    </div>
  );
};

export default App;
