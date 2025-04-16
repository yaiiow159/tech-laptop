<script setup>
import { ref, computed, onMounted } from 'vue';
import { useFavorites } from '../store/favorites';
import { useCart } from '../store/cart';
import { useCompare } from '../store/compare';

const favorites = useFavorites();
const cart = useCart();
const compare = useCompare();

// Load favorites on mount
onMounted(() => {
  favorites.loadFavorites();
});

// Computed property for empty state
const hasFavorites = computed(() => favorites.items.length > 0);

// Add to cart function
const addToCart = (product) => {
  cart.addToCart(product);
};

// Remove from favorites function
const removeFromFavorites = (productId) => {
  favorites.removeFromFavorites(productId);
};

// Add to compare function
const addToCompare = (product) => {
  compare.addToCompare(product);
};

// Filter options
const sortOptions = ref([
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating-desc', label: 'Rating (Highest First)' },
  { value: 'date-desc', label: 'Date Added (Newest First)' },
  { value: 'date-asc', label: 'Date Added (Oldest First)' }
]);

const selectedSort = ref('date-desc');

// Sorted favorites
const sortedFavorites = computed(() => {
  const items = [...favorites.items];
  
  switch (selectedSort.value) {
    case 'name-asc':
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return items.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return items.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return items.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return items.sort((a, b) => b.rating - a.rating);
    case 'date-desc':
      return items.sort((a, b) => b.dateAdded - a.dateAdded);
    case 'date-asc':
      return items.sort((a, b) => a.dateAdded - b.dateAdded);
    default:
      return items;
  }
});

// Format price
const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '$0.00';
  }
  return `$${Number(price).toFixed(2)}`;
};

// Calculate discount percentage
const calculateDiscount = (originalPrice, price) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

// Share favorites
const shareFavorites = () => {
  // In a real app, this would generate a shareable link
  alert('Share link generated! In a real app, this would create a shareable link to your favorites list.');
};

// Clear all favorites
const clearAllFavorites = () => {
  if (confirm('Are you sure you want to remove all items from your favorites?')) {
    favorites.clearFavorites();
  }
};
</script>

<template>
  <div class="favorites-page">
    <div class="favorites-hero">
      <div class="container">
        <h1 class="favorites-title">My Favorites</h1>
        <p class="favorites-subtitle">Your personally curated collection of laptops</p>
      </div>
    </div>
    
    <div class="container">
      <!-- Empty state -->
      <div v-if="!hasFavorites" class="empty-favorites">
        <div class="empty-icon">❤️</div>
        <h2>Your Favorites List is Empty</h2>
        <p>Add items to your favorites by clicking the heart icon on any product.</p>
        <a href="#" class="btn btn-primary">Browse Products</a>
      </div>
      
      <!-- Favorites content -->
      <div v-else class="favorites-content">
        <div class="favorites-header">
          <div class="favorites-count">
            {{ favorites.items.length }} {{ favorites.items.length === 1 ? 'item' : 'items' }}
          </div>
          
          <div class="favorites-actions">
            <button class="btn btn-outline" @click="shareFavorites">
              <i class="icon-share"></i> Share List
            </button>
            <button class="btn btn-outline danger" @click="clearAllFavorites">
              <i class="icon-trash"></i> Clear All
            </button>
          </div>
        </div>
        
        <div class="favorites-filters">
          <div class="filter-group">
            <label for="sort">Sort By:</label>
            <select id="sort" v-model="selectedSort" class="filter-select">
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="favorites-grid">
          <div v-for="product in sortedFavorites" :key="product.id" class="favorite-card">
            <div class="favorite-actions">
              <button 
                class="action-btn remove" 
                @click="removeFromFavorites(product.id)"
                title="Remove from favorites"
              >
                <i class="icon-heart-filled"></i>
              </button>
              <button 
                class="action-btn compare" 
                @click="addToCompare(product)"
                title="Add to compare"
              >
                <i class="icon-balance-scale"></i>
              </button>
            </div>
            
            <div class="favorite-image">
              <img :src="product.image" :alt="product.name">
              <div v-if="calculateDiscount(product.originalPrice, product.price) > 0" class="discount-badge">
                -{{ calculateDiscount(product.originalPrice, product.price) }}%
              </div>
            </div>
            
            <div class="favorite-content">
              <h3 class="favorite-title">{{ product.name }}</h3>
              
              <div class="favorite-specs">
                <div class="spec-item">
                  <span class="spec-label">Processor:</span>
                  <span class="spec-value">{{ product.processor }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">RAM:</span>
                  <span class="spec-value">{{ product.ram }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Storage:</span>
                  <span class="spec-value">{{ product.storage }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Display:</span>
                  <span class="spec-value">{{ product.display }}</span>
                </div>
              </div>
              
              <div class="favorite-rating">
                <div class="stars">
                  <i v-for="n in 5" :key="n" :class="n <= product.rating ? 'icon-star-filled' : 'icon-star-empty'"></i>
                </div>
                <span class="rating-count">({{ product.reviewCount }})</span>
              </div>
              
              <div class="favorite-price">
                <div v-if="product.originalPrice && product.originalPrice > product.price" class="original-price">
                  {{ formatPrice(product.originalPrice) }}
                </div>
                <div class="current-price">{{ formatPrice(product.price) }}</div>
              </div>
              
              <div class="favorite-footer">
                <button class="btn btn-primary" @click="addToCart(product)">
                  Add to Cart
                </button>
                <a :href="`#product/${product.id}`" class="btn btn-outline">
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-page {
  padding-bottom: 4rem;
}

.favorites-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 3rem;
}

.favorites-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.favorites-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Empty state */
.empty-favorites {
  text-align: center;
  padding: 4rem 0;
  max-width: 600px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-favorites h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
}

.empty-favorites p {
  color: var(--gray-color);
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Favorites content */
.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.favorites-count {
  font-size: 1.2rem;
  font-weight: 600;
}

.favorites-actions {
  display: flex;
  gap: 1rem;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: white;
}

.btn-outline.danger {
  border-color: var(--error-color);
  color: var(--error-color);
}

.btn-outline.danger:hover {
  background-color: var(--error-color);
  color: white;
}

.favorites-filters {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-group label {
  font-weight: 600;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  background-color: white;
  min-width: 200px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.favorite-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.favorite-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.favorite-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all var(--transition-speed);
}

.action-btn.remove {
  color: var(--accent-color);
}

.action-btn.remove:hover {
  background-color: var(--accent-color);
  color: white;
}

.action-btn.compare:hover {
  background-color: var(--primary-color);
  color: white;
}

.favorite-image {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.favorite-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.favorite-card:hover .favorite-image img {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--accent-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 0.8rem;
}

.favorite-content {
  padding: 1.5rem;
}

.favorite-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--dark-color);
  height: 2.8em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.favorite-specs {
  margin-bottom: 1rem;
}

.spec-item {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.spec-label {
  font-weight: 600;
  color: var(--dark-color);
}

.spec-value {
  color: var(--gray-color);
}

.favorite-rating {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.stars {
  color: var(--warning-color);
  margin-right: 0.5rem;
}

.rating-count {
  color: var(--gray-color);
  font-size: 0.9rem;
}

.favorite-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.original-price {
  color: var(--gray-color);
  text-decoration: line-through;
  font-size: 0.9rem;
}

.current-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--primary-color);
}

.favorite-footer {
  display: flex;
  gap: 0.5rem;
}

.favorite-footer .btn {
  flex: 1;
  font-size: 0.9rem;
  padding: 0.6rem 0;
  text-align: center;
}

/* Icons */
.icon-heart-filled::before {
  content: '♥';
}

.icon-balance-scale::before {
  content: '⚖';
}

.icon-share::before {
  content: '↗';
}

.icon-trash::before {
  content: '🗑';
}

.icon-star-filled::before {
  content: '★';
}

.icon-star-empty::before {
  content: '☆';
}

@media (max-width: 992px) {
  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .favorites-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .favorites-actions {
    width: 100%;
  }
  
  .favorites-actions .btn {
    flex: 1;
  }
  
  .favorites-grid {
    grid-template-columns: 1fr;
  }
  
  .favorites-hero {
    padding: 3rem 0;
  }
  
  .favorites-title {
    font-size: 2rem;
  }
}
</style>
