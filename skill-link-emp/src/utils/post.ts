import type { Post } from '../components/Post/types/post';

export const generateUniqueId = (): string => {
  return Math.random().toString(36).slice(2, 9);
};

export const getAllTags = (posts: Post[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach((tag: string) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const filterPosts = (posts: Post[], searchTerm: string, selectedTags: string[]) => {
  return posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
};