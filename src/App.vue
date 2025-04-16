<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import FeaturedProducts from './components/FeaturedProducts.vue';
import ProductGrid from './components/ProductGrid.vue';
import Footer from './components/Footer.vue';
import CartDrawer from './components/CartDrawer.vue';
import CompareDrawer from './components/CompareDrawer.vue';
import CheckoutPage from './components/CheckoutPage.vue';
import DealsPage from './components/DealsPage.vue';
import SupportPage from './components/SupportPage.vue';
import AboutPage from './components/AboutPage.vue';
import FavoritesPage from './components/FavoritesPage.vue';
import { useCart } from './store/cart';
import { useFavorites } from './store/favorites';
import { useCompare } from './store/compare';

const isLoading = ref(true);
const currentPage = ref('home');
const cart = useCart();
const favorites = useFavorites();
const compare = useCompare();

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
  
  cart.loadCart();
  favorites.loadFavorites();
  compare.loadCompare();
  
  checkRouteFromHash();
  
  window.addEventListener('hashchange', checkRouteFromHash);
});

const checkRouteFromHash = () => {
  const hash = window.location.hash;
  
  if (hash === '#checkout') {
    currentPage.value = 'checkout';
  } else if (hash === '#deals') {
    currentPage.value = 'deals';
  } else if (hash === '#support') {
    currentPage.value = 'support';
  } else if (hash === '#about') {
    currentPage.value = 'about';
  } else if (hash === '#favorites') {
    currentPage.value = 'favorites';
  } else {
    currentPage.value = 'home';
  }
};
</script>

<template>
  <div class="app-container">
    <div v-if="isLoading" class="loader">
      <div class="spinner"></div>
    </div>
    <div v-else>
      <Navbar />
      <main>
        <template v-if="currentPage === 'home'">
          <Hero />
          <FeaturedProducts />
          <ProductGrid />
        </template>
        <template v-else-if="currentPage === 'checkout'">
          <CheckoutPage />
        </template>
        <template v-else-if="currentPage === 'deals'">
          <DealsPage />
        </template>
        <template v-else-if="currentPage === 'support'">
          <SupportPage />
        </template>
        <template v-else-if="currentPage === 'about'">
          <AboutPage />
        </template>
        <template v-else-if="currentPage === 'favorites'">
          <FavoritesPage />
        </template>
      </main>
      <Footer />
      <CartDrawer />
      <CompareDrawer />
    </div>
  </div>
</template>

<style>
:root {
  --primary-color: #3a86ff;
  --secondary-color: #8338ec;
  --accent-color: #ff006e;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  --gray-color: #6c757d;
  --success-color: #38b000;
  --warning-color: #ffbe0b;
  --error-color: #dc2f02;
  --transition-speed: 0.3s;
  --border-radius: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', 'Segoe UI', Roboto, sans-serif;
}

body {
  background-color: var(--light-color);
  color: var(--dark-color);
  line-height: 1.6;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--light-color);
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(58, 134, 255, 0.3);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .section {
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
