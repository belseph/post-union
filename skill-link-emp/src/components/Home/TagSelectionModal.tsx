import React from 'react';
import { X, Check, Tag } from 'lucide-react';
import { TagInfo } from '../../constants/tags';

interface TagSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  availableTags: TagInfo[];
}

export const TagSelectionModal: React.FC<TagSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedTags,
  onTagToggle,
  availableTags
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const canProceed = selectedTags.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white">
              Selecciona las etiquetas
            </h3>
            <p className="text-white/70 text-sm mt-1">
              Elige las categorías que mejor describan tu publicación
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-colors cursor-pointer duration-300 p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="mb-4">
            <p className="text-white/70 text-sm">
              {selectedTags.length} etiqueta{selectedTags.length !== 1 ? 's' : ''} seleccionada{selectedTags.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id);
              
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => onTagToggle(tag.id)}
                  className={`relative p-4 cursor-pointer rounded-xl border-2 transition-all duration-300 text-left group hover:scale-[1.02] ${
                    isSelected
                      ? 'border-purple-400 bg-purple-500/20 shadow-lg'
                      : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1.5 rounded-lg ${
                        isSelected 
                          ? 'bg-purple-500/30' 
                          : 'bg-white/10 group-hover:bg-white/15'
                      }`}>
                        <Tag className={`w-4 h-4 ${
                          isSelected ? 'text-purple-300' : 'text-white/70'
                        }`} />
                      </div>
                      
                      <h4 className={`font-semibold text-sm ${
                        isSelected ? 'text-white' : 'text-white/90'
                      }`}>
                        {tag.label}
                      </h4>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <p className={`text-xs leading-relaxed ${
                    isSelected ? 'text-white/80' : 'text-white/60'
                  }`}>
                    {tag.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/70">
              {!canProceed && (
                <span className="text-orange-400">
                  Selecciona al menos una etiqueta
                </span>
              )}
              {canProceed && (
                <span className="text-green-400">
                  ✓ {selectedTags.length} etiqueta{selectedTags.length !== 1 ? 's' : ''} seleccionada{selectedTags.length !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 cursor-pointer bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-all duration-300 text-sm"
              >
                {canProceed ? 'Confirmar' : 'Cancelar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};