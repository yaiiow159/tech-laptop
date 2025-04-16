<script setup>
import { ref } from 'vue';

// FAQ categories
const categories = [
  { id: 'general', name: 'General Questions' },
  { id: 'orders', name: 'Orders & Shipping' },
  { id: 'returns', name: 'Returns & Refunds' },
  { id: 'technical', name: 'Technical Support' },
  { id: 'warranty', name: 'Warranty Information' }
];

// Active category
const activeCategory = ref('general');

// FAQ data
const faqs = {
  general: [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. We also offer financing options through Affirm for qualifying customers.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please note that customers are responsible for any customs fees or import taxes that may apply.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.'
    },
    {
      question: 'Do you offer price matching?',
      answer: 'Yes, we offer price matching on identical products from authorized retailers. Please contact our customer service team with details of the competitor\'s offer to request a price match.'
    }
  ],
  orders: [
    {
      question: 'How long will it take to receive my order?',
      answer: 'Domestic orders typically ship within 1-2 business days and arrive within 3-5 business days. Expedited shipping options are available at checkout. International shipping times vary by location.'
    },
    {
      question: 'Can I change or cancel my order?',
      answer: 'Orders can be modified or canceled within 1 hour of placement. After this window, please contact our customer service team as soon as possible, though we cannot guarantee changes once processing has begun.'
    },
    {
      question: 'Do you offer free shipping?',
      answer: 'We offer free standard shipping on all domestic orders over $1000. For orders under $1000, shipping rates start at $15 depending on the destination and shipping method selected.'
    },
    {
      question: 'What should I do if my order arrives damaged?',
      answer: 'If your order arrives damaged, please take photos of the packaging and damaged items, and contact our customer service team within 48 hours of delivery. We\'ll arrange for a return or replacement.'
    }
  ],
  returns: [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most products. Items must be in their original condition with all packaging and accessories. Certain products may have different return periods, which will be noted in the product description.'
    },
    {
      question: 'How do I initiate a return?',
      answer: 'To initiate a return, log into your account, find the order, and select "Return Items." Follow the instructions to generate a return label. If you checked out as a guest, please contact our customer service team.'
    },
    {
      question: 'How long does it take to process a refund?',
      answer: 'Once we receive your return, it typically takes 3-5 business days to inspect and process. Refunds are issued to the original payment method and may take an additional 3-7 business days to appear on your statement.'
    },
    {
      question: 'Do I have to pay for return shipping?',
      answer: 'For defective items or our error, return shipping is free. For other returns, a shipping fee of $15 will be deducted from your refund unless you\'re returning for store credit.'
    }
  ],
  technical: [
    {
      question: 'My laptop won\'t turn on. What should I do?',
      answer: 'First, ensure your laptop is properly charged. Try removing the battery (if possible) and power adapter, hold the power button for 30 seconds, then reconnect and try again. If issues persist, contact our technical support team.'
    },
    {
      question: 'How do I update drivers for my laptop?',
      answer: 'Most manufacturers provide driver updates through their websites. Visit the support section of your laptop manufacturer\'s website, enter your model number, and download the latest drivers. Many laptops also have built-in update utilities.'
    },
    {
      question: 'My laptop is running slowly. How can I improve performance?',
      answer: 'Try these steps: 1) Close unnecessary programs, 2) Clear temporary files, 3) Run disk cleanup and defragmentation, 4) Check for malware, 5) Consider upgrading RAM or switching to an SSD if you have an older HDD.'
    },
    {
      question: 'How do I extend my laptop\'s battery life?',
      answer: 'To maximize battery life: 1) Lower screen brightness, 2) Use battery saver mode, 3) Close unused applications, 4) Disable Bluetooth and Wi-Fi when not in use, 5) Keep your laptop updated, 6) Avoid extreme temperatures.'
    }
  ],
  warranty: [
    {
      question: 'What warranty comes with your laptops?',
      answer: 'All new laptops come with a standard 1-year manufacturer\'s warranty covering hardware defects and malfunctions. We also offer extended warranty options of 2 or 3 years at the time of purchase.'
    },
    {
      question: 'What does the warranty cover?',
      answer: 'The standard warranty covers manufacturing defects and hardware failures under normal use. It does not cover accidental damage, liquid spills, software issues, or normal wear and tear.'
    },
    {
      question: 'How do I check if my laptop is still under warranty?',
      answer: 'You can check your warranty status by logging into your account and viewing your purchases. Alternatively, contact our customer service with your order number or the laptop\'s serial number.'
    },
    {
      question: 'Do refurbished laptops come with a warranty?',
      answer: 'Yes, all certified refurbished laptops come with a 90-day warranty. You can purchase extended warranty coverage for refurbished products at checkout.'
    }
  ]
};

// Toggle FAQ item
const toggleFaq = (index) => {
  const faqItems = document.querySelectorAll(`.faq-item[data-category="${activeCategory.value}"]`);
  faqItems.forEach((item, i) => {
    if (i === index) {
      item.classList.toggle('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Set active category
const setCategory = (categoryId) => {
  activeCategory.value = categoryId;
};

// Contact form data
const contactForm = ref({
  name: '',
  email: '',
  orderNumber: '',
  subject: '',
  message: '',
  submitted: false
});

// Submit contact form
const submitContactForm = () => {
  // In a real application, this would send the form data to a backend
  contactForm.value.submitted = true;
  
  // Reset form after 5 seconds
  setTimeout(() => {
    contactForm.value = {
      name: '',
      email: '',
      orderNumber: '',
      subject: '',
      message: '',
      submitted: false
    };
  }, 5000);
};
</script>

<template>
  <div class="support-page">
    <div class="support-hero">
      <div class="container">
        <h1 class="support-title">Customer Support</h1>
        <p class="support-subtitle">We're here to help you with any questions or issues</p>
      </div>
    </div>
    
    <div class="container">
      <div class="support-options">
        <div class="support-option">
          <div class="option-icon">📞</div>
          <h3>Call Us</h3>
          <p>1-800-TECH-HELP</p>
          <p class="option-hours">Mon-Fri: 9am-8pm ET</p>
          <p class="option-hours">Sat-Sun: 10am-6pm ET</p>
        </div>
        
        <div class="support-option">
          <div class="option-icon">💬</div>
          <h3>Live Chat</h3>
          <p>Chat with our support team</p>
          <p class="option-hours">Available 24/7</p>
          <button class="btn btn-primary">Start Chat</button>
        </div>
        
        <div class="support-option">
          <div class="option-icon">📧</div>
          <h3>Email Us</h3>
          <p>support@techlaptops.com</p>
          <p class="option-hours">Response within 24 hours</p>
        </div>
      </div>
      
      <div class="faq-section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        
        <div class="faq-categories">
          <button 
            v-for="category in categories" 
            :key="category.id"
            class="category-btn"
            :class="{ 'active': activeCategory === category.id }"
            @click="setCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="faq-list">
          <div 
            v-for="(faq, index) in faqs[activeCategory]" 
            :key="`${activeCategory}-${index}`"
            class="faq-item"
            :data-category="activeCategory"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contact-section">
        <h2 class="section-title">Contact Us</h2>
        
        <div v-if="contactForm.submitted" class="contact-success">
          <div class="success-icon">✓</div>
          <h3>Thank you for contacting us!</h3>
          <p>We've received your message and will respond shortly.</p>
        </div>
        
        <form v-else class="contact-form" @submit.prevent="submitContactForm">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Your Name*</label>
              <input 
                type="text" 
                id="name" 
                v-model="contactForm.name" 
                required
              >
            </div>
            <div class="form-group">
              <label for="email">Email Address*</label>
              <input 
                type="email" 
                id="email" 
                v-model="contactForm.email" 
                required
              >
            </div>
          </div>
          
          <div class="form-group">
            <label for="orderNumber">Order Number (if applicable)</label>
            <input 
              type="text" 
              id="orderNumber" 
              v-model="contactForm.orderNumber"
            >
          </div>
          
          <div class="form-group">
            <label for="subject">Subject*</label>
            <input 
              type="text" 
              id="subject" 
              v-model="contactForm.subject" 
              required
            >
          </div>
          
          <div class="form-group">
            <label for="message">Message*</label>
            <textarea 
              id="message" 
              v-model="contactForm.message" 
              rows="5" 
              required
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.support-page {
  padding-bottom: 4rem;
}

.support-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 3rem;
}

.support-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.support-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.support-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 4rem;
}

.support-option {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s;
}

.support-option:hover {
  transform: translateY(-5px);
}

.option-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.support-option h3 {
  margin-bottom: 1rem;
  color: var(--dark-color);
}

.support-option p {
  margin-bottom: 0.5rem;
  color: var(--gray-color);
}

.option-hours {
  font-size: 0.9rem;
  opacity: 0.8;
}

.support-option .btn {
  margin-top: 1rem;
}

.faq-section {
  margin-bottom: 4rem;
}

.faq-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
}

.category-btn {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.category-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  overflow: hidden;
  cursor: pointer;
}

.faq-question {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.faq-toggle {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.3s;
}

.faq-item.active .faq-toggle {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 1.5rem;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s;
}

.faq-item.active .faq-answer {
  padding: 0 1.5rem 1.5rem;
  max-height: 500px;
}

.contact-section {
  max-width: 800px;
  margin: 0 auto;
}

.contact-form {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.contact-success {
  background-color: var(--success-color);
  color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  text-align: center;
}

.success-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-success h3 {
  margin-bottom: 1rem;
}

.contact-success p {
  opacity: 0.9;
}

@media (max-width: 992px) {
  .support-options {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 768px) {
  .support-options {
    grid-template-columns: 1fr;
  }
  
  .support-hero {
    padding: 3rem 0;
  }
  
  .support-title {
    font-size: 2rem;
  }
  
  .faq-categories {
    flex-direction: column;
  }
}
</style>
