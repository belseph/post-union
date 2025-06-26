import React, { useState } from 'react';
import { Button } from "../Button";
import { Input } from "../Input";
import { ArrowLeft, Plus, Image, Tag, FileText, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    navigate('/home');
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-white/80 hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Crear Nueva Publicación</h1>
            <p className="text-white/70">Comparte tu experiencia y conocimientos con la comunidad</p>
          </div>
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

            {/* Tags */}
            <div>
              <Input
                label="Tags (separados por comas)"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="startup, validación, negocio, equipo"
                leftIcon={<Tag className="w-5 h-5" />}
                fullWidth
                helperText="Usa tags relevantes para que otros puedan encontrar tu publicación"
              />
            </div>

            {/* Imagen */}
            <div>
              <Input
                label="Imagen de la publicación"
                name="image"
                type="file"
                onChange={handleInputChange}
                accept="image/*"
                fileText="Seleccionar imagen"
                leftIcon={<Image className="w-5 h-5" />}
                fullWidth
                helperText="Formatos soportados: JPG, PNG, GIF (máx. 5MB)"
              />
            </div>

            {/* Botón */}
            <div className="pt-4 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.description}
                title={isSubmitting ? 'Publicando...' : 'Publicar'}
                icons={isSubmitting ? <span className="mr-2 animate-spin">⚙️</span> : <Plus className="w-4 h-4 mr-2" />}
                className={`w-full max-w-xs font-semibold py-3 px-6 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 focus:ring-purple-400/20 ${
                  (isSubmitting || !formData.title || !formData.description) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
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
              Usa tags relevantes para mejorar la visibilidad
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Las imágenes ayudan a hacer tu contenido más atractivo
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};