import React, { useState } from 'react';
import { Input } from './Input';

export const FileInputExample = () => {
  const [selectedFiles, setSelectedFiles] = useState<{
    single: File | null;
    multiple: File[];
    image: File | null;
    document: File | null;
  }>({
    single: null,
    multiple: [],
    image: null,
    document: null,
  });

  const handleFileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (field === 'multiple') {
        setSelectedFiles(prev => ({
          ...prev,
          multiple: Array.from(files)
        }));
      } else {
        setSelectedFiles(prev => ({
          ...prev,
          [field]: files[0]
        }));
      }
    }
  };

  const FileIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const ImageIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const DocumentIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Input de Archivo Personalizado</h1>
      
      {/* Input de archivo básico */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Input de Archivo Básico</h2>
        <Input
          label="Seleccionar archivo"
          type="file"
          onChange={handleFileChange('single')}
          fullWidth
        />
        {selectedFiles.single && (
          <p className="text-sm text-green-600">
            Archivo seleccionado: {selectedFiles.single.name}
          </p>
        )}
      </div>

      {/* Input de archivo con texto personalizado */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Con Texto Personalizado</h2>
        <Input
          label="Subir documento"
          type="file"
          fileText="Haz clic para subir tu documento"
          onChange={handleFileChange('document')}
          leftIcon={<DocumentIcon />}
          fullWidth
        />
        {selectedFiles.document && (
          <p className="text-sm text-green-600">
            Documento: {selectedFiles.document.name}
          </p>
        )}
      </div>

      {/* Input de archivo con icono */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Con Icono</h2>
        <Input
          label="Subir imagen"
          type="file"
          accept="image/*"
          fileText="Seleccionar imagen"
          onChange={handleFileChange('image')}
          leftIcon={<ImageIcon />}
          fullWidth
        />
        {selectedFiles.image && (
          <p className="text-sm text-green-600">
            Imagen: {selectedFiles.image.name}
          </p>
        )}
      </div>

      {/* Input de archivo múltiple */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Múltiples Archivos</h2>
        <Input
          label="Subir varios archivos"
          type="file"
          multiple
          fileText="Seleccionar archivos"
          onChange={handleFileChange('multiple')}
          leftIcon={<FileIcon />}
          fullWidth
        />
        {selectedFiles.multiple.length > 0 && (
          <div className="text-sm text-green-600">
            <p>Archivos seleccionados:</p>
            <ul className="list-disc list-inside mt-1">
              {selectedFiles.multiple.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Diferentes variantes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Diferentes Variantes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Default"
            type="file"
            fileText="Variante default"
            variant="default"
            fullWidth
          />
          <Input
            label="Filled"
            type="file"
            fileText="Variante filled"
            variant="filled"
            fullWidth
          />
          <Input
            label="Outlined"
            type="file"
            fileText="Variante outlined"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>

      {/* Diferentes tamaños */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Diferentes Tamaños</h2>
        <div className="space-y-4">
          <Input
            label="Tamaño pequeño"
            type="file"
            fileText="Input pequeño"
            inputSize="sm"
            fullWidth
          />
          <Input
            label="Tamaño mediano"
            type="file"
            fileText="Input mediano"
            inputSize="md"
            fullWidth
          />
          <Input
            label="Tamaño grande"
            type="file"
            fileText="Input grande"
            inputSize="lg"
            fullWidth
          />
        </div>
      </div>

      {/* Input con error */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Con Error</h2>
        <Input
          label="Archivo requerido"
          type="file"
          fileText="Seleccionar archivo"
          error="Debes seleccionar un archivo"
          fullWidth
        />
      </div>

      {/* Input deshabilitado */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Deshabilitado</h2>
        <Input
          label="Archivo deshabilitado"
          type="file"
          fileText="No disponible"
          disabled
          fullWidth
        />
      </div>
    </div>
  );
}; 