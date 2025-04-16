<script setup>
import { ref, onMounted } from 'vue';
import { useCart } from '../store/cart';
import ProductCard from './ProductCard.vue';

const cart = useCart();

onMounted(() => {
  cart.loadCart();
});

const featuredProducts = ref([
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
    price: 1799,
    discountPrice: 1599,
    rating: 4.6,
    specs: {
      processor: "Intel Core i9",
      ram: "32GB",
      storage: "1TB SSD",
      display: "15.6-inch 4K OLED"
    },
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    badge: null
  }
]);
</script>

<template>
  <section class="section featured-products" id="featured">
    <div class="container">
      <h2 class="section-title">Featured Products</h2>
      
      <div class="products-grid">
        <div v-for="product in featuredProducts" :key="product.id" class="product-item">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-products {
  background-color: #f9f9f9;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.product-item {
  display: flex;
  flex-direction: column;
  height: 100%;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 576px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
