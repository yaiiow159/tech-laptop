<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useCart } from '../store/cart';

const cart = useCart();
const currentStep = ref(1);
const totalSteps = 3;

const validCartItems = computed(() => {
  if (!cart.items.value || !Array.isArray(cart.items.value)) {
    return [];
  }
  return cart.items.value.filter(item => item && typeof item === 'object' && item.id);
});

onMounted(() => {
  cart.loadCart();
});

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States'
});

const billingInfo = ref({
  sameAsShipping: true,
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States'
});

const paymentInfo = ref({
  method: 'credit_card',
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  saveCard: false
});

const termsAccepted = ref(false);
const promoCode = ref('');
const promoApplied = ref(false);
const promoDiscount = ref(0);
const promoError = ref('');

const cardType = computed(() => {
  const number = paymentInfo.value.cardNumber.replace(/\s+/g, '');
  
  if (/^4/.test(number)) return 'visa';
  if (/^5[1-5]/.test(number)) return 'mastercard';
  if (/^3[47]/.test(number)) return 'amex';
  if (/^6(?:011|5)/.test(number)) return 'discover';
  
  return 'unknown';
});

watch(() => paymentInfo.value.cardNumber, (newVal) => {
  if (!newVal) return;
  
  let value = newVal.replace(/\D/g, '');
  
  if (cardType.value === 'amex') {
    value = value.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
  
  if (value !== newVal) {
    paymentInfo.value.cardNumber = value;
  }
});

watch(() => paymentInfo.value.expiryDate, (newVal) => {
  if (!newVal) return;
  
  let value = newVal.replace(/\D/g, '');
  
  if (value.length > 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4);
  }
  
  if (value !== newVal) {
    paymentInfo.value.expiryDate = value;
  }
});

const effectiveBillingInfo = computed(() => {
  if (billingInfo.value.sameAsShipping) {
    return {
      firstName: shippingInfo.value.firstName,
      lastName: shippingInfo.value.lastName,
      address: shippingInfo.value.address,
      city: shippingInfo.value.city,
      state: shippingInfo.value.state,
      zipCode: shippingInfo.value.zipCode,
      country: shippingInfo.value.country
    };
  }
  return billingInfo.value;
});

const isShippingFormValid = computed(() => {
  const s = shippingInfo.value;
  return s.firstName && s.lastName && s.email && s.phone && s.address && s.city && s.state && s.zipCode;
});

const isBillingFormValid = computed(() => {
  if (billingInfo.value.sameAsShipping) return true;
  
  const b = billingInfo.value;
  return b.firstName && b.lastName && b.address && b.city && b.state && b.zipCode;
});

const isPaymentFormValid = computed(() => {
  const p = paymentInfo.value;
  if (p.method === 'credit_card') {
    const cardNumberValid = p.cardNumber.replace(/\s+/g, '').length >= 15;
    const cardNameValid = p.cardName.length > 3;
    const expiryValid = /^\d{2}\/\d{2}$/.test(p.expiryDate);
    const cvvValid = p.cvv.length >= 3;
    
    return cardNumberValid && cardNameValid && expiryValid && cvvValid;
  }
  return true;
});

const canProceed = computed(() => {
  if (currentStep.value === 1) return isShippingFormValid.value;
  if (currentStep.value === 2) return isBillingFormValid.value;
  if (currentStep.value === 3) return isPaymentFormValid.value && termsAccepted.value;
  return false;
});

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
    window.scrollTo(0, 0);
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    window.scrollTo(0, 0);
  }
};

const applyPromoCode = () => {
  promoApplied.value = false;
  promoDiscount.value = 0;
  promoError.value = '';
  
  const code = promoCode.value.trim().toUpperCase();
  
  if (code === 'WELCOME10') {
    promoApplied.value = true;
    promoDiscount.value = cart.cartSubtotal.value * 0.10; 
  } else if (code === 'SAVE20') {
    promoApplied.value = true;
    promoDiscount.value = cart.cartSubtotal.value * 0.20; 
  } else if (code === 'FREESHIP') {
    promoApplied.value = true;
    promoDiscount.value = cart.cartShipping.value; 
  } else {
    promoError.value = 'Invalid promo code';
  }
};

const placeOrder = () => {
  alert('Thank you for your order! Order #' + Math.floor(Math.random() * 10000));
  cart.clearCart();
  window.location.href = '/';
};

const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) {
    return '$0.00';
  }
  return `$${Number(parseFloat(price)).toFixed(2)}`;
};

const subtotal = computed(() => {
  return formatPrice(cart.cartSubtotal.value);
});

const tax = computed(() => {
  return formatPrice(cart.cartTax.value);
});

const shipping = computed(() => {
  return cart.cartShipping.value === 0 ? 'Free' : formatPrice(cart.cartShipping.value);
});

const discount = computed(() => {
  return promoApplied.value ? formatPrice(promoDiscount.value) : '$0.00';
});

const total = computed(() => {
  let totalValue = cart.cartGrandTotal.value;
  if (promoApplied.value) {
    totalValue -= promoDiscount.value;
  }
  return formatPrice(totalValue > 0 ? totalValue : 0);
});
</script>

<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="checkout-title">Checkout</h1>
      
      <div class="checkout-progress">
        <div 
          v-for="step in totalSteps" 
          :key="step"
          class="progress-step"
          :class="{ 
            'active': step === currentStep,
            'completed': step < currentStep
          }"
        >
          <div class="step-number">{{ step }}</div>
          <div class="step-label">
            {{ step === 1 ? 'Shipping' : step === 2 ? 'Billing' : 'Payment' }}
          </div>
        </div>
      </div>
      
      <div class="checkout-content">
        <div class="checkout-form">
          <div v-if="currentStep === 1" class="checkout-step">
            <h2 class="step-title">Shipping Information</h2>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name*</label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="shippingInfo.firstName" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="lastName">Last Name*</label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="shippingInfo.lastName" 
                  required
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address*</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="shippingInfo.email" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="phone">Phone Number*</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="shippingInfo.phone" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="address">Address*</label>
              <input 
                type="text" 
                id="address" 
                v-model="shippingInfo.address" 
                required
              >
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="city">City*</label>
                <input 
                  type="text" 
                  id="city" 
                  v-model="shippingInfo.city" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="state">State/Province*</label>
                <input 
                  type="text" 
                  id="state" 
                  v-model="shippingInfo.state" 
                  required
                >
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="zipCode">ZIP/Postal Code*</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  v-model="shippingInfo.zipCode" 
                  required
                >
              </div>
              <div class="form-group">
                <label for="country">Country*</label>
                <select id="country" v-model="shippingInfo.country">
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
            </div>
          </div>
          
          <div v-if="currentStep === 2" class="checkout-step">
            <h2 class="step-title">Billing Information</h2>
            
            <div class="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="sameAsShipping" 
                v-model="billingInfo.sameAsShipping"
              >
              <label for="sameAsShipping">Same as shipping address</label>
            </div>
            
            <template v-if="!billingInfo.sameAsShipping">
              <div class="form-row">
                <div class="form-group">
                  <label for="billingFirstName">First Name*</label>
                  <input 
                    type="text" 
                    id="billingFirstName" 
                    v-model="billingInfo.firstName" 
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="billingLastName">Last Name*</label>
                  <input 
                    type="text" 
                    id="billingLastName" 
                    v-model="billingInfo.lastName" 
                    required
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label for="billingAddress">Address*</label>
                <input 
                  type="text" 
                  id="billingAddress" 
                  v-model="billingInfo.address" 
                  required
                >
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="billingCity">City*</label>
                  <input 
                    type="text" 
                    id="billingCity" 
                    v-model="billingInfo.city" 
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="billingState">State/Province*</label>
                  <input 
                    type="text" 
                    id="billingState" 
                    v-model="billingInfo.state" 
                    required
                  >
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="billingZipCode">ZIP/Postal Code*</label>
                  <input 
                    type="text" 
                    id="billingZipCode" 
                    v-model="billingInfo.zipCode" 
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="billingCountry">Country*</label>
                  <select id="billingCountry" v-model="billingInfo.country">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                  </select>
                </div>
              </div>
            </template>
          </div>
          
          <div v-if="currentStep === 3" class="checkout-step">
            <h2 class="step-title">Payment Information</h2>
            
            <div class="payment-methods">
              <div class="payment-method" :class="{ 'active': paymentInfo.method === 'credit_card' }">
                <input 
                  type="radio" 
                  id="credit_card" 
                  value="credit_card" 
                  v-model="paymentInfo.method"
                >
                <label for="credit_card">
                  <div class="payment-icon credit-card-icon"></div>
                  Credit Card
                </label>
              </div>
              <div class="payment-method" :class="{ 'active': paymentInfo.method === 'paypal' }">
                <input 
                  type="radio" 
                  id="paypal" 
                  value="paypal" 
                  v-model="paymentInfo.method"
                >
                <label for="paypal">
                  <div class="payment-icon paypal-icon"></div>
                  PayPal
                </label>
              </div>
              <div class="payment-method" :class="{ 'active': paymentInfo.method === 'apple_pay' }">
                <input 
                  type="radio" 
                  id="apple_pay" 
                  value="apple_pay" 
                  v-model="paymentInfo.method"
                >
                <label for="apple_pay">
                  <div class="payment-icon apple-pay-icon"></div>
                  Apple Pay
                </label>
              </div>
              <div class="payment-method" :class="{ 'active': paymentInfo.method === 'google_pay' }">
                <input 
                  type="radio" 
                  id="google_pay" 
                  value="google_pay" 
                  v-model="paymentInfo.method"
                >
                <label for="google_pay">
                  <div class="payment-icon google-pay-icon"></div>
                  Google Pay
                </label>
              </div>
            </div>
            
            <div v-if="paymentInfo.method === 'credit_card'" class="credit-card-form">
              <div class="card-preview" :class="cardType">
                <div class="card-type-icon"></div>
                <div class="card-number">{{ paymentInfo.cardNumber || 'XXXX XXXX XXXX XXXX' }}</div>
                <div class="card-details">
                  <div class="card-holder">{{ paymentInfo.cardName || 'CARD HOLDER' }}</div>
                  <div class="card-expiry">{{ paymentInfo.expiryDate || 'MM/YY' }}</div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="cardNumber">Card Number*</label>
                <input 
                  type="text" 
                  id="cardNumber" 
                  v-model="paymentInfo.cardNumber" 
                  placeholder="XXXX XXXX XXXX XXXX"
                  maxlength="19"
                  required
                >
                <div class="card-icons">
                  <span class="card-icon visa" :class="{ 'active': cardType === 'visa' }"></span>
                  <span class="card-icon mastercard" :class="{ 'active': cardType === 'mastercard' }"></span>
                  <span class="card-icon amex" :class="{ 'active': cardType === 'amex' }"></span>
                  <span class="card-icon discover" :class="{ 'active': cardType === 'discover' }"></span>
                </div>
              </div>
              
              <div class="form-group">
                <label for="cardName">Name on Card*</label>
                <input 
                  type="text" 
                  id="cardName" 
                  v-model="paymentInfo.cardName" 
                  placeholder="John Doe"
                  required
                >
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="expiryDate">Expiry Date*</label>
                  <input 
                    type="text" 
                    id="expiryDate" 
                    v-model="paymentInfo.expiryDate" 
                    placeholder="MM/YY"
                    maxlength="5"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="cvv">CVV*</label>
                  <input 
                    type="text" 
                    id="cvv" 
                    v-model="paymentInfo.cvv" 
                    placeholder="XXX"
                    maxlength="4"
                    required
                  >
                  <div class="cvv-info">
                    <span class="info-icon">?</span>
                    <div class="info-tooltip">
                      The CVV is the 3 or 4 digit code on the back of your card
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-group checkbox-group">
                <input 
                  type="checkbox" 
                  id="saveCard" 
                  v-model="paymentInfo.saveCard"
                >
                <label for="saveCard">Save card for future purchases</label>
              </div>
            </div>
            
            <div v-else-if="paymentInfo.method === 'paypal'" class="paypal-info">
              <p>You will be redirected to PayPal to complete your payment.</p>
              <div class="paypal-button">
                <span class="paypal-logo"></span>
                <span>Continue with PayPal</span>
              </div>
            </div>
            
            <div v-else-if="paymentInfo.method === 'apple_pay'" class="digital-wallet-info">
              <p>You will be prompted to complete your payment with Apple Pay.</p>
              <div class="apple-pay-button">
                <span class="apple-pay-logo"></span>
                <span>Pay with Apple Pay</span>
              </div>
            </div>
            
            <div v-else-if="paymentInfo.method === 'google_pay'" class="digital-wallet-info">
              <p>You will be prompted to complete your payment with Google Pay.</p>
              <div class="google-pay-button">
                <span class="google-pay-logo"></span>
                <span>Pay with Google Pay</span>
              </div>
            </div>
            
            <div class="promo-code-section">
              <h3>Promo Code</h3>
              <div class="promo-code-form">
                <input 
                  type="text" 
                  v-model="promoCode" 
                  placeholder="Enter promo code"
                  :disabled="promoApplied"
                >
                <button 
                  class="btn btn-outline" 
                  @click="applyPromoCode"
                  :disabled="!promoCode || promoApplied"
                >
                  {{ promoApplied ? 'Applied' : 'Apply' }}
                </button>
              </div>
              <div v-if="promoError" class="promo-error">{{ promoError }}</div>
              <div v-if="promoApplied" class="promo-success">
                Promo code applied! You saved {{ formatPrice(promoDiscount) }}
              </div>
            </div>
            
            <div class="form-group checkbox-group terms-group">
              <input 
                type="checkbox" 
                id="termsAccepted" 
                v-model="termsAccepted"
                required
              >
              <label for="termsAccepted">
                I agree to the <a href="#terms">Terms and Conditions</a> and <a href="#privacy">Privacy Policy</a>
              </label>
            </div>
          </div>
          
          <div class="checkout-actions">
            <button 
              v-if="currentStep > 1" 
              class="btn btn-outline" 
              @click="prevStep"
            >
              Back
            </button>
            
            <button 
              v-if="currentStep < totalSteps" 
              class="btn btn-primary" 
              @click="nextStep"
              :disabled="!canProceed"
            >
              Continue
            </button>
            
            <button 
              v-else 
              class="btn btn-primary" 
              @click="placeOrder"
              :disabled="!canProceed"
            >
              Place Order
            </button>
          </div>
        </div>
        
        <div class="order-summary">
          <h3 class="summary-title">Order Summary</h3>
          
          <div class="summary-items">
            <template v-if="validCartItems.length > 0">
              <template v-for="(item, index) in validCartItems" :key="`summary-item-${item.id || index}`">
                <div class="summary-item">
                  <div class="item-image">
                    <img :src="item.image || ''" :alt="item.name || 'Product'">
                    <span class="item-quantity">{{ parseInt(item.quantity) || 1 }}</span>
                  </div>
                  <div class="item-details">
                    <h4 class="item-name">{{ item.name || 'Product' }}</h4>
                    <p class="item-price">{{ formatPrice(((item.discountPrice || item.price) || 0) * (parseInt(item.quantity) || 1)) }}</p>
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              <div class="empty-summary">
                <p>No items in cart</p>
              </div>
            </template>
          </div>
          
          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>{{ subtotal }}</span>
            </div>
            <div class="summary-row">
              <span>Tax (10%):</span>
              <span>{{ tax }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span>{{ shipping }}</span>
            </div>
            <div v-if="promoApplied" class="summary-row discount">
              <span>Discount:</span>
              <span>-{{ discount }}</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>{{ total }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-page {
  padding: 4rem 0;
  background-color: #f9f9f9;
}

.checkout-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
}

.checkout-progress {
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.checkout-progress::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all var(--transition-speed);
}

.step-label {
  font-size: 0.9rem;
  color: var(--gray-color);
  transition: color var(--transition-speed);
}

.progress-step.active .step-number {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.progress-step.active .step-label {
  color: var(--primary-color);
  font-weight: 600;
}

.progress-step.completed .step-number {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: white;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;
  align-items: start;
}

.checkout-form {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.step-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.2);
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input {
  width: auto;
  margin-right: 0.5rem;
}

.checkbox-group label {
  margin-bottom: 0;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.payment-method {
  flex: 1;
  min-width: 120px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.payment-method.active {
  border-color: var(--primary-color);
  background-color: rgba(58, 134, 255, 0.05);
}

.payment-method input {
  margin-right: 0.5rem;
}

.payment-method label {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
}

.payment-icon {
  width: 32px;
  height: 24px;
  margin-right: 0.5rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.credit-card-icon::before {
  content: '💳';
}

.paypal-icon::before {
  content: 'P';
  font-weight: bold;
  color: #003087;
}

.apple-pay-icon::before {
  content: 'A';
  font-weight: bold;
}

.google-pay-icon::before {
  content: 'G';
  font-weight: bold;
  color: #4285F4;
}

/* Credit card form */
.credit-card-form {
  margin-top: 1.5rem;
}

.card-preview {
  background: linear-gradient(135deg, #3a86ff, #8338ec);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 2rem;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-preview.visa {
  background: linear-gradient(135deg, #0066b2, #2e8def);
}

.card-preview.mastercard {
  background: linear-gradient(135deg, #eb001b, #f79e1b);
}

.card-preview.amex {
  background: linear-gradient(135deg, #108168, #0066b2);
}

.card-preview.discover {
  background: linear-gradient(135deg, #ff6600, #ffaa00);
}

.card-type-icon {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 60px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
}

.card-number {
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-top: 3rem;
  font-family: monospace;
}

.card-details {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.card-holder {
  text-transform: uppercase;
  font-size: 0.9rem;
}

.card-expiry {
  font-size: 0.9rem;
}

.card-icons {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.card-icon {
  width: 40px;
  height: 25px;
  border-radius: 4px;
  background-color: #f0f0f0;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.card-icon.active {
  opacity: 1;
}

.visa::before {
  content: 'VISA';
  font-size: 10px;
  color: #0066b2;
  font-weight: bold;
}

.mastercard::before {
  content: 'MC';
  font-size: 10px;
  color: #eb001b;
  font-weight: bold;
}

.amex::before {
  content: 'AMEX';
  font-size: 10px;
  color: #108168;
  font-weight: bold;
}

.discover::before {
  content: 'DISC';
  font-size: 10px;
  color: #ff6600;
  font-weight: bold;
}

.cvv-info {
  position: relative;
  display: inline-block;
  margin-left: 0.5rem;
}

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--gray-color);
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.info-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--dark-color);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  width: 200px;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  pointer-events: none;
  z-index: 10;
}

.info-icon:hover + .info-tooltip {
  opacity: 1;
  visibility: visible;
}

/* Digital wallet buttons */
.paypal-button,
.apple-pay-button,
.google-pay-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-top: 1rem;
  cursor: pointer;
  font-weight: 600;
}

.paypal-button {
  background-color: #ffc439;
  color: #003087;
}

.apple-pay-button {
  background-color: #000;
  color: #fff;
}

.google-pay-button {
  background-color: #fff;
  color: #000;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.paypal-logo::before {
  content: 'PayPal';
  font-weight: bold;
  margin-right: 0.5rem;
}

.apple-pay-logo::before {
  content: 'Apple';
  margin-right: 0.5rem;
}

.google-pay-logo::before {
  content: 'G';
  color: #4285F4;
  margin-right: 0.5rem;
}

/* Promo code section */
.promo-code-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: var(--border-radius);
}

.promo-code-form {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.promo-code-form input {
  flex: 1;
}

.promo-error {
  color: var(--error-color);
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

.promo-success {
  color: var(--success-color);
  margin-top: 0.5rem;
  font-size: 0.85rem;
}

/* Discount row in summary */
.summary-row.discount {
  color: var(--success-color);
  font-weight: 600;
}

.order-summary {
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 100px;
}

.summary-title {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0;
  font-size: 1.2rem;
}

.summary-items {
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
}

.summary-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.summary-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-right: 1rem;
  position: relative;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-quantity {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary-color);
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 0.95rem;
  margin: 0 0 0.25rem;
}

.item-price {
  color: var(--primary-color);
  font-weight: 600;
  margin: 0;
  font-size: 0.9rem;
}

.summary-totals {
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

@media (max-width: 992px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }
  
  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkout-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .checkout-actions button {
    width: 100%;
  }
}
</style>
