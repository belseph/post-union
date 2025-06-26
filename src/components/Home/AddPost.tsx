import React, { useState } from 'react';
import { Button } from "../Button";
import { Input } from "../Input";
import { ArrowLeft, Plus, Image, Tag, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePostsContext } from '../../context/PostsContext';
import { TagSelectionModal } from './TagSelectionModal';
import { AVAILABLE_TAGS } from '../../constants/tags';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://skill-link-emprendedor-pjof.onrender.com';

export const AddPost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { invalidateCache } = usePostsContext(); // 🎯 Acceso al contexto
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Debug: Verificar datos del usuario
  console.log('🔍 Usuario actual en AddPost:', user);
  console.log('🆔 ID del usuario:', user?.userId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const createPost = async (postData: { titulo: string; contenido: string }, userId: string) => {
    try {
      console.log('🚀 Creando post:', postData);
      console.log('👤 Con usuario ID:', userId);
      
      const response = await fetch(`${API_BASE_URL}/api/posts?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      console.log('📡 Respuesta del servidor:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Post creado exitosamente:', result);
      return result;
    } catch (error) {
      console.error('❌ Error al crear post:', error);
      throw error;
    }
  };

  const addTagsToPost = async (postId: string, tagNames: string[]) => {
    try {
      console.log('🏷️ Agregando tags al post:', postId, tagNames);
      
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tagNames }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error agregando tags: ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ Tags agregados exitosamente:', result);
      return result;
    } catch (error) {
      console.error('❌ Error al agregar tags:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !user.userId) {
      alert('Debes estar logueado para crear un post');
      console.error('❌ Usuario no encontrado o sin ID:', user);
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      alert('El título y la descripción son obligatorios');
      return;
    }

    if (selectedTags.length === 0) {
      alert('Debes seleccionar al menos una etiqueta');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Crear el post
      const postData = {
        titulo: formData.title.trim(),
        contenido: formData.description.trim()
      };

      const createdPost = await createPost(postData, user.userId);
      
      // 2. Agregar las etiquetas al post
      if (selectedTags.length > 0) {
        await addTagsToPost(createdPost.id, selectedTags);
      }

      console.log('🎉 Post creado completamente con tags');
      
      // 🎯 INVALIDAR CACHE para que se recarguen los posts
      invalidateCache();
      
      // Mostrar mensaje de éxito
      alert('¡Post creado exitosamente!');
      
      // Redirigir al home
      navigate('/home');
      
    } catch (error: any) {
      console.error('Error completo:', error);
      alert(`Error al crear el post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/home');
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón a la izquierda */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-white/80 hover:text-white transition-colors duration-200 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </button>
          
          <div className="text-center flex-1 mx-8">
            <h1 className="text-3xl font-bold text-white mb-2">Crear Nueva Publicación</h1>
            <p className="text-white/70">Comparte tu experiencia y conocimientos con la comunidad</p>
          </div>
          
          {/* Espacio para balance visual */}
          <div className="w-32"></div>
        </div>

        {/* Formulario */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Título */}
            <div>
              <Input
                label="Título de la publicación"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Cómo construir un MVP en 30 días"
                leftIcon={<FileText className="w-5 h-5" />}
                fullWidth
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Comparte tu experiencia, consejos o aprendizajes..."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                rows={6}
                required
              />
            </div>

            {/* Selección de Tags */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Etiquetas
              </label>
              <button
                type="button"
                onClick={() => setShowTagModal(true)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/25 transition-all duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-white/70" />
                  <span className={selectedTags.length > 0 ? 'text-white' : 'text-white/60'}>
                    {selectedTags.length > 0 
                      ? `${selectedTags.length} etiqueta${selectedTags.length > 1 ? 's' : ''} seleccionada${selectedTags.length > 1 ? 's' : ''}`
                      : 'Seleccionar etiquetas'
                    }
                  </span>
                </div>
                <Plus className="w-5 h-5 text-white/70" />
              </button>
              
              {selectedTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedTags.map((tagId) => {
                    const tag = AVAILABLE_TAGS.find(t => t.id === tagId);
                    return (
                      <span
                        key={tagId}
                        className="px-3 py-1 bg-purple-500 text-white text-sm rounded-full flex items-center space-x-2"
                      >
                        <span>#{tag?.label}</span>
                        <button
                          type="button"
                          onClick={() => handleTagToggle(tagId)}
                          className="text-white/80 hover:text-white"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Imagen */}
            <div>
              <Input
                label="Imagen de la publicación (opcional)"
                name="image"
                type="file"
                onChange={handleInputChange}
                accept="image/*"
                fileText="Seleccionar imagen"
                leftIcon={<Image className="w-5 h-5" />}
                fullWidth
                helperText="Solo para vista previa - no se guardará en el servidor"
              />
              
              {imagePreview && (
                <div className="mt-4 relative">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Botón */}
            <div className="pt-4 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description || selectedTags.length === 0}
                title={isSubmitting ? 'Publicando...' : 'Publicar'}
                icons={isSubmitting ? <span className="mr-2 animate-spin">⚙️</span> : <Send className="w-4 h-4 mr-2" />}
                className={`w-full max-w-xs font-semibold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-400/20 ${
                  (isSubmitting || !formData.title || !formData.description || selectedTags.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Plus className="w-5 h-5 mr-2 text-purple-300" />
            Consejos para una buena publicación
          </h3>
          <ul className="space-y-2 text-white/70 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Sé específico y proporciona valor real a la comunidad
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Incluye ejemplos prácticos y casos de uso
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Usa etiquetas relevantes para mejorar la visibilidad
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Las imágenes ayudan a hacer tu contenido más atractivo
            </li>
          </ul>
        </div>
      </div>

      {/* Modal de selección de tags */}
      {showTagModal && (
        <TagSelectionModal
          isOpen={showTagModal}
          onClose={() => setShowTagModal(false)}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={AVAILABLE_TAGS}
        />
      )}
    </div>
  );
};