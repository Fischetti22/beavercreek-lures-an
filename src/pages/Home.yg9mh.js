// Beavercreek Lures - Homepage Velo Code
// Dark, aggressive fishing brand with neon green accents

import wixWindow from 'wix-window';
import wixAnimations from 'wix-animations';

$w.onReady(function () {
    // ======================
    // HERO SECTION
    // ======================
    
    // Hero CTA Button - Neon green glow effect on hover
    if ($w('#heroButton')) {
        $w('#heroButton').onMouseIn(() => {
            $w('#heroButton').style.backgroundColor = '#097D07';
            $w('#heroButton').style.color = '#000000';
        });
        
        $w('#heroButton').onMouseOut(() => {
            $w('#heroButton').style.backgroundColor = 'rgba(9, 125, 7, 0.1)';
            $w('#heroButton').style.color = '#097D07';
        });
        
        $w('#heroButton').onClick(() => {
            wixWindow.scrollTo(0, $w('#lureCollectionSection').scrollY - 100);
        });
    }
    
    // Hero headline fade-in animation
    if ($w('#heroHeadline')) {
        $w('#heroHeadline').hide();
        setTimeout(() => {
            $w('#heroHeadline').show('FadeIn', {duration: 1000});
        }, 300);
    }
    
    // ======================
    // LURE COLLECTION GRID
    // ======================
    
    // Lure cards hover effects (assuming cards named: #lureCard1 through #lureCard6)
    const lureCards = ['#lureCard1', '#lureCard2', '#lureCard3', '#lureCard4', '#lureCard5', '#lureCard6'];
    
    lureCards.forEach((cardId) => {
        if ($w(cardId)) {
            // Add hover scale effect
            $w(cardId).onMouseIn(() => {
                wixAnimations.timeline()
                    .add($w(cardId), {scale: 1.05, duration: 300})
                    .play();
                
                // Add neon green border glow
                if ($w(cardId + 'Border')) {
                    $w(cardId + 'Border').style.borderColor = '#097D07';
                    $w(cardId + 'Border').style.borderWidth = '2px';
                }
            });
            
            $w(cardId).onMouseOut(() => {
                wixAnimations.timeline()
                    .add($w(cardId), {scale: 1, duration: 300})
                    .play();
                
                if ($w(cardId + 'Border')) {
                    $w(cardId + 'Border').style.borderColor = 'rgba(9, 125, 7, 0.3)';
                    $w(cardId + 'Border').style.borderWidth = '1px';
                }
            });
            
            // Click to navigate to product page
            $w(cardId).onClick(() => {
                // Replace with actual product page URLs
                const productUrls = {
                    '#lureCard1': '/product/big-back',
                    '#lureCard2': '/product/kill-switch',
                    '#lureCard3': '/product/meadow-mouse',
                    '#lureCard4': '/product/riot-toad',
                    '#lureCard5': '/product/toxic-toad',
                    '#lureCard6': '/product/slip-fang'
                };
                
                if (productUrls[cardId]) {
                    wixWindow.openLightbox("Product Quick View", {productUrl: productUrls[cardId]});
                }
            });
        }
    });
    
    // ======================
    // CATCH GALLERY
    // ======================
    
    // Auto-scrolling catch photo gallery
    if ($w('#catchGallery')) {
        let galleryIndex = 0;
        const galleryImages = $w('#catchGallery').images; // Assuming gallery repeater
        
        // Auto-rotate every 4 seconds
        setInterval(() => {
            if (galleryImages && galleryImages.length > 0) {
                galleryIndex = (galleryIndex + 1) % galleryImages.length;
                $w('#catchGallery').currentIndex = galleryIndex;
            }
        }, 4000);
        
        // Pause on hover
        $w('#catchGallery').onMouseIn(() => {
            clearInterval();
        });
    }
    
    // Alternative: Horizontal scrolling strip
    if ($w('#catchStrip')) {
        let scrollPosition = 0;
        const scrollSpeed = 1; // pixels per frame
        
        const autoScroll = setInterval(() => {
            scrollPosition += scrollSpeed;
            if (scrollPosition >= $w('#catchStrip').scrollWidth) {
                scrollPosition = 0;
            }
            $w('#catchStrip').scrollTo(scrollPosition);
        }, 30);
        
        $w('#catchStrip').onMouseIn(() => {
            clearInterval(autoScroll);
        });
    }
    
    // ======================
    // SCROLL ANIMATIONS
    // ======================
    
    // Fade-in elements as they enter viewport
    const animateOnScroll = (elementId, animationType = 'FadeIn') => {
        if ($w(elementId)) {
            $w(elementId).hide();
            
            wixWindow.onScroll(() => {
                const scrollY = wixWindow.scrollY;
                const elementY = $w(elementId).scrollY;
                const viewportHeight = wixWindow.viewportSize.height;
                
                if (scrollY + viewportHeight > elementY + 100 && !$w(elementId).isVisible) {
                    $w(elementId).show(animationType, {duration: 800});
                }
            });
        }
    };
    
    // Apply scroll animations to key sections
    animateOnScroll('#lureCollectionSection', 'SlideInFromBottom');
    animateOnScroll('#catchGallerySection', 'FadeIn');
    animateOnScroll('#brandStorySection', 'SlideInFromLeft');
    
    // ======================
    // BRAND STORY SECTION
    // ======================
    
    if ($w('#brandStoryText')) {
        // Typing effect for brand story (optional)
        const brandText = "BUILT FOR THE HUNT. DESIGNED FOR THE KILL.";
        let charIndex = 0;
        
        $w('#brandStoryText').text = '';
        
        const typeWriter = setInterval(() => {
            if (charIndex < brandText.length) {
                $w('#brandStoryText').text += brandText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeWriter);
            }
        }, 50);
    }
    
    // ======================
    // NEWSLETTER SIGNUP
    // ======================
    
    if ($w('#newsletterButton')) {
        $w('#newsletterButton').onClick(() => {
            const email = $w('#emailInput').value;
            
            if (email && email.includes('@')) {
                // Add to mailing list (integrate with Wix CRM or email service)
                $w('#newsletterButton').label = 'SUBSCRIBED';
                $w('#newsletterButton').disable();
                $w('#emailInput').value = '';
                
                // Success message
                if ($w('#successMessage')) {
                    $w('#successMessage').show('FadeIn');
                    setTimeout(() => {
                        $w('#successMessage').hide('FadeOut');
                    }, 3000);
                }
            } else {
                // Error state
                $w('#emailInput').style.borderColor = '#FF0000';
            }
        });
    }
});
