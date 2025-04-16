<script setup>
import { computed } from 'vue';
import { useCart } from '../store/cart';
import { useFavorites } from '../store/favorites';
import { useCompare } from '../store/compare';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const cart = useCart();
const favorites = useFavorites();
const compare = useCompare();

const isDiscounted = computed(() => {
  return props.product.discountPrice && props.product.price && props.product.discountPrice < props.product.price;
});

const discountPercentage = computed(() => {
  if (!isDiscounted.value) return 0;
  return Math.round(((props.product.price - props.product.discountPrice) / props.product.price) * 100);
});

const isFavorite = computed(() => {
  return favorites.isInFavorites(props.product.id);
});

const isInCompare = computed(() => {
  return compare.isInCompare(props.product.id);
});

const canAddToCompare = computed(() => {
  return compare.canAddMore || isInCompare.value;
});

const toggleFavorite = () => {
  favorites.toggleFavorite(props.product);
};

const toggleCompare = () => {
  compare.toggleCompare(props.product);
};

const addToCart = () => {
  cart.addToCart(props.product);
};

const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '$0.00';
  }
  return `$${Number(price).toFixed(2)}`;
};
</script>

<template>
  <div class="product-card">
    <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
    
    <div class="product-actions">
      <button 
        class="action-btn favorite-btn" 
        :class="{ 'active': isFavorite }"
        @click="toggleFavorite"
        :title="isFavorite ? 'Remove from favorites' : 'Add to favorites'"
      >
        <span class="icon-heart"></span>
      </button>
      
      <button 
        class="action-btn compare-btn" 
        :class="{ 'active': isInCompare, 'disabled': !canAddToCompare && !isInCompare }"
        @click="toggleCompare"
        :disabled="!canAddToCompare && !isInCompare"
        :title="isInCompare ? 'Remove from comparison' : 'Add to comparison'"
      >
        <span class="icon-balance-scale"></span>
      </button>
    </div>
    
    <div class="product-image">
      <img :src="product.image" :alt="product.name">
    </div>
    
    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>
      <h3 class="product-name">{{ product.name }}</h3>
      
      <div class="product-rating">
        <div class="stars">
          <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= Math.floor(product.rating) }">★</span>
        </div>
        <span class="rating-count">{{ product.rating }}</span>
      </div>
      
      <div class="product-price">
        <span class="current-price">{{ formatPrice(product.discountPrice || product.price) }}</span>
        <span class="original-price" v-if="isDiscounted">{{ formatPrice(product.price) }}</span>
        <span class="discount-badge" v-if="isDiscounted">-{{ discountPercentage }}%</span>
      </div>
      
      <div class="product-specs">
        <div class="spec-item" v-if="product.specs?.processor">
          <span class="spec-label">CPU:</span>
          <span class="spec-value">{{ product.specs.processor }}</span>
        </div>
        <div class="spec-item" v-if="product.specs?.ram">
          <span class="spec-label">RAM:</span>
          <span class="spec-value">{{ product.specs.ram }}</span>
        </div>
        <div class="spec-item" v-if="product.specs?.storage">
          <span class="spec-label">Storage:</span>
          <span class="spec-value">{{ product.specs.storage }}</span>
        </div>
      </div>
      
      <button class="btn-add-to-cart" @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.product-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--accent-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  z-index: 1;
}

.product-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1;
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
  transition: all 0.2s;
}

.action-btn:hover {
  transform: scale(1.1);
}

.action-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.action-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.favorite-btn.active {
  background-color: var(--accent-color);
}

.product-image {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-category {
  font-size: 0.8rem;
  color: var(--gray-color);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stars {
  display: flex;
  margin-right: 0.5rem;
}

.star {
  color: #d1d1d1;
  font-size: 1rem;
}

.star.filled {
  color: var(--warning-color);
}

.rating-count {
  font-size: 0.9rem;
  color: var(--gray-color);
}

.product-price {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-right: 0.5rem;
}

.original-price {
  font-size: 0.9rem;
  color: var(--gray-color);
  text-decoration: line-through;
  margin-right: 0.5rem;
}

.discount-badge {
  background-color: var(--success-color);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.product-specs {
  margin-bottom: 1rem;
  flex: 1;
}

.spec-item {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
  display: flex;
}

.spec-label {
  font-weight: 600;
  margin-right: 0.25rem;
  min-width: 60px;
}

.spec-value {
  color: var(--gray-color);
}

.btn-add-to-cart {
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.btn-add-to-cart:hover {
  background-color: #2a75ee;
}

/* Icons */
.icon-heart::before {
  content: '❤️';
}

.icon-balance-scale::before {
  content: '⚖️';
}
</style>
