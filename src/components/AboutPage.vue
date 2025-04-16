<script setup>
import { ref } from 'vue';

// Team members data
const teamMembers = [
  {
    name: 'Sarah Johnson',
    title: 'CEO & Founder',
    bio: 'Sarah founded TechLaptops in 2015 with a vision to make high-quality laptops accessible to everyone. With over 15 years of experience in the tech industry, she leads our company\'s strategic direction.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    name: 'Michael Chen',
    title: 'CTO',
    bio: 'Michael oversees all technical aspects of TechLaptops. His background in computer engineering and product development ensures we stay at the cutting edge of laptop technology.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    name: 'Emily Rodriguez',
    title: 'Head of Customer Experience',
    bio: 'Emily leads our customer service team with a passion for creating exceptional shopping experiences. She is dedicated to ensuring every customer receives personalized support and satisfaction.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    name: 'David Kim',
    title: 'Product Director',
    bio: 'David curates our product selection with an expert eye for quality and performance. He works directly with manufacturers to bring the best laptops to our customers.',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  }
];

const milestones = [
  {
    year: 2015,
    title: 'Company Founded',
    description: 'TechLaptops was established with a mission to provide quality laptops at competitive prices.'
  },
  {
    year: 2017,
    title: 'Expanded Product Line',
    description: 'Added gaming laptops and professional workstations to our catalog, broadening our customer base.'
  },
  {
    year: 2019,
    title: 'Launched 24/7 Customer Support',
    description: 'Implemented round-the-clock customer service to better serve our global customer base.'
  },
  {
    year: 2021,
    title: 'Opened First Physical Store',
    description: 'Established our flagship retail location in San Francisco, allowing customers to experience our products in person.'
  },
  {
    year: 2023,
    title: 'Sustainability Initiative',
    description: 'Launched our eco-friendly packaging and laptop recycling program to reduce environmental impact.'
  },
  {
    year: 2025,
    title: 'International Expansion',
    description: 'Expanded operations to Europe and Asia, with dedicated regional support teams and faster shipping.'
  }
];

// Testimonials
const testimonials = [
  {
    name: 'James Wilson',
    role: 'Software Developer',
    content: 'The development laptop I purchased from TechLaptops has been a game-changer for my work. The performance is outstanding, and their customer service was incredibly helpful when I needed assistance.',
    image: 'https://randomuser.me/api/portraits/men/11.jpg'
  },
  {
    name: 'Lisa Thompson',
    role: 'Graphic Designer',
    content: 'As a designer, I need a reliable machine with excellent color accuracy. My laptop from TechLaptops exceeds all my expectations. The screen quality is phenomenal, and it handles all my design software with ease.',
    image: 'https://randomuser.me/api/portraits/women/12.jpg'
  },
  {
    name: 'Robert Garcia',
    role: 'College Student',
    content: 'TechLaptops offered the best value for my budget as a student. Their educational discount program saved me hundreds of dollars, and the laptop has been perfect for both coursework and gaming.',
    image: 'https://randomuser.me/api/portraits/men/13.jpg'
  }
];

// Active testimonial
const activeTestimonial = ref(0);

// Change testimonial
const changeTestimonial = (index) => {
  activeTestimonial.value = index;
};

// Next testimonial
const nextTestimonial = () => {
  activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.length;
};

// Previous testimonial
const prevTestimonial = () => {
  activeTestimonial.value = (activeTestimonial.value - 1 + testimonials.length) % testimonials.length;
};

// Auto-rotate testimonials
setInterval(() => {
  nextTestimonial();
}, 8000);
</script>

<template>
  <div class="about-page">
    <div class="about-hero">
      <div class="container">
        <h1 class="about-title">About TechLaptops</h1>
        <p class="about-subtitle">Your trusted source for premium laptops since 2015</p>
      </div>
    </div>
    
    <div class="container">
      <div class="about-section">
        <div class="about-content">
          <h2 class="section-title">Our Story</h2>
          <p>TechLaptops was founded in 2015 with a simple mission: to provide high-quality laptops at competitive prices with exceptional customer service. What began as a small online store has grown into a trusted retailer serving customers worldwide.</p>
          <p>We believe that technology should enhance your life, not complicate it. That's why we carefully select each laptop in our inventory, ensuring it meets our strict standards for performance, reliability, and value.</p>
          <p>Our team of tech enthusiasts is passionate about helping you find the perfect laptop for your needs, whether you're a student, professional, gamer, or creative. We're not just selling laptops; we're building lasting relationships with our customers.</p>
        </div>
        <div class="about-image">
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Our office">
        </div>
      </div>
      
      <div class="values-section">
        <h2 class="section-title">Our Values</h2>
        
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">🔍</div>
            <h3>Quality</h3>
            <p>We rigorously test every laptop we sell to ensure it meets our high standards for performance and reliability.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">💬</div>
            <h3>Customer Service</h3>
            <p>Our knowledgeable support team is available 24/7 to assist you with any questions or concerns.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">💰</div>
            <h3>Value</h3>
            <p>We negotiate directly with manufacturers to offer competitive prices without compromising on quality.</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We're committed to reducing our environmental impact through eco-friendly packaging and recycling programs.</p>
          </div>
        </div>
      </div>
      
      <div class="team-section">
        <h2 class="section-title">Meet Our Team</h2>
        
        <div class="team-grid">
          <div v-for="(member, index) in teamMembers" :key="index" class="team-member">
            <div class="member-image">
              <img :src="member.image" :alt="member.name">
            </div>
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-title">{{ member.title }}</p>
            <p class="member-bio">{{ member.bio }}</p>
          </div>
        </div>
      </div>
      
      <div class="milestones-section">
        <h2 class="section-title">Our Journey</h2>
        
        <div class="timeline">
          <div v-for="(milestone, index) in milestones" :key="index" class="timeline-item" :class="{ 'right': index % 2 === 1 }">
            <div class="timeline-content">
              <div class="timeline-year">{{ milestone.year }}</div>
              <h3 class="timeline-title">{{ milestone.title }}</h3>
              <p class="timeline-description">{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="testimonials-section">
        <h2 class="section-title">What Our Customers Say</h2>
        
        <div class="testimonials-carousel">
          <div class="testimonial-controls">
            <button class="control-btn prev" @click="prevTestimonial">❮</button>
            <button class="control-btn next" @click="nextTestimonial">❯</button>
          </div>
          
          <div class="testimonials-container">
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="testimonial"
              :class="{ 'active': index === activeTestimonial }"
            >
              <div class="testimonial-content">
                <p class="testimonial-text">"{{ testimonial.content }}"</p>
                <div class="testimonial-author">
                  <img :src="testimonial.image" :alt="testimonial.name">
                  <div class="author-info">
                    <h4>{{ testimonial.name }}</h4>
                    <p>{{ testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="testimonial-indicators">
            <span 
              v-for="(_, index) in testimonials" 
              :key="index"
              class="indicator"
              :class="{ 'active': index === activeTestimonial }"
              @click="changeTestimonial(index)"
            ></span>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <div class="cta-content">
          <h2>Ready to Find Your Perfect Laptop?</h2>
          <p>Browse our extensive collection of laptops for every need and budget.</p>
          <a href="#" class="btn btn-primary">Shop Now</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding-bottom: 4rem;
}

.about-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 3rem;
}

.about-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.about-section {
  display: flex;
  gap: 3rem;
  margin-bottom: 4rem;
  align-items: center;
}

.about-content {
  flex: 1;
}

.about-content p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
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

.values-section {
  margin-bottom: 4rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.value-card {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.value-card h3 {
  margin-bottom: 1rem;
  color: var(--dark-color);
}

.value-card p {
  color: var(--gray-color);
  line-height: 1.6;
}

.team-section {
  margin-bottom: 4rem;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.team-member {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s;
}

.team-member:hover {
  transform: translateY(-5px);
}

.member-image {
  height: 200px;
  overflow: hidden;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  margin: 1.5rem 0 0.5rem;
  padding: 0 1.5rem;
  font-size: 1.2rem;
}

.member-title {
  color: var(--primary-color);
  font-weight: 600;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
}

.member-bio {
  padding: 0 1.5rem 1.5rem;
  color: var(--gray-color);
  font-size: 0.9rem;
  line-height: 1.6;
}

.milestones-section {
  margin-bottom: 4rem;
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 6px;
  background-color: var(--light-color);
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  width: 50%;
  left: 0;
}

.timeline-item.right {
  left: 50%;
}

.timeline-content {
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.timeline-year {
  position: absolute;
  top: -40px;
  width: 80px;
  height: 40px;
  background-color: var(--primary-color);
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: var(--border-radius);
  font-weight: 600;
}

.timeline-item .timeline-year {
  right: -40px;
}

.timeline-item.right .timeline-year {
  left: -40px;
}

.timeline-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--dark-color);
}

.timeline-description {
  color: var(--gray-color);
  margin-bottom: 0;
}

.testimonials-section {
  margin-bottom: 4rem;
}

.testimonials-carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.testimonials-container {
  position: relative;
  height: 300px;
}

.testimonial {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transform: translateX(50px);
  transition: all 0.5s;
}

.testimonial.active {
  opacity: 1;
  transform: translateX(0);
}

.testimonial-content {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: var(--dark-color);
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.testimonial-author img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
}

.author-info h4 {
  margin: 0;
  color: var(--dark-color);
}

.author-info p {
  margin: 0;
  color: var(--gray-color);
}

.testimonial-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}

.control-btn {
  background-color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.control-btn.prev {
  margin-left: -20px;
}

.control-btn.next {
  margin-right: -20px;
}

.testimonial-indicators {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ddd;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background-color: var(--primary-color);
}

.cta-section {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--border-radius);
  padding: 3rem;
  text-align: center;
  color: white;
}

.cta-content h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.cta-content p {
  margin-bottom: 2rem;
  opacity: 0.9;
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
  background-color: white;
  color: var(--primary-color);
}

.btn-primary:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {
  .about-section {
    flex-direction: column;
  }
  
  .values-grid,
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .timeline::after {
    left: 31px;
  }
  
  .timeline-item {
    width: 100%;
    padding-left: 70px;
    padding-right: 25px;
  }
  
  .timeline-item.right {
    left: 0;
  }
  
  .timeline-item .timeline-year,
  .timeline-item.right .timeline-year {
    left: -9px;
    right: auto;
  }
}

@media (max-width: 768px) {
  .values-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .about-hero {
    padding: 3rem 0;
  }
  
  .about-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
}
</style>
