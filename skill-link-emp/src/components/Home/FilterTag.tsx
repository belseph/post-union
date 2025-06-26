
import { X } from 'lucide-react';
import { FC } from 'react';

interface FilterTagProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export const FilterTag: FC<FilterTagProps> = ({
  allTags,
  selectedTags,
  onTagToggle,
  onClearFilters
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Filtrar por etiquetas</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            Limpiar filtros
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  : 'bg-purple-500 text-white hover:bg-purple-700 border-2 border-transparent'
              }`}
            >
              {tag}
              {isSelected && (
                <X className="inline-block ml-1 h-3 w-3" />
              )}
            </button>
          );
        })}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Filtros activos: {selectedTags.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};