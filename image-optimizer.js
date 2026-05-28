// Image Optimizer with WebP Support and Lazy Loading
// Optimizes images for better performance

class ImageOptimizer {
  constructor() {
    this.observer = null;
    this.loadedImages = new Set();
    this.imageCache = new Map();
    this.supportsWebP = this.checkWebPSupport();
    this.supportsLazyLoading = 'loading' in HTMLImageElement.prototype;
    
    this.initializeOptimizer();
  }

  // Initialize optimizer
  initializeOptimizer() {
    // Set up lazy loading observer
    this.setupIntersectionObserver();
    
    // Add optimization styles
    this.addOptimizationStyles();
    
    // Optimize existing images
    this.optimizeExistingImages();
  }

  // Check WebP support
  checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Set up intersection observer for lazy loading
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
            return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
  }

  // Add optimization styles
  addOptimizationStyles() {
    if (document.getElementById('image-optimizer-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'image-optimizer-styles';
    styles.textContent = `
      .lazy-image {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      }
      
      .lazy-image.loaded {
        opacity: 1;
      }
      
      .lazy-image.loading {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      .image-optimized {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
      }
      
      .image-container {
        position: relative;
        overflow: hidden;
      }
      
      .image-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--card);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-dim);
        font-size: 12px;
        z-index: 1;
      }
      
      .webp-badge {
        position: absolute;
        top: 4px;
        right: 4px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 9px;
        padding: 2px 4px;
        border-radius: 2px;
        z-index: 2;
      }
    `;
    document.head.appendChild(styles);
  }

  // Optimize existing images
  optimizeExistingImages() {
    const images = document.querySelectorAll('img:not([data-optimized])');
    images.forEach(img => this.optimizeImage(img));
  }

  // Optimize single image
  optimizeImage(img) {
    if (img.dataset.optimized) return;
    
    img.dataset.optimized = 'true';
    
    // Create container for placeholder
    const container = document.createElement('div');
    container.className = 'image-container';
    img.parentNode.insertBefore(container, img);
    container.appendChild(img);
    
    // Add placeholder
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = this.getPlaceholderHTML(img);
    container.appendChild(placeholder);
    
    // Add lazy loading classes
    img.classList.add('lazy-image');
    
    // Set up WebP source
    if (this.supportsWebP && img.dataset.webpSrc) {
      img.dataset.src = img.dataset.webpSrc;
    }
    
    // Set up lazy loading
    if (this.supportsLazyLoading) {
      img.loading = 'lazy';
    } else {
      this.observer.observe(img);
    }
    
    // Add load event handler
    img.addEventListener('load', () => this.onImageLoad(img));
    img.addEventListener('error', () => this.onImageError(img));
  }

  // Get placeholder HTML
  getPlaceholderHTML(img) {
    const width = img.width || 300;
    const height = img.height || 200;
    const icon = this.getPlaceholderIcon(img.alt || 'Image');
    
    return `
      <div style="width: ${width}px; height: ${height}px;">
        <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
          <div style="text-align: center;">
            <div style="font-size: 24px; margin-bottom: 8px;">${icon}</div>
            <div style="font-size: 11px; color: var(--text-dim);">Loading...</div>
          </div>
        </div>
      </div>
    `;
  }

  // Get placeholder icon
  getPlaceholderIcon(alt) {
    const iconMap = {
      'category': '📂',
      'game': '🎮',
      'player': '👤',
      'icon': '⭐',
      'logo': '🏆'
    };
    
    for (const [key, icon] of Object.entries(iconMap)) {
      if (alt.toLowerCase().includes(key)) {
        return icon;
      }
    }
    
    return '🖼️';
  }

  // Load image
  async loadImage(img) {
    if (this.loadedImages.has(img)) return;
    
    img.classList.add('loading');
    
    try {
      // Try WebP first if supported
      let imageSrc = img.src;
      if (this.supportsWebP && img.dataset.webpSrc) {
        imageSrc = img.dataset.webpSrc;
      }
      
      // Preload image
      const preloadImg = new Image();
      preloadImg.src = imageSrc;
      
      await new Promise((resolve, reject) => {
        preloadImg.onload = resolve;
        preloadImg.onerror = reject;
      });
      
      // Set actual source and show image
      img.src = imageSrc;
      img.classList.remove('loading');
      img.classList.add('loaded', 'image-optimized');
      
      // Add WebP badge if applicable
      if (this.supportsWebP && img.dataset.webpSrc) {
        this.addWebPBadge(img);
      }
      
      // Remove placeholder
      const placeholder = img.parentElement.querySelector('.image-placeholder');
      if (placeholder) {
        placeholder.style.opacity = '0';
        setTimeout(() => placeholder.remove(), 300);
      }
      
      this.loadedImages.add(img);
      this.imageCache.set(imageSrc, preloadImg);
      
    } catch (error) {
      this.onImageError(img);
    }
  }

  // Add WebP badge
  addWebPBadge(img) {
    const badge = document.createElement('div');
    badge.className = 'webp-badge';
    badge.textContent = 'WebP';
    img.parentElement.appendChild(badge);
  }

  // Handle image load
  onImageLoad(img) {
    img.classList.remove('loading');
    img.classList.add('loaded');
    
    // Remove placeholder
    const placeholder = img.parentElement.querySelector('.image-placeholder');
    if (placeholder) {
      placeholder.style.opacity = '0';
      setTimeout(() => placeholder.remove(), 300);
    }
  }

  // Handle image error
  onImageError(img) {
    img.classList.remove('loading');
    img.classList.add('error');
    
    // Show error placeholder
    const placeholder = img.parentElement.querySelector('.image-placeholder');
    if (placeholder) {
      placeholder.innerHTML = `
        <div style="text-align: center; color: var(--red);">
          <div style="font-size: 24px; margin-bottom: 8px;">❌</div>
          <div style="font-size: 11px;">Failed to load</div>
        </div>
      `;
    }
  }

  // Convert image to WebP (client-side)
  async convertToWebP(img) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        const webpUrl = URL.createObjectURL(blob);
        resolve(webpUrl);
      }, 'image/webp', 0.8);
    });
  }

  // Get optimal image format
  getOptimalFormat() {
    if (this.supportsWebP) {
      return 'webp';
    }
    return this.getBestFallbackFormat();
  }

  // Get best fallback format
  getBestFallbackFormat() {
    const canvas = document.createElement('canvas');
    const formats = ['image/webp', 'image/jpeg', 'image/png'];
    
    for (const format of formats) {
      try {
        const dataUrl = canvas.toDataURL(format);
        if (dataUrl.indexOf(`data:${format}`) === 0) {
          return format.split('/')[1];
        }
      } catch (e) {
        continue;
      }
    }
    
    return 'png';
  }

  // Optimize image for current connection
  optimizeForConnection() {
    if (!navigator.connection) return;
    
    const connection = navigator.connection;
    const quality = this.getQualityFromConnection(connection);
    
    // Adjust image quality based on connection
    document.documentElement.style.setProperty('--image-quality', quality);
  }

  // Get quality from connection
  getQualityFromConnection(connection) {
    if (!connection.effectiveType) return 'high';
    
    switch (connection.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 'low';
      case '3g':
        return 'medium';
      case '4g':
        return 'high';
      default:
        return 'medium';
    }
  }

  // Get optimization statistics
  getOptimizationStats() {
    return {
      totalImages: document.querySelectorAll('img').length,
      optimizedImages: this.loadedImages.size,
      webpSupported: this.supportsWebP,
      lazyLoadingSupported: this.supportsLazyLoading,
      cachedImages: this.imageCache.size
    };
  }

  // Clear cache
  clearCache() {
    this.imageCache.clear();
    this.loadedImages.clear();
  }

  // Optimize all images on page
  optimizeAllImages() {
    const images = document.querySelectorAll('img:not([data-optimized])');
    images.forEach(img => this.optimizeImage(img));
  }

  // Destroy optimizer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.clearCache();
  }
}

// Global instance
window.imageOptimizer = new ImageOptimizer();

// Auto-optimize new images
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const images = node.querySelectorAll ? node.querySelectorAll('img:not([data-optimized])') : [];
        images.forEach(img => window.imageOptimizer.optimizeImage(img));
        
        // Check if the node itself is an image
        if (node.tagName === 'IMG' && !node.dataset.optimized) {
          window.imageOptimizer.optimizeImage(node);
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

