import { reactive, computed } from 'vue';

// Create reactive state for favorites
const state = reactive({
  items: [],
});

export const useFavorites = () => {
  // Add item to favorites
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
      
      // Save favorites to localStorage
      saveFavorites();
    }
  };
  
  // Remove item from favorites
  const removeFromFavorites = (productId) => {
    if (!productId) return;
    
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveFavorites();
    }
  };
  
  // Toggle favorites status
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
  
  // Save favorites to localStorage
  const saveFavorites = () => {
    try {
      localStorage.setItem('favorites', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  };
  
  // Load favorites from localStorage
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
  
  // Computed properties
  const favoritesCount = computed(() => {
    return state.items.length;
  });
  
  return {
    // State
    items: computed(() => state.items),
    
    // Methods
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isInFavorites,
    loadFavorites,
    
    // Computed
    favoritesCount
  };
};
