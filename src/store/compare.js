import { reactive, computed } from 'vue';

const state = reactive({
  items: [],
  isCompareOpen: false,
  maxCompareItems: 4,
});

export const useCompare = () => {
  const addToCompare = (product) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }
    
    const existingItem = state.items.find(item => item.id === product.id);
    if (existingItem) return;
    
    if (state.items.length >= state.maxCompareItems) {
      console.warn(`Cannot add more than ${state.maxCompareItems} items to comparison`);
      return;
    }
    
    state.items.push({
      ...product
    });
    
    saveCompare();
  };
  
  const removeFromCompare = (productId) => {
    if (!productId) return;
    
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveCompare();
    }
  };
  
  const toggleCompare = (product) => {
    if (!product || !product.id) return;
    
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };
  
  const isInCompare = (productId) => {
    if (!productId) return false;
    return state.items.some(item => item.id === productId);
  };
  
  const clearCompare = () => {
    state.items = [];
    saveCompare();
  };
  
  const toggleCompareDrawer = () => {
    state.isCompareOpen = !state.isCompareOpen;
  };
  
  const openCompareDrawer = () => {
    state.isCompareOpen = true;
  };
  
  const closeCompareDrawer = () => {
    state.isCompareOpen = false;
  };
  
  const saveCompare = () => {
    try {
      localStorage.setItem('compare', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save comparison to localStorage:', error);
    }
  };
  
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
  
  const compareCount = computed(() => {
    return state.items.length;
  });
  
  const canAddMore = computed(() => {
    return state.items.length < state.maxCompareItems;
  });
  
  return {
    items: computed(() => state.items),
    isCompareOpen: computed(() => state.isCompareOpen),
    maxCompareItems: state.maxCompareItems,
    
    addToCompare,
    removeFromCompare,
    toggleCompare,
    isInCompare,
    clearCompare,
    toggleCompareDrawer,
    openCompareDrawer,
    closeCompareDrawer,
    loadCompare,
    
    compareCount,
    canAddMore
  };
};
