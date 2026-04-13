// Beavercreek Lures - Master Page (Site-wide)
// Navigation, announcement banner, and global interactions

import wixWindow from 'wix-window';

$w.onReady(function () {
    // ======================
    // ANNOUNCEMENT BANNER
    // ======================
    
    if ($w('#announcementBanner')) {
        // Close button functionality
        if ($w('#closeBannerButton')) {
            $w('#closeBannerButton').onClick(() => {
                $w('#announcementBanner').collapse();
                // Store in session storage so it doesn't reappear
                wixWindow.sessionStorage.setItem('bannerClosed', 'true');
            });
        }
        
        // Check if banner was previously closed
        wixWindow.sessionStorage.getItem('bannerClosed')
            .then((value) => {
                if (value === 'true') {
                    $w('#announcementBanner').collapse();
                }
            });
        
        // Auto-hide after 10 seconds (optional)
        setTimeout(() => {
            if ($w('#announcementBanner').collapsed === false) {
                $w('#announcementBanner').hide('SlideUp', {duration: 500});
            }
        }, 10000);
    }
    
    // ======================
    // STICKY HEADER
    // ======================
    
    if ($w('#header')) {
        let lastScrollY = 0;
        
        wixWindow.onScroll(() => {
            const currentScrollY = wixWindow.scrollY;
            
            // Hide header on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide header
                $w('#header').collapse();
            } else {
                // Scrolling up - show header
                $w('#header').expand();
            }
            
            // Add dark background when scrolled
            if (currentScrollY > 50) {
                $w('#header').style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
                $w('#header').style.borderBottomColor = '#097D07';
            } else {
                $w('#header').style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                $w('#header').style.borderBottomColor = 'transparent';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ======================
    // NAVIGATION MENU
    // ======================
    
    // Mobile menu toggle
    if ($w('#menuButton') && $w('#mobileMenu')) {
        $w('#menuButton').onClick(() => {
            if ($w('#mobileMenu').collapsed) {
                $w('#mobileMenu').expand();
                $w('#menuButton').icon = 'close'; // Change to X icon
            } else {
                $w('#mobileMenu').collapse();
                $w('#menuButton').icon = 'menu'; // Change back to hamburger
            }
        });
    }
    
    // Navigation link hover effects
    const navLinks = ['#navHome', '#navShop', '#navAbout', '#navContact'];
    
    navLinks.forEach((linkId) => {
        if ($w(linkId)) {
            $w(linkId).onMouseIn(() => {
                $w(linkId).style.color = '#097D07';
                $w(linkId).style.fontWeight = '700';
            });
            
            $w(linkId).onMouseOut(() => {
                $w(linkId).style.color = '#FFFFFF';
                $w(linkId).style.fontWeight = '400';
            });
        }
    });
    
    // ======================
    // CART ICON
    // ======================
    
    if ($w('#cartIcon')) {
        // Add pulse animation when items added
        $w('#cartIcon').onClick(() => {
            wixWindow.openLightbox('Cart');
        });
        
        // Cart badge update (listen for cart changes)
        // This requires Wix Stores API integration
    }
    
    // ======================
    // BACK TO TOP BUTTON
    // ======================
    
    if ($w('#backToTopButton')) {
        // Hide initially
        $w('#backToTopButton').hide();
        
        wixWindow.onScroll(() => {
            if (wixWindow.scrollY > 500) {
                if (!$w('#backToTopButton').isVisible) {
                    $w('#backToTopButton').show('FadeIn');
                }
            } else {
                if ($w('#backToTopButton').isVisible) {
                    $w('#backToTopButton').hide('FadeOut');
                }
            }
        });
        
        $w('#backToTopButton').onClick(() => {
            wixWindow.scrollTo(0, 0, {duration: 800});
        });
        
        // Hover effect
        $w('#backToTopButton').onMouseIn(() => {
            $w('#backToTopButton').style.backgroundColor = '#097D07';
            $w('#backToTopButton').style.color = '#000000';
        });
        
        $w('#backToTopButton').onMouseOut(() => {
            $w('#backToTopButton').style.backgroundColor = 'rgba(9, 125, 7, 0.2)';
            $w('#backToTopButton').style.color = '#097D07';
        });
    }
    
    // ======================
    // FOOTER SOCIAL LINKS
    // ======================
    
    const socialIcons = ['#facebookIcon', '#instagramIcon', '#tiktokIcon'];
    
    socialIcons.forEach((iconId) => {
        if ($w(iconId)) {
            $w(iconId).onMouseIn(() => {
                $w(iconId).style.opacity = 1;
                $w(iconId).style.filter = 'drop-shadow(0 0 10px #097D07)';
            });
            
            $w(iconId).onMouseOut(() => {
                $w(iconId).style.opacity = 0.7;
                $w(iconId).style.filter = 'none';
            });
        }
    });
    
    // ======================
    // LOADING OVERLAY
    // ======================
    
    // Hide loading screen when page is ready
    if ($w('#loadingOverlay')) {
        setTimeout(() => {
            $w('#loadingOverlay').hide('FadeOut', {duration: 500});
        }, 500);
    }
});
