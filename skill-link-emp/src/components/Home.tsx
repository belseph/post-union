import { mockPosts } from "../data/mockData";
import  PostCard  from "./Post/components/post/PostCard";
import { ProfileCard } from "./Home/ProfileCard";
import { Filter, Plus, Search, Tag, TrendingUp } from "lucide-react";
import { SearchBar } from "./Home/SearchBar";
import { useMemo, useState } from "react";
import { IPost } from "../types/IPost";
import { FilterTag } from "./Home/FilterTag";
import { filterPosts, getAllTags } from "../utils/post";
import { useNavigate } from "react-router-dom";
import { usePosts } from './Post/hooks/usePosts';

export const Home = ({ selectedTag, currentUserId }) => {
  const { 
      posts, 
      loading, 
      error, 
      fetchPosts, 
      handleReaction, 
      handleCommentReaction,
      handleNewComment
    } = usePosts({ currentUserId });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  let router = useNavigate()
  const allTags = useMemo(() => getAllTags(posts), [posts]);

  
  
  const filteredPosts = useMemo(() => 
    filterPosts(posts, searchTerm, selectedTags),
    [posts, searchTerm, selectedTags]
  );

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
  };

  return(
    <main className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-600 to-purple-700  py-8">
      <div className="flex flex-col gap-4 items-center">
        <div className="max-w-6xl px-4 sm:px-6 lg:px-8 py-4 md:w-4/5">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>

            <div className="flex items-center space-x-4 ml-8">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  showFilters || selectedTags.length > 0
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-purple-500'
                }`}
              >
                <Filter className="h-5 w-5 text-white" />
              </button>
              
              <button onClick={() => router('/add-post')} className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Publicar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className=" space-y-6">
              {/* Stats Card */}
              <ProfileCard />

              {/* Filters */}
              {showFilters && (
                <FilterTag
                  allTags={allTags}
                  selectedTags={selectedTags}
                  onTagToggle={handleTagToggle}
                  onClearFilters={handleClearFilters}
                />
              )}

              {/* Trending Tags */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl border-white/20 p-6">
                <h3 className="font-semibold text-white mb-4">Etiquetas populares</h3>
                <div className="space-y-2">
                  {allTags.slice(0, 6).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-800'
                          : 'text-white hover:bg-purple-500'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Posts Feed */}
          <div className="lg:col-span-3">
            {/* Search Results Info */}
            {(searchTerm || selectedTags.length > 0) && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  {filteredPosts.length === 0 ? (
                    'No se encontraron publicaciones que coincidan con tu búsqueda.'
                  ) : (
                    `Mostrando ${filteredPosts.length} de ${posts.length} publicaciones`
                  )}
                  {searchTerm && (
                    <span> para "{searchTerm}"</span>
                  )}
                  {selectedTags.length > 0 && (
                    <span> con etiquetas: {selectedTags.join(', ')}</span>
                  )}
                </p>
              </div>
            )}

            {/* Posts */}
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-16">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <p className="text-white/80 font-medium">Cargando posts...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-red-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Error al cargar</h3>
                  <p className="text-white/70 max-w-sm mx-auto mb-4">{error}</p>
                  <button 
                    onClick={fetchPosts} 
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Reintentar
                  </button>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white/60" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">No hay publicaciones</h3>
                  <p className="text-white/70 max-w-sm mx-auto">
                    {searchTerm || selectedTags.length > 0 
                      ? 'No se encontraron publicaciones que coincidan con tus filtros de búsqueda.'
                      : 'Sé el primero en compartir algo increíble con la comunidad.'
                    }
                  </p>
                  {(!searchTerm && selectedTags.length === 0) && (
                    <button 
                      onClick={() => router('/add-post')} 
                      className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                    >
                      Crear primer post
                    </button>
                  )}
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUserId}
                    onReaction={handleReaction}
                    onCommentReaction={handleCommentReaction}
                    onNewComment={handleNewComment}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
    </main>
  )
}