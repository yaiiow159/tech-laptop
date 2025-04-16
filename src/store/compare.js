import { reactive, computed } from 'vue';

// Create reactive state for comparison
const state = reactive({
  items: [],
  isCompareOpen: false,
  maxCompareItems: 4, // Maximum number of items that can be compared
});

export const useCompare = () => {
  // Add item to comparison
  const addToCompare = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }
    
    // Check if we already have this product
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) return;
    
    // Check if we've reached the maximum number of items
    if (state.items.length >= state.maxCompareItems) {
      console.warn(`Cannot add more than ${state.maxCompareItems} items to comparison`);
      return;
    }
    
    state.items.push({
      ...product
    });
    
    // Save comparison to localStorage
    saveCompare();
  };
  
  // Remove item from comparison
  const removeFromCompare = (productId) => {
    if (!productId) return;
    
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveCompare();
    }
  };
  
  // Toggle comparison status
  const toggleCompare = (product) => {
    if (!product || !product.id) return;
    
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };
  
  // Check if product is in comparison
  const isInCompare = (productId) => {
    if (!productId) return false;
    return state.items.some(item => item.id === productId);
  };
  
  // Clear all comparison items
  const clearCompare = () => {
    state.items = [];
    saveCompare();
  };
  
  // Toggle comparison drawer visibility
  const toggleCompareDrawer = () => {
    state.isCompareOpen = !state.isCompareOpen;
  };
  
  // Open comparison drawer
  const openCompareDrawer = () => {
    state.isCompareOpen = true;
  };
  
  // Close comparison drawer
  const closeCompareDrawer = () => {
    state.isCompareOpen = false;
  };
  
  // Save comparison to localStorage
  const saveCompare = () => {
    try {
      localStorage.setItem('compare', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save comparison to localStorage:', error);
    }
  };
  
  // Load comparison from localStorage
  const loadCompare = () => {
    try {
      const savedCompare = localStorage.getItem('compare');
      if (savedCompare) {
        const parsedCompare = JSON.parse(savedCompare);
        if (Array.isArray(parsedCompare)) {
          // Ensure we don't exceed the maximum number of items
          state.items = parsedCompare.slice(0, state.maxCompareItems);
        }
      }
    } catch (error) {
      console.error('Failed to load comparison from localStorage:', error);
    }
  };
  
  // Computed properties
  const compareCount = computed(() => {
    return state.items.length;
  });
  
  const canAddMore = computed(() => {
    return state.items.length < state.maxCompareItems;
  });
  
  return {
    // State
    items: computed(() => state.items),
    isCompareOpen: computed(() => state.isCompareOpen),
    maxCompareItems: state.maxCompareItems,
    
    // Methods
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare,
    toggleCompareDrawer,
    openCompareDrawer,
    closeCompareDrawer,
    loadCompare,
    
    // Computed
    compareCount,
    canAddMore
  };
};
