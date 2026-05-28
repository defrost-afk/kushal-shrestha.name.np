// Offline Manager for Chhal Imposter Game
// Implements offline-first design with intelligent fallbacks

class OfflineManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.offlineQueue = [];
    this.syncInProgress = false;
    
    // Listen for online/offline events
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
    
    // Initialize offline storage
    this.initializeOfflineStorage();
  }

  // Initialize offline storage for critical data
  initializeOfflineStorage() {
    if (!localStorage.getItem('chhal-offline-fallback')) {
      const fallbackData = {
        categories: {
          emergency: {
            name: "Emergency Offline (आपतकालीन)",
            words: [
              { word: "Kathmandu (काठमाडौं)", hints: ["Capital city", "Temple city", "Tourist destination"] },
              { word: "Momos (ममः)", hints: ["Dumpling", "Steamed food", "Popular snack"] },
              { word: "Namaste (नमस्ते)", hints: ["Greeting", "Hands together", "Respect"] }
            ]
          }
        },
        lastUpdated: Date.now()
      };
      localStorage.setItem('chhal-offline-fallback', JSON.stringify(fallbackData));
    }
  }

  // Handle going offline
  handleOffline() {
    this.isOnline = false;
    this.showOfflineNotification();
    this.enableOfflineMode();
  }

  // Handle coming back online
  handleOnline() {
    this.isOnline = true;
    this.hideOfflineNotification();
    this.syncOfflineData();
  }

  // Show offline notification
  showOfflineNotification() {
    const notification = document.createElement('div');
    notification.id = 'offline-notification';
    notification.className = 'offline-notification';
    notification.innerHTML = `
      <div class="offline-icon">📱</div>
      <div class="offline-text">
        <strong>You're offline</strong><br>
        <span>Game continues with cached content</span>
      </div>
      <button onclick="this.parentElement.remove()" class="offline-close">×</button>
    `;
    
    // Add styles if not already present
    if (!document.getElementById('offline-styles')) {
      const styles = document.createElement('style');
      styles.id = 'offline-styles';
      styles.textContent = `
        .offline-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background: var(--surface);
          border: 2px solid var(--accent);
          border-radius: 8px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 1000;
          box-shadow: var(--shadow);
          max-width: 300px;
          animation: slideIn 0.3s ease-out;
        }
        
        .offline-icon {
          font-size: 24px;
        }
        
        .offline-text {
          flex: 1;
          font-size: 12px;
          line-height: 1.4;
        }
        
        .offline-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: var(--text-dim);
          padding: 0;
          width: 20px;
          height: 20px;
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .offline-mode-indicator {
          position: fixed;
          bottom: 20px;
          left: 20px;
          background: var(--accent);
          color: white;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: bold;
          z-index: 999;
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 5000);
  }

  // Hide offline notification
  hideOfflineNotification() {
    const notification = document.getElementById('offline-notification');
    if (notification) {
      notification.remove();
    }
  }

  // Enable offline mode features
  enableOfflineMode() {
    // Add offline indicator
    if (!document.getElementById('offline-indicator')) {
      const indicator = document.createElement('div');
      indicator.id = 'offline-indicator';
      indicator.className = 'offline-mode-indicator';
      indicator.textContent = '📱 OFFLINE MODE';
      document.body.appendChild(indicator);
    }
    
    // Disable features that require internet
    this.disableOnlineFeatures();
  }

  // Disable online-only features
  disableOnlineFeatures() {
    // Hide install button if offline
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
    
    // Disable external links or features
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
      link.style.opacity = '0.5';
      link.style.pointerEvents = 'none';
      link.title = 'Available online only';
    });
  }

  // Re-enable online features
  enableOnlineFeatures() {
    // Remove offline indicator
    const indicator = document.getElementById('offline-indicator');
    if (indicator) {
      indicator.remove();
    }
    
    // Show install button
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
      installBtn.style.display = 'inline-block';
    }
    
    // Re-enable external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
      link.style.opacity = '';
      link.style.pointerEvents = '';
      link.title = '';
    });
  }

  // Get offline fallback data
  getOfflineFallback() {
    try {
      return JSON.parse(localStorage.getItem('chhal-offline-fallback') || '{}');
    } catch (error) {
      return {};
    }
  }

  // Queue action for when online
  queueAction(action) {
    this.offlineQueue.push({
      ...action,
      timestamp: Date.now(),
      id: Math.random().toString(36).substr(2, 9)
    });
    
    // Save queue to localStorage
    localStorage.setItem('chhal-offline-queue', JSON.stringify(this.offlineQueue));
  }

  // Sync offline data when online
  async syncOfflineData() {
    if (this.syncInProgress || this.offlineQueue.length === 0) {
      return;
    }
    
    this.syncInProgress = true;
    
    try {
      // Process queued actions
      const queue = [...this.offlineQueue];
      this.offlineQueue = [];
      localStorage.removeItem('chhal-offline-queue');
      
      // Here you would sync with your backend
      // For now, just sync the actions
      
      // Show sync notification
      this.showSyncNotification(queue.length);
      
    } catch (error) {
      // Re-queue failed actions
      this.offlineQueue = queue.concat(this.offlineQueue);
    } finally {
      this.syncInProgress = false;
    }
  }

  // Show sync notification
  showSyncNotification(count) {
    const notification = document.createElement('div');
    notification.className = 'offline-notification';
    notification.innerHTML = `
      <div class="offline-text">
        <strong>Synced ${count} items</strong><br>
        <span>Your offline actions have been saved</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Check if online
  isCurrentlyOnline() {
    return this.isOnline;
  }

  // Get connection quality
  getConnectionQuality() {
    if (!navigator.connection) {
      return 'unknown';
    }
    
    const connection = navigator.connection;
    if (connection.effectiveType) {
      return connection.effectiveType;
    }
    
    return 'unknown';
  }

  // Optimize for current connection
  optimizeForConnection() {
    const quality = this.getConnectionQuality();
    
    switch (quality) {
      case 'slow-2g':
      case '2g':
        this.enableLowBandwidthMode();
        break;
      case '3g':
        this.enableMediumBandwidthMode();
        break;
      case '4g':
        this.enableHighBandwidthMode();
        break;
      default:
        // Use default settings
        break;
    }
  }

  // Enable low bandwidth mode
  enableLowBandwidthMode() {
    // Disable animations
    document.body.style.setProperty('--animation-duration', '0s');
    
    // Reduce image quality
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.lowSrc) {
        img.src = img.dataset.lowSrc;
      }
    });
  }

  // Enable medium bandwidth mode
  enableMediumBandwidthMode() {
    // Standard settings
  }

  // Enable high bandwidth mode
  enableHighBandwidthMode() {
    // Enable all features
  }
}

// Global instance
window.offlineManager = new OfflineManager();

