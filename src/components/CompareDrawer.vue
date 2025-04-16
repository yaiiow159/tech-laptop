<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useCompare } from '../store/compare';

const compare = useCompare();
const isClosing = ref(false);

const validCompareItems = computed(() => {
  if (!compare.items.value || !Array.isArray(compare.items.value)) {
    return [];
  }
  return compare.items.value.filter(item => item && typeof item === 'object' && item.id);
});

const closeCompare = () => {
  isClosing.value = true;
  setTimeout(() => {
    compare.closeCompareDrawer();
    isClosing.value = false;
  }, 10);
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && compare.isCompareOpen.value) {
    closeCompare();
  }
};

onMounted(() => {
  compare.loadCompare();
  document.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
});

watch(() => window.location.hash, () => {
  if (compare.isCompareOpen.value) {
    closeCompare();
  }
});

const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '$0.00';
  }
  return `$${Number(price).toFixed(2)}`;
};

const allSpecs = computed(() => {
  const specs = new Set();
  validCompareItems.value.forEach(item => {
    if (item.specs && typeof item.specs === 'object') {
      Object.keys(item.specs).forEach(key => specs.add(key));
    }
  });
  return Array.from(specs);
});
</script>

<template>
  <div
    v-if="compare.isCompareOpen.value" 
    class="compare-drawer-overlay" 
    @click="closeCompare"
    @touchstart="closeCompare"
  ></div>
  
  <div
    class="compare-drawer" 
    :class="{ 
      'open': compare.isCompareOpen.value, 
      'closing': isClosing 
    }"
  >
    <div class="compare-header">
      <h3 class="compare-title">Compare Products ({{ compare.compareCount }})</h3>
      <button 
        class="compare-close" 
        @click="closeCompare"
        aria-label="Close comparison"
      >×</button>
    </div>
    
    <template v-if="validCompareItems.length === 0">
      <div class="compare-empty">
        <div class="compare-empty-icon">⚖️</div>
        <p>No products added to compare</p>
        <button class="btn btn-primary" @click="closeCompare">Browse Products</button>
      </div>
    </template>
    
    <template v-else>
      <div class="compare-content">
        <div class="compare-actions">
          <button class="btn btn-outline" @click="compare.clearCompare">Clear All</button>
        </div>
        
        <div class="compare-table-container">
          <table class="compare-table">
            <thead>
              <tr>
                <th class="feature-name">Feature</th>
                <th v-for="(item, index) in validCompareItems" :key="`header-${item.id || index}`">
                  <div class="product-header">
                    <button 
                      class="remove-product" 
                      @click="compare.removeFromCompare(item.id)"
                      aria-label="Remove from comparison"
                    >×</button>
                    <div class="product-image">
                      <img :src="item.image || ''" :alt="item.name || 'Product'">
                    </div>
                    <h4 class="product-name">{{ item.name || 'Product' }}</h4>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Price row -->
              <tr>
                <td class="feature-name">Price</td>
                <td v-for="(item, index) in validCompareItems" :key="`price-${item.id || index}`">
                  <div class="feature-value price">
                    <span class="current-price">{{ formatPrice(item.discountPrice || item.price) }}</span>
                    <span class="original-price" v-if="item.discountPrice && item.price && item.discountPrice < item.price">
                      {{ formatPrice(item.price) }}
                    </span>
                  </div>
                </td>
              </tr>
              
              <!-- Category row -->
              <tr>
                <td class="feature-name">Category</td>
                <td v-for="(item, index) in validCompareItems" :key="`category-${item.id || index}`">
                  <div class="feature-value">{{ item.category || 'N/A' }}</div>
                </td>
              </tr>
              
              <tr>
                <td class="feature-name">Rating</td>
                <td v-for="(item, index) in validCompareItems" :key="`rating-${item.id || index}`">
                  <div class="feature-value">
                    <div class="rating">
                      <span class="stars">
                        {{ '★'.repeat(Math.floor(item.rating || 0)) }}
                        {{ '☆'.repeat(5 - Math.floor(item.rating || 0)) }}
                      </span>
                      <span class="rating-value">{{ item.rating || 'N/A' }}/5</span>
                    </div>
                  </div>
                </td>
              </tr>
              
              <tr v-for="spec in allSpecs" :key="`spec-${spec}`">
                <td class="feature-name">{{ spec }}</td>
                <td v-for="(item, index) in validCompareItems" :key="`spec-${item.id || index}-${spec}`">
                  <div class="feature-value">
                    {{ item.specs && item.specs[spec] ? item.specs[spec] : 'N/A' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="compare-footer">
          <button class="btn btn-outline btn-block" @click="closeCompare">
            Continue Shopping
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.compare-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s;
  cursor: pointer;
}

.compare-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
}

.compare-drawer.open {
  transform: translateY(0);
}

.compare-drawer.closing {
  transform: translateY(100%);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.compare-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.compare-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.compare-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-color);
  transition: color var(--transition-speed);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.compare-close:hover {
  color: var(--dark-color);
  background-color: rgba(0, 0, 0, 0.05);
}

.compare-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.compare-empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.compare-empty p {
  margin-bottom: 1.5rem;
  color: var(--gray-color);
}

.compare-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.compare-actions {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}

.compare-table-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: auto;
  padding: 0 1rem;
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
}

.compare-table th,
.compare-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.feature-name {
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.02);
  position: sticky;
  left: 0;
  min-width: 150px;
}

.product-header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
}

.remove-product {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--gray-color);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
}

.remove-product:hover {
  color: var(--error-color);
  background-color: rgba(0, 0, 0, 0.05);
}

.product-image {
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.feature-value {
  text-align: center;
}

.feature-value.price {
  font-weight: 600;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.original-price {
  text-decoration: line-through;
  color: var(--gray-color);
  font-size: 0.85rem;
  font-weight: normal;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stars {
  color: var(--warning-color);
  letter-spacing: 2px;
}

.rating-value {
  font-size: 0.85rem;
  color: var(--gray-color);
  margin-top: 0.25rem;
}

.compare-footer {
  padding: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.btn-block {
  display: block;
  width: 100%;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-speed);
  border: none;
  outline: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #2a75ee;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background-color: rgba(58, 134, 255, 0.1);
}

@media (max-width: 768px) {
  .compare-table th,
  .compare-table td {
    padding: 0.75rem;
  }
  
  .product-image {
    width: 60px;
    height: 60px;
  }
  
  .product-name {
    font-size: 0.9rem;
  }
}
</style>
