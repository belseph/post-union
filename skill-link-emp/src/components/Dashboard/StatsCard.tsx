import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color: 'emerald' | 'purple' | 'blue' | 'orange';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const colorClasses = {
    emerald: 'from-emerald-400 to-emerald-600',
    purple: 'from-purple-400 to-purple-600',
    blue: 'from-blue-400 to-blue-600',
    orange: 'from-orange-400 to-orange-600'
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          {change && (
            <p className="text-emerald-300 text-sm mt-1 font-medium">{change}</p>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};