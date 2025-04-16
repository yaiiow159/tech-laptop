<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCart } from '../store/cart';

const cart = useCart();

onMounted(() => {
  cart.loadCart();
});

// Define products with all required properties including specs
const products = ref([
  {
    id: 1,
    name: "ProBook X1",
    category: "Business",
    price: 1299,
    discountPrice: 1099,
    rating: 4.8,
    specs: {
      processor: "Intel Core i7",
      ram: "16GB",
      storage: "512GB SSD",
      display: "14-inch FHD"
    },
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "GamerX Pro",
    category: "Gaming",
    price: 1899,
    discountPrice: null,
    rating: 4.9,
    specs: {
      processor: "AMD Ryzen 9",
      ram: "32GB",
      storage: "1TB SSD",
      display: "17.3-inch QHD 144Hz"
    },
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "New"
  },
  {
    id: 3,
    name: "UltraSlim S3",
    category: "Ultrabook",
    price: 999,
    discountPrice: 899,
    rating: 4.7,
    specs: {
      processor: "Intel Core i5",
      ram: "8GB",
      storage: "256GB SSD",
      display: "13.3-inch FHD"
    },
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Sale"
  },
  {
    id: 4,
    name: "Creator Pro",
    category: "Design",
    price: 1599,
    discountPrice: null,
    rating: 4.6,
    specs: {
      processor: "Intel Core i7",
      ram: "16GB",
      storage: "1TB SSD",
      display: "15.6-inch 4K"
    },
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: null
  },
  {
    id: 5,
    name: "EssentialBook",
    category: "Budget",
    price: 699,
    discountPrice: 649,
    rating: 4.3,
    specs: {
      processor: "Intel Core i3",
      ram: "8GB",
      storage: "256GB SSD",
      display: "14-inch HD"
    },
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Value"
  },
  {
    id: 6,
    name: "WorkStation Pro",
    category: "Workstation",
    price: 2499,
    discountPrice: null,
    rating: 4.9,
    specs: {
      processor: "Intel Xeon",
      ram: "64GB",
      storage: "2TB SSD",
      display: "17-inch 4K"
    },
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Pro"
  },
  {
    id: 7,
    name: "StudentBook",
    category: "Education",
    price: 799,
    discountPrice: 749,
    rating: 4.5,
    specs: {
      processor: "AMD Ryzen 5",
      ram: "8GB",
      storage: "512GB SSD",
      display: "14-inch FHD"
    },
    image: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: null
  },
  {
    id: 8,
    name: "ConvertibleX",
    category: "2-in-1",
    price: 1199,
    discountPrice: 1099,
    rating: 4.7,
    specs: {
      processor: "Intel Core i5",
      ram: "16GB",
      storage: "512GB SSD",
      display: "13.3-inch FHD Touch"
    },
    image: "https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Versatile"
  }
]);

const categories = ref([
  { id: 'all', name: 'All' },
  { id: 'business', name: 'Business' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'ultrabook', name: 'Ultrabook' },
  { id: 'design', name: 'Design' },
  { id: 'budget', name: 'Budget' },
  { id: 'education', name: 'Education' },
  { id: 'workstation', name: 'Workstation' },
  { id: '2-in-1', name: '2-in-1' }
]);

const sortOptions = ref([
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Top Rated' },
  { id: 'newest', name: 'Newest' }
]);

const selectedCategory = ref('all');
const selectedSort = ref('featured');
const searchQuery = ref('');

const filteredProducts = computed(() => {
  let result = [...products.value];
  
  if (selectedCategory.value !== 'all') {
    result = result.filter(product => 
      product.category.toLowerCase() === selectedCategory.value.toLowerCase()
    );
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query)
    );
  }

  switch (selectedSort.value) {
    case 'price-low':
      result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
      break;
    case 'price-high':
      result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => b.id - a.id);
      break;
    default:
      // 'featured' - no specific sorting
      break;
  }
  
  return result;
});

const setCategory = (categoryId) => {
  selectedCategory.value = categoryId;
};

const setSort = (sortId) => {
  selectedSort.value = sortId;
};

const addToCart = (product) => {
  cart.addToCart(product);
  
  // Show notification
  const notification = document.createElement('div');
  notification.className = 'add-to-cart-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">✓</div>
      <div class="notification-text">
        <strong>${product.name}</strong> added to cart!
      </div>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};
</script>

<template>
  <section class="section products-section" id="products">
    <div class="container">
      <h2 class="section-title">Our Products</h2>
      
      <div class="products-filters">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search products..." 
            class="search-input"
          >
          <i class="icon-search"></i>
        </div>
        
        <div class="filter-group">
          <div class="categories">
            <button 
              v-for="category in categories" 
              :key="category.id"
              class="category-btn"
              :class="{ active: selectedCategory === category.id }"
              @click="setCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
          
          <div class="sort-dropdown">
            <label for="sort">Sort by:</label>
            <select id="sort" v-model="selectedSort" @change="setSort(selectedSort)">
              <option 
                v-for="option in sortOptions" 
                :key="option.id" 
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card"
        >
          <div class="product-badge" v-if="product.badge">{{ product.badge }}</div>
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
            <div class="product-actions">
              <button class="product-action-btn" @click="addToCart(product)">
                <i class="icon-cart-add"></i>
                <span>Add to Cart</span>
              </button>
              <button class="product-action-btn wishlist">
                <i class="icon-heart"></i>
              </button>
              <button class="product-action-btn compare">
                <i class="icon-compare"></i>
              </button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-category">{{ product.category }}</div>
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-specs">
              <div class="spec"><strong>CPU:</strong> {{ product.specs.processor }}</div>
              <div class="spec"><strong>RAM:</strong> {{ product.specs.ram }}</div>
              <div class="spec"><strong>Storage:</strong> {{ product.specs.storage }}</div>
              <div class="spec"><strong>Display:</strong> {{ product.specs.display }}</div>
            </div>
            <div class="product-rating">
              <div class="stars">
                <i class="icon-star" v-for="n in 5" :key="n" :class="{ 'filled': n <= Math.floor(product.rating) }"></i>
              </div>
              <span class="rating-value">{{ product.rating }}</span>
            </div>
            <div class="product-price">
              <span class="current-price" :class="{ 'discounted': product.discountPrice }">
                ${{ product.discountPrice || product.price }}
              </span>
              <span class="original-price" v-if="product.discountPrice">${{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="pagination" v-if="filteredProducts.length > 0">
        <button class="pagination-btn prev" disabled>
          <i class="icon-arrow-left"></i>
        </button>
        <div class="page-numbers">
          <button class="page-number active">1</button>
          <button class="page-number">2</button>
          <button class="page-number">3</button>
        </div>
        <button class="pagination-btn next">
          <i class="icon-arrow-right"></i>
        </button>
      </div>
      
      <div class="no-results" v-if="filteredProducts.length === 0">
        <div class="no-results-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try changing your search criteria or browse all products.</p>
        <button class="btn btn-primary" @click="selectedCategory = 'all'; searchQuery = ''">
          View All Products
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section {
  background-color: white;
}

.products-filters {
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.2);
}

.icon-search {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-color);
}

.filter-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-btn {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  background-color: white;
  color: var(--dark-color);
  cursor: pointer;
  transition: all var(--transition-speed);
}

.category-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.category-btn:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.05);
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-dropdown label {
  color: var(--gray-color);
}

.sort-dropdown select {
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  background-color: white;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.product-card {
  background-color: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-speed), box-shadow var(--transition-speed);
  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.product-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background-color: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-actions {
  position: absolute;
  bottom: -60px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  transition: bottom var(--transition-speed);
}

.product-card:hover .product-actions {
  bottom: 0;
}

.product-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color var(--transition-speed);
  margin: 0 0.25rem;
}

.product-action-btn:hover {
  background-color: #2a75ee;
}

.product-action-btn.wishlist,
.product-action-btn.compare {
  padding: 0.5rem;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  color: var(--dark-color);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.product-action-btn.wishlist:hover,
.product-action-btn.compare:hover {
  background-color: var(--primary-color);
  color: white;
}

.product-info {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  font-size: 0.85rem;
  color: var(--gray-color);
  margin-bottom: 0.5rem;
}

.product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
}

.product-specs {
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--gray-color);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  margin-top: auto;
}

.stars {
  display: flex;
  margin-right: 0.5rem;
}

.icon-star {
  color: #d4d4d4;
  font-size: 0.85rem;
}

.icon-star.filled {
  color: #ffc107;
}

.rating-value {
  font-size: 0.85rem;
  color: var(--gray-color);
}

.product-price {
  display: flex;
  align-items: center;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dark-color);
}

.current-price.discounted {
  color: var(--accent-color);
}

.original-price {
  font-size: 1rem;
  color: var(--gray-color);
  text-decoration: line-through;
  margin-left: 0.75rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.pagination-btn {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: var(--dark-color);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.pagination-btn.prev {
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

.pagination-btn.next {
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  background-color: white;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.page-number.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: var(--gray-color);
  margin-bottom: 1.5rem;
}

/* Add to cart notification */
.add-to-cart-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 1000;
  transform: translateX(120%);
  transition: transform 0.3s ease;
  max-width: 300px;
}

.add-to-cart-notification.show {
  transform: translateX(0);
}

.notification-content {
  display: flex;
  align-items: center;
}

.notification-icon {
  width: 30px;
  height: 30px;
  background-color: var(--success-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.notification-text {
  flex: 1;
}

/* Icons */
.icon-search::before {
  content: '🔍';
}

.icon-cart-add::before {
  content: '🛒';
  margin-right: 0.5rem;
}

.icon-heart::before {
  content: '❤️';
}

.icon-compare::before {
  content: '⚖️';
}

.icon-star::before {
  content: '★';
}

.icon-arrow-left::before {
  content: '←';
}

.icon-arrow-right::before {
  content: '→';
}

@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .sort-dropdown {
    width: 100%;
  }
  
  .sort-dropdown select {
    flex-grow: 1;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>
