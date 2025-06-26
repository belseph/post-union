import React from 'react';

interface PostContentProps {
  title: string;
  content: string;
  image?: string;
}

const PostContent: React.FC<PostContentProps> = ({ title, content, image }) => {
  return (
    <div className="pb-4">
      {/* Título del post */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white leading-tight">
          {title}
        </h2>
      </div>

      {/* Contenido del post */}
      <div className="prose prose-slate max-w-none mb-4">
        <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </p>
      </div>

      {/* Imagen del post */}
      {image && (
        <div className="rounded-lg overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;