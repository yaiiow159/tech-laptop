<script setup>
import { ref, onMounted } from 'vue';
import { useCart } from '../store/cart';
import { useFavorites } from '../store/favorites';
import { useCompare } from '../store/compare';

const cart = useCart();
const favorites = useFavorites();
const compare = useCompare();
const isMenuOpen = ref(false);

onMounted(() => {
  cart.loadCart();
  favorites.loadFavorites();
  compare.loadCompare();
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const openCartDrawer = (event) => {
  event.preventDefault();
  cart.openCart();
};

const openCompareDrawer = (event) => {
  event.preventDefault();
  compare.openCompareDrawer();
};

const navigateTo = (hash) => {
  window.location.hash = hash;
  isMenuOpen.value = false;
};

const navLinks = [
  { name: 'Home', url: '#' },
  { name: 'Products', url: '#products' },
  { name: 'Deals', url: '#deals' },
  { name: 'Support', url: '#support' },
  { name: 'About', url: '#about' }
];
</script>

<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <div class="navbar-brand">
        <a href="#" class="logo">TechLaptops</a>
      </div>
      
      <div class="navbar-menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div class="navbar-menu" :class="{ 'active': isMenuOpen }">
        <ul class="navbar-nav">
          <li v-for="link in navLinks" :key="link.name" class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click="navigateTo(link.url)">{{ link.name }}</a>
          </li>
        </ul>
        
        <div class="navbar-actions">
          <a href="#" class="btn-icon">
            <i class="icon-search"></i>
          </a>
          <a href="javascript:void(0)" class="btn-icon" @click="navigateTo('#favorites')" title="Favorites">
            <i class="icon-heart"></i>
            <span class="count-badge" v-if="favorites.favoritesCount > 0">{{ favorites.favoritesCount }}</span>
          </a>
          <a href="javascript:void(0)" class="btn-icon" @click="openCompareDrawer" title="Compare Products">
            <i class="icon-balance-scale"></i>
            <span class="count-badge" v-if="compare.compareCount > 0">{{ compare.compareCount }}</span>
          </a>
          <a href="javascript:void(0)" class="btn-icon" @click="openCartDrawer" title="Shopping Cart">
            <i class="icon-cart"></i>
            <span class="count-badge" v-if="cart.cartCount > 0">{{ cart.cartCount }}</span>
          </a>
          <a href="#" class="btn-icon" title="My Account">
            <i class="icon-user"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem 0;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-speed);
}

.logo:hover {
  color: var(--secondary-color);
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 0.5rem;
}

.nav-link {
  color: var(--dark-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem;
  transition: color var(--transition-speed);
}

.nav-link:hover {
  color: var(--primary-color);
}

.navbar-actions {
  display: flex;
  margin-left: 2rem;
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 0.5rem;
  color: var(--dark-color);
  text-decoration: none;
  transition: all var(--transition-speed);
  position: relative;
}

.btn-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--primary-color);
}

.count-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.navbar-menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: var(--dark-color);
  border-radius: 3px;
  transition: all var(--transition-speed);
}

/* Icons */
.icon-search::before {
  content: '🔍';
}

.icon-heart::before {
  content: '❤️';
}

.icon-balance-scale::before {
  content: '⚖️';
}

.icon-cart::before {
  content: '🛒';
}

.icon-user::before {
  content: '👤';
}

@media (max-width: 768px) {
  .navbar-menu-toggle {
    display: flex;
  }
  
  .navbar-menu {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: 0;
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    transition: height var(--transition-speed);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }
  
  .navbar-menu.active {
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
  
  .navbar-nav {
    flex-direction: column;
    width: 100%;
    padding: 1rem;
  }
  
  .nav-item {
    margin: 0.5rem 0;
    width: 100%;
  }
  
  .nav-link {
    display: block;
    padding: 0.75rem;
    width: 100%;
  }
  
  .navbar-actions {
    margin: 1rem;
    width: 100%;
    justify-content: center;
  }
}
</style>
