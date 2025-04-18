import { reactive, computed } from 'vue';

const state = reactive({
  items: [],
});

export const useFavorites = () => {
  const addToFavorites = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }
    
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (!existingItem) {
      state.items.push({
        ...product
      });
      
      saveFavorites();
    }
  };
  
  const removeFromFavorites = (productId) => {
    if (!productId) return;
    
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveFavorites();
    }
  };
  
  const toggleFavorite = (product) => {
    if (!product || !product.id) return;
    
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  // Check if product is in favorites
  const isInFavorites = (productId) => {
    if (!productId) return false;
    return state.items.some(item => item.id === productId);
  };
  
  const saveFavorites = () => {
    try {
      localStorage.setItem('favorites', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  };
  
  const loadFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites)) {
          state.items = parsedFavorites;
        }
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
  };
  
  const favoritesCount = computed(() => {
    return state.items.length;
  });
  
  return {
    items: computed(() => state.items),
    
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isInFavorites,
    loadFavorites,
    
    favoritesCount
  };
};
