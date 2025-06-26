
import { Search, X } from 'lucide-react';
import { FC } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

export const SearchBar:FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-white" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 border bg-white/20 border border-white/30 rounded-lg placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder={placeholder}
      />
      {searchTerm && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            onClick={() => onSearchChange('')}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};