import { reactive, computed } from 'vue';

const state = reactive({
  items: [],
  isCartOpen: false
});

export const useCart = () => {
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }
    
    const existingItem = state.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      state.items.push({
        ...product,
        quantity
      });
    }
    
    // Show cart notification or open cart
    state.isCartOpen = true;
    
    // Save cart to localStorage
    saveCart();
  };
  
  const removeFromCart = (productId) => {
    if (!productId) return;
    
    const index = state.items.findIndex(item => item.id === productId);
    if (index !== -1) {
      state.items.splice(index, 1);
      saveCart();
    }
  };
  
  const updateQuantity = (productId, quantity) => {
    if (!productId) return;
    
    const item = state.items.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(productId);
      } else {
        saveCart();
      }
    }
  };
  
  const clearCart = () => {
    state.items = [];
    saveCart();
  };
  
  const toggleCart = () => {
    state.isCartOpen = !state.isCartOpen;
  };
  
  const closeCart = () => {
    state.isCartOpen = false;
  };
  
  const openCart = () => {
    state.isCartOpen = true;
  };
  
  const saveCart = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  };
  
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          state.items = parsedCart;
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  };
  
  // Computed properties for cart calculations
  const cartCount = computed(() => {
    return state.items.reduce((total, item) => {
      return total + (parseInt(item.quantity) || 0);
    }, 0);
  });
  
  const cartTotal = computed(() => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.discountPrice) || parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  });
  
  const cartSubtotal = computed(() => {
    return cartTotal.value;
  });
  
  const cartTax = computed(() => {
    return cartSubtotal.value * 0.1; // Assuming 10% tax
  });
  
  const cartShipping = computed(() => {
    return cartSubtotal.value > 0 ? (cartSubtotal.value > 1000 ? 0 : 15) : 0;
  });
  
  const cartGrandTotal = computed(() => {
    return cartSubtotal.value + cartTax.value + cartShipping.value;
  });
  
  return {
    // State
    items: computed(() => state.items),
    isCartOpen: computed(() => state.isCartOpen),
    
    // Methods
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    openCart,
    loadCart,
    
    // Computed
    cartCount,
    cartTotal,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartGrandTotal
  };
};
