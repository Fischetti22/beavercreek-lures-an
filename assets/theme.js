// Beavercreek Lures Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('🎣 Beavercreek Lures Theme Loaded');
  
  // Add product card class for hover effects
  const productCards = document.querySelectorAll('a[href*="/products/"]');
  productCards.forEach(card => {
    card.classList.add('product-card');
  });
});
