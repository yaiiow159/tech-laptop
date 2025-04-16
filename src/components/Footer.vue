<script setup>
import { ref } from 'vue';

const currentYear = new Date().getFullYear();

const subscribeEmail = ref('');

const handleSubscribe = () => {
  if (subscribeEmail.value && validateEmail(subscribeEmail.value)) {
    alert('Thank you for subscribing!');
    subscribeEmail.value = '';
  } else {
    alert('Please enter a valid email address.');
  }
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-column">
            <h3 class="footer-title">TechLaptops</h3>
            <p class="footer-description">
              Providing high-quality laptops for professionals, gamers, students, and everyone in between.
            </p>
            <div class="social-links">
              <a href="#" class="social-link">
                <i class="icon-facebook"></i>
              </a>
              <a href="#" class="social-link">
                <i class="icon-twitter"></i>
              </a>
              <a href="#" class="social-link">
                <i class="icon-instagram"></i>
              </a>
              <a href="#" class="social-link">
                <i class="icon-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div class="footer-column">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#deals">Deals</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#about">About Us</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4 class="footer-heading">Customer Service</h4>
            <ul class="footer-links">
              <li><a href="#support">Support Center</a></li>
              <li><a href="#shipping">Shipping & Returns</a></li>
              <li><a href="#warranty">Warranty</a></li>
              <li><a href="#payment">Payment Methods</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          
          <div class="footer-column">
            <h4 class="footer-heading">Newsletter</h4>
            <p class="newsletter-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <input 
                type="email" 
                v-model="subscribeEmail"
                placeholder="Enter your email" 
                class="newsletter-input"
                required
              >
              <button type="submit" class="btn btn-primary newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p class="copyright">
            &copy; {{ currentYear }} TechLaptops. All rights reserved.
          </p>
          <div class="footer-bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--dark-color);
  color: white;
}

.footer-top {
  padding: 4rem 0;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all var(--transition-speed);
}

.social-link:hover {
  background-color: var(--primary-color);
  transform: translateY(-3px);
}

.footer-heading {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition-speed);
  position: relative;
  padding-left: 15px;
}

.footer-links a::before {
  content: '›';
  position: absolute;
  left: 0;
  transition: transform var(--transition-speed);
}

.footer-links a:hover {
  color: white;
}

.footer-links a:hover::before {
  transform: translateX(3px);
}

.newsletter-text {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
}

.newsletter-input {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  margin-bottom: 0.75rem;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-btn {
  width: 100%;
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: rgba(255, 255, 255, 0.7);
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color var(--transition-speed);
}

.footer-bottom-links a:hover {
  color: white;
}

/* Icons */
.icon-facebook::before {
  content: 'f';
}

.icon-twitter::before {
  content: 't';
}

.icon-instagram::before {
  content: 'i';
}

.icon-linkedin::before {
  content: 'l';
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
