// Performance Optimizer for Bundle Size and Load Times
// Monitors and optimizes website performance

class PerformanceOptimizer {
  constructor() {
    this.metrics = new Map();
    this.startTime = performance.now();
    this.observers = new Map();
    this.bundleSizes = new Map();
    
    this.initializeOptimizer();
  }

  // Initialize performance optimizer
  initializeOptimizer() {
    // Monitor page load performance
    this.monitorPageLoad();
    
    // Monitor resource loading
    this.monitorResourceLoading();
    
    // Monitor bundle sizes
    this.monitorBundleSizes();
    
    // Optimize based on device capabilities
    this.optimizeForDevice();
    
    // Add performance styles
    this.addPerformanceStyles();
  }

  // Monitor page load performance
  monitorPageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime;
      this.recordMetric('pageLoadTime', loadTime);
      
      // Get navigation timing
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.recordMetric('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
        this.recordMetric('firstPaint', navigation.responseStart - navigation.requestStart);
        this.recordMetric('firstContentfulPaint', this.getFirstContentfulPaint());
      }
      
      this.logPerformanceSummary();
    });
  }

  // Monitor resource loading
  monitorResourceLoading() {
    if (!('PerformanceObserver' in window)) return;
    
    // Monitor resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.entryType === 'resource') {
          this.recordMetric(`resource_${entry.name}`, {
            size: entry.transferSize,
            loadTime: entry.duration,
            type: this.getResourceType(entry.name)
          });
        }
      });
    });
    
    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.set('resource', resourceObserver);
  }

  // Monitor bundle sizes
  monitorBundleSizes() {
    // Monitor script sizes
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      this.measureResourceSize(script.src, 'script');
    });
    
    // Monitor style sizes
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    styles.forEach(style => {
      this.measureResourceSize(style.href, 'stylesheet');
    });
  }

  // Measure resource size
  async measureResourceSize(url, type) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const size = parseInt(response.headers.get('content-length') || '0');
      this.bundleSizes.set(url, { size, type });
      this.recordMetric(`bundleSize_${type}`, size);
    } catch (error) {
      console.warn(`Could not measure size for ${url}:`, error);
    }
  }

  // Get first contentful paint
  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  // Get resource type
  getResourceType(url) {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.webp')) return 'image';
    return 'other';
  }

  // Optimize for device
  optimizeForDevice() {
    const deviceInfo = this.getDeviceInfo();
    
    // Adjust performance settings based on device
    if (deviceInfo.isLowEnd) {
      this.enableLowEndMode();
    } else if (deviceInfo.isMobile) {
      this.enableMobileOptimizations();
    } else {
      this.enableDesktopOptimizations();
    }
    
    // Optimize for connection
    this.optimizeForConnection();
  }

  // Get device information
  getDeviceInfo() {
    const connection = navigator.connection || {};
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    
    return {
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isLowEnd: memory < 2 || cores < 4 || connection.effectiveType === '2g',
      memory: memory,
      cores: cores,
      connection: connection.effectiveType || 'unknown'
    };
  }

  // Enable low-end mode
  enableLowEndMode() {
    document.documentElement.setAttribute('data-performance', 'low');
    
    // Disable animations
    document.documentElement.style.setProperty('--animation-duration', '0s');
    
    // Reduce quality
    document.documentElement.style.setProperty('--quality', 'low');
    
  }

  // Enable mobile optimizations
  enableMobileOptimizations() {
    document.documentElement.setAttribute('data-performance', 'mobile');
    
    // Optimize touch interactions
    this.optimizeTouchInteractions();
    
    // Reduce motion
    this.reduceMotion();
    
  }

  // Enable desktop optimizations
  enableDesktopOptimizations() {
    document.documentElement.setAttribute('data-performance', 'desktop');
    
    // Enable hover states
    this.optimizeHoverStates();
  }

  // Optimize for connection
  optimizeForConnection() {
    if (!navigator.connection) return;
    
    const connection = navigator.connection;
    const downlink = connection.downlink || 1;
    
    // Adjust loading strategy based on connection speed
    if (downlink < 0.5) {
      // Slow connection - reduce quality
      document.documentElement.style.setProperty('--connection-speed', 'slow');
      this.enableAggressiveOptimizations();
    } else if (downlink < 2) {
      // Medium connection
      document.documentElement.style.setProperty('--connection-speed', 'medium');
      this.enableModerateOptimizations();
    } else {
      // Fast connection
      document.documentElement.style.setProperty('--connection-speed', 'fast');
    }
  }

  // Enable aggressive optimizations
  enableAggressiveOptimizations() {
    // Disable all non-essential animations
    document.querySelectorAll('[data-optional-animation]').forEach(el => {
      el.style.animation = 'none';
    });
    
    // Reduce image quality
    document.documentElement.style.setProperty('--image-quality', '0.5');
    
    // Lazy load everything
    if (window.imageOptimizer) {
      window.imageOptimizer.optimizeAllImages();
    }
  }

  // Enable moderate optimizations
  enableModerateOptimizations() {
    // Reduce animation duration
    document.documentElement.style.setProperty('--animation-duration-multiplier', '0.7');
    
    // Slightly reduce image quality
    document.documentElement.style.setProperty('--image-quality', '0.8');
  }

  // Optimize touch interactions
  optimizeTouchInteractions() {
    // Add touch-friendly styles
    const style = document.createElement('style');
    style.textContent = `
      @media (pointer: coarse) {
        button, .btn-primary, .btn-secondary {
          min-height: 48px;
          min-width: 48px;
          font-size: 16px;
        }
        
        .category-item {
          min-height: 60px;
          padding: 12px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Reduce motion
  reduceMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    }
  }

  // Optimize hover states
  optimizeHoverStates() {
    // Add hover-friendly styles
    const style = document.createElement('style');
    style.textContent = `
      @media (hover: hover) {
        button:hover, .btn-primary:hover, .btn-secondary:hover {
          transform: translateY(-2px);
          transition: transform 0.2s ease;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add performance styles
  addPerformanceStyles() {
    const style = document.createElement('style');
    style.id = 'performance-styles';
    style.textContent = `
      /* Performance optimizations */
      html {
        --animation-duration: 0.3s;
        --animation-duration-multiplier: 1;
        --image-quality: 1;
        --connection-speed: fast;
      }
      
      /* Low-end mode optimizations */
      [data-performance="low"] {
        --animation-duration: 0s;
        --image-quality: 0.6;
      }
      
      /* Mobile optimizations */
      [data-performance="mobile"] {
        --animation-duration-multiplier: 0.8;
      }
      
      /* Connection-based optimizations */
      [data-connection-speed="slow"] {
        --image-quality: 0.5;
        --animation-duration-multiplier: 0.5;
      }
      
      [data-connection-speed="medium"] {
        --image-quality: 0.8;
        --animation-duration-multiplier: 0.8;
      }
      
      /* Critical CSS inlining */
      .critical-above-fold {
        contain: layout style paint;
      }
      
      /* Optimize images */
      img {
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }
      
      /* Optimize animations */
      * {
        animation-duration: calc(var(--animation-duration) * var(--animation-duration-multiplier));
      }
    `;
    document.head.appendChild(style);
  }

  // Record performance metric
  recordMetric(name, value) {
    this.metrics.set(name, {
      value: value,
      timestamp: Date.now()
    });
  }

  // Get performance metrics
  getMetrics() {
    const result = {};
    for (const [name, data] of this.metrics) {
      result[name] = data.value;
    }
    return result;
  }

  // Get bundle size information
  getBundleSizes() {
    const result = {};
    let totalSize = 0;
    
    for (const [url, data] of this.bundleSizes) {
      result[url] = data;
      totalSize += data.size;
    }
    
    result.total = totalSize;
    return result;
  }

  // Log performance summary
  logPerformanceSummary() {
    const metrics = this.getMetrics();
    const bundleSizes = this.getBundleSizes();
    
      }

  // Get performance score
  getPerformanceScore() {
    const metrics = this.getMetrics();
    let score = 100;
    
    // Penalize slow load times
    if (metrics.pageLoadTime > 3000) score -= 20;
    else if (metrics.pageLoadTime > 2000) score -= 10;
    else if (metrics.pageLoadTime > 1000) score -= 5;
    
    // Penalize large bundle sizes
    const bundleSizes = this.getBundleSizes();
    if (bundleSizes.total > 500000) score -= 15; // > 500KB
    else if (bundleSizes.total > 300000) score -= 10; // > 300KB
    else if (bundleSizes.total > 200000) score -= 5; // > 200KB
    
    return Math.max(0, score);
  }

  // Optimize critical resources
  optimizeCriticalResources() {
    // Inline critical CSS
    this.inlineCriticalCSS();
    
    // Preload critical resources
    this.preloadCriticalResources();
    
    // Defer non-critical resources
    this.deferNonCriticalResources();
  }

  // Inline critical CSS
  inlineCriticalCSS() {
    const criticalCSS = `
      body { margin: 0; padding: 0; box-sizing: border-box; }
      .container { max-width: 800px; margin: 0 auto; }
    `;
    
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalResources = [
      './manifest.json',
      './icons/icon-192.png',
      './icons/icon-512.png'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = resource.includes('.png') ? 'image' : 'fetch';
      document.head.appendChild(link);
    });
  }

  // Defer non-critical resources
  deferNonCriticalResources() {
    const scripts = document.querySelectorAll('script[src]:not([data-critical])');
    scripts.forEach(script => {
      script.defer = true;
    });
  }

  // Monitor performance over time
  startPerformanceMonitoring() {
    setInterval(() => {
      this.checkPerformanceDegradation();
    }, 30000); // Check every 30 seconds
  }

  // Check for performance degradation
  checkPerformanceDegradation() {
    const currentMetrics = this.getMetrics();
    const score = this.getPerformanceScore();
    
    if (score < 50) {
      this.enableAggressiveOptimizations();
    }
  }

  // Generate performance report
  generatePerformanceReport() {
    const metrics = this.getMetrics();
    const bundleSizes = this.getBundleSizes();
    const score = this.getPerformanceScore();
    
    return {
      score,
      metrics,
      bundleSizes,
      recommendations: this.getRecommendations(score, metrics)
    };
  }

  // Get optimization recommendations
  getRecommendations(score, metrics) {
    const recommendations = [];
    
    if (metrics.pageLoadTime > 3000) {
      recommendations.push('Consider lazy loading more resources');
    }
    
    const bundleSizes = this.getBundleSizes();
    if (bundleSizes.total > 300000) {
      recommendations.push('Consider code splitting to reduce bundle size');
    }
    
    if (score < 70) {
      recommendations.push('Enable performance monitoring in production');
    }
    
    return recommendations;
  }
}

// Global instance
window.performanceOptimizer = new PerformanceOptimizer();

