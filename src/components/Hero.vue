<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const slides = ref([
  {
    id: 1,
    title: "Ultimate Performance",
    subtitle: "Experience the power of next-gen laptops",
    description: "Discover our premium collection of high-performance laptops designed for professionals and gamers alike.",
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "Ultralight Design",
    subtitle: "Work from anywhere with ease",
    description: "Our lightweight laptops combine portability with power, perfect for the modern professional on the go.",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cta: "Explore"
  },
  {
    id: 3,
    title: "Gaming Excellence",
    subtitle: "Elevate your gaming experience",
    description: "Immerse yourself in stunning visuals and lightning-fast performance with our gaming laptop series.",
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    cta: "View Collection"
  }
]);

const currentSlide = ref(0);
let slideInterval = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

// Auto-advance slides
const startSlideTimer = () => {
  slideInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

onMounted(() => {
  startSlideTimer();
});

onBeforeUnmount(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>

<template>
  <section class="hero">
    <div class="hero-slider">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id" 
        class="hero-slide"
        :class="{ active: index === currentSlide }"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="container hero-content">
          <div class="hero-text">
            <h1 class="hero-title">{{ slide.title }}</h1>
            <h2 class="hero-subtitle">{{ slide.subtitle }}</h2>
            <p class="hero-description">{{ slide.description }}</p>
            <a href="#products" class="btn btn-primary hero-cta">{{ slide.cta }}</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="hero-controls">
      <button class="hero-control prev" @click="prevSlide">
        <span class="visually-hidden">Previous</span>
        <i class="icon-arrow-left"></i>
      </button>
      <div class="hero-indicators">
        <button 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          class="hero-indicator"
          :class="{ active: index === currentSlide }"
          @click="currentSlide = index"
        ></button>
      </div>
      <button class="hero-control next" @click="nextSlide">
        <span class="visually-hidden">Next</span>
        <i class="icon-arrow-right"></i>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 80vh;
  min-height: 500px;
  max-height: 800px;
  overflow: hidden;
}

.hero-slider {
  position: relative;
  height: 100%;
  width: 100%;
}

.hero-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease;
  display: flex;
  align-items: center;
}

.hero-slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
}

.hero-slide.active {
  opacity: 1;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.2s;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.4s;
}

.hero-description {
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.6s;
}

.hero-cta {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
  animation-delay: 0.8s;
}

.hero-controls {
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.hero-control {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  opacity: 0.7;
  transition: opacity var(--transition-speed);
}

.hero-control:hover {
  opacity: 1;
}

.hero-indicators {
  display: flex;
  margin: 0 1rem;
}

.hero-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  margin: 0 0.25rem;
  cursor: pointer;
  transition: all var(--transition-speed);
}

.hero-indicator.active {
  background-color: white;
  transform: scale(1.2);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Icons */
.icon-arrow-left::before {
  content: '←';
}

.icon-arrow-right::before {
  content: '→';
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .hero {
    height: 60vh;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
}
</style>
