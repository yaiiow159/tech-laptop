<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCart } from '../store/cart';
import { useFavorites } from '../store/favorites';
import { useCompare } from '../store/compare';
import ProductCard from './ProductCard.vue';

const cart = useCart();
const favorites = useFavorites();
const compare = useCompare();

// Initialize stores
onMounted(() => {
  cart.loadCart();
  favorites.loadFavorites();
  compare.loadCompare();
});

// Active filter category
const activeCategory = ref('all');

// Deal categories
const categories = [
  { id: 'all', name: 'All Deals' },
  { id: 'clearance', name: 'Clearance' },
  { id: 'daily', name: 'Daily Deals' },
  { id: 'bundle', name: 'Bundle Offers' },
  { id: 'refurbished', name: 'Refurbished' }
];

// Deals data
const allDeals = ref([
  {
    id: 101,
    name: "UltraBook Pro X7",
    category: "Business",
    price: 1699,
    discountPrice: 1299,
    rating: 4.8,
    specs: {
      processor: "Intel Core i7-11800H",
      ram: "32GB DDR4",
      storage: "1TB SSD",
      display: "15.6-inch 4K OLED"
    },
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Clearance",
    dealType: "clearance",
    discountPercentage: 24,
    endDate: "2025-05-01"
  },
  {
    id: 102,
    name: "GamingX Elite",
    category: "Gaming",
    price: 2499,
    discountPrice: 1999,
    rating: 4.9,
    specs: {
      processor: "AMD Ryzen 9 5900HX",
      ram: "64GB DDR4",
      storage: "2TB SSD",
      display: "17.3-inch QHD 240Hz"
    },
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Daily Deal",
    dealType: "daily",
    discountPercentage: 20,
    endDate: "2025-04-20"
  },
  {
    id: 103,
    name: "Creator Studio Bundle",
    category: "Design",
    price: 3299,
    discountPrice: 2799,
    rating: 4.7,
    specs: {
      processor: "Intel Core i9-12900K",
      ram: "64GB DDR5",
      storage: "4TB SSD",
      display: "32-inch 6K Retina"
    },
    image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Bundle",
    dealType: "bundle",
    discountPercentage: 15,
    endDate: "2025-05-15",
    bundleItems: ["Laptop", "External Monitor", "Graphics Tablet", "Software Suite"]
  },
  {
    id: 104,
    name: "Refurbished MacBook Pro",
    category: "Apple",
    price: 2199,
    discountPrice: 1599,
    rating: 4.5,
    specs: {
      processor: "Apple M1 Pro",
      ram: "16GB Unified",
      storage: "512GB SSD",
      display: "14-inch Liquid Retina XDR"
    },
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Refurbished",
    dealType: "refurbished",
    discountPercentage: 27,
    endDate: "2025-05-30",
    condition: "Like New"
  },
  {
    id: 105,
    name: "Student Chromebook",
    category: "Education",
    price: 599,
    discountPrice: 399,
    rating: 4.3,
    specs: {
      processor: "Intel Celeron N4020",
      ram: "8GB LPDDR4",
      storage: "128GB eMMC",
      display: "14-inch FHD"
    },
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Student Deal",
    dealType: "daily",
    discountPercentage: 33,
    endDate: "2025-06-15"
  },
  {
    id: 106,
    name: "Business Laptop + Dock Bundle",
    category: "Business",
    price: 1899,
    discountPrice: 1599,
    rating: 4.6,
    specs: {
      processor: "Intel Core i7-1165G7",
      ram: "16GB DDR4",
      storage: "512GB SSD",
      display: "15.6-inch FHD"
    },
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Bundle",
    dealType: "bundle",
    discountPercentage: 16,
    endDate: "2025-05-10",
    bundleItems: ["Laptop", "Docking Station", "Wireless Keyboard & Mouse", "Carrying Case"]
  },
  {
    id: 107,
    name: "Refurbished Gaming Laptop",
    category: "Gaming",
    price: 1899,
    discountPrice: 1299,
    rating: 4.4,
    specs: {
      processor: "Intel Core i7-10750H",
      ram: "16GB DDR4",
      storage: "1TB SSD",
      display: "15.6-inch FHD 144Hz"
    },
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Refurbished",
    dealType: "refurbished",
    discountPercentage: 32,
    endDate: "2025-05-20",
    condition: "Excellent"
  },
  {
    id: 108,
    name: "Clearance Ultrabook",
    category: "Ultrabook",
    price: 1299,
    discountPrice: 899,
    rating: 4.5,
    specs: {
      processor: "Intel Core i5-1135G7",
      ram: "8GB LPDDR4X",
      storage: "512GB SSD",
      display: "13.3-inch FHD"
    },
    image: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: "Clearance",
    dealType: "clearance",
    discountPercentage: 31,
    endDate: "2025-04-25"
  }
]);

// Filtered deals based on active category
const filteredDeals = computed(() => {
  if (activeCategory.value === 'all') {
    return allDeals.value;
  }
  return allDeals.value.filter(deal => deal.dealType === activeCategory.value);
});

// Set active category
const setCategory = (categoryId) => {
  activeCategory.value = categoryId;
};

// Format date for countdown
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Calculate days remaining for deal
const getDaysRemaining = (endDateString) => {
  const endDate = new Date(endDateString);
  const today = new Date();
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};
</script>

<template>
  <div class="deals-page">
    <div class="deals-hero">
      <div class="container">
        <h1 class="deals-title">Special Deals & Offers</h1>
        <p class="deals-subtitle">Discover amazing discounts on top laptops</p>
      </div>
    </div>
    
    <div class="container">
      <div class="deals-filter">
        <button 
          v-for="category in categories" 
          :key="category.id"
          class="filter-btn"
          :class="{ 'active': activeCategory === category.id }"
          @click="setCategory(category.id)"
        >
          {{ category.name }}
        </button>
      </div>
      
      <div class="deals-grid">
        <div v-for="deal in filteredDeals" :key="deal.id" class="deal-item">
          <div class="deal-card">
            <div class="deal-badge" :class="deal.dealType">
              <span class="badge-text">{{ deal.badge }}</span>
              <span class="discount-percentage">-{{ deal.discountPercentage }}%</span>
            </div>
            
            <div class="deal-countdown" v-if="getDaysRemaining(deal.endDate) > 0">
              <div class="countdown-icon">⏱️</div>
              <div class="countdown-text">
                <span class="days-remaining">{{ getDaysRemaining(deal.endDate) }} days left</span>
                <span class="end-date">Ends {{ formatDate(deal.endDate) }}</span>
              </div>
            </div>
            
            <div v-if="deal.bundleItems" class="bundle-items">
              <h4>Bundle Includes:</h4>
              <ul>
                <li v-for="(item, index) in deal.bundleItems" :key="index">{{ item }}</li>
              </ul>
            </div>
            
            <div v-if="deal.condition" class="refurbished-info">
              <h4>Condition: {{ deal.condition }}</h4>
              <p>Fully tested and certified by our technicians</p>
            </div>
            
            <ProductCard :product="deal" />
          </div>
        </div>
      </div>
      
      <div class="promo-section">
        <div class="promo-card">
          <div class="promo-content">
            <h2>Get 10% Off Your First Order</h2>
            <p>Use promo code <strong>WELCOME10</strong> at checkout</p>
            <button class="btn btn-primary">Shop Now</button>
          </div>
        </div>
        
        <div class="promo-card">
          <div class="promo-content">
            <h2>Free Shipping on Orders Over $1000</h2>
            <p>Use promo code <strong>FREESHIP</strong> at checkout</p>
            <button class="btn btn-primary">Shop Now</button>
          </div>
        </div>
        
        <div class="promo-card">
          <div class="promo-content">
            <h2>Save 20% on Selected Models</h2>
            <p>Use promo code <strong>SAVE20</strong> at checkout</p>
            <button class="btn btn-primary">Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deals-page {
  padding-bottom: 4rem;
}

.deals-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.deals-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.deals-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.deals-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.filter-btn {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.deals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.deal-item {
  position: relative;
}

.deal-card {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.deal-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--accent-color);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.deal-badge.clearance {
  background-color: var(--error-color);
}

.deal-badge.daily {
  background-color: var(--primary-color);
}

.deal-badge.bundle {
  background-color: var(--secondary-color);
}

.deal-badge.refurbished {
  background-color: var(--success-color);
}

.badge-text {
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
}

.discount-percentage {
  font-size: 1.2rem;
  font-weight: 700;
}

.deal-countdown {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem;
  border-radius: 8px;
  font-size: 0.8rem;
}

.countdown-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.countdown-text {
  display: flex;
  flex-direction: column;
}

.days-remaining {
  font-weight: 700;
}

.end-date {
  font-size: 0.7rem;
  opacity: 0.8;
}

.bundle-items, .refurbished-info {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.bundle-items h4, .refurbished-info h4 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.bundle-items ul {
  margin: 0;
  padding-left: 1.5rem;
}

.bundle-items li {
  margin-bottom: 0.25rem;
}

.refurbished-info p {
  margin: 0;
  color: var(--gray-color);
}

.promo-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.promo-card {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.promo-card:hover {
  transform: translateY(-5px);
}

.promo-content {
  padding: 2rem;
  text-align: center;
}

.promo-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--dark-color);
}

.promo-content p {
  margin-bottom: 1.5rem;
  color: var(--gray-color);
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
  transform: translateY(-2px);
}

@media (max-width: 1200px) {
  .deals-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .promo-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .deals-grid {
    grid-template-columns: 1fr;
  }
  
  .promo-section {
    grid-template-columns: 1fr;
  }
  
  .deals-hero {
    padding: 3rem 0;
  }
  
  .deals-title {
    font-size: 2rem;
  }
}
</style>
