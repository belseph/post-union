import React from 'react';
import { Plus, Filter, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { FILTER_TAGS, getTagGradient, getTagShortLabel } from '../../constants/tags';

interface HeaderProps {
  onCreatePost: () => void;
  selectedTag: string;
  onTagChange: (tag: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onCreatePost, selectedTag, onTagChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700 border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                SkillLink Emprendedor
              </h1>
              <p className="text-sm text-white/80">Conecta, aprende y emprende</p>
            </div>
          </div>
          
          <Button
            onClick={onCreatePost}
            icon={Plus}
            className="bg-purple-500 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Crear Post
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-white" />
          <div className="flex flex-wrap gap-2">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => onTagChange(tag.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer ${
                  selectedTag === tag.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-md text-white hover:bg-purple-500'
                }`}
                title={tag.description}
              >
                {getTagShortLabel(tag.id)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;