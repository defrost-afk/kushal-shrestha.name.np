// Game Loader for Code Splitting
// Implements on-demand loading of game modules

class GameLoader {
  constructor() {
    this.loadedGames = new Set();
    this.loadingPromises = new Map();
    this.gameCache = new Map();
    this.loadStrategies = new Map();
    
    // Initialize load strategies
    this.initializeLoadStrategies();
  }

  // Initialize different loading strategies
  initializeLoadStrategies() {
    // Lazy loading strategy
    this.loadStrategies.set('lazy', this.lazyLoad.bind(this));
    
    // Preload critical resources strategy
    this.loadStrategies.set('critical', this.criticalLoad.bind(this));
    
    // Background loading strategy
    this.loadStrategies.set('background', this.backgroundLoad.bind(this));
  }

  // Load game on demand
  async loadGame(gameName, strategy = 'lazy') {
    // Return cached if already loaded
    if (this.gameCache.has(gameName)) {
      return this.gameCache.get(gameName);
    }

    // Return existing promise if currently loading
    if (this.loadingPromises.has(gameName)) {
      return this.loadingPromises.get(gameName);
    }

    // Get loading strategy
    const loadStrategy = this.loadStrategies.get(strategy);
    if (!loadStrategy) {
      throw new Error(`Unknown loading strategy: ${strategy}`);
    }

    // Start loading game
    const loadingPromise = loadStrategy(gameName);
    this.loadingPromises.set(gameName, loadingPromise);

    try {
      const gameModule = await loadingPromise;
      this.gameCache.set(gameName, gameModule);
      this.loadedGames.add(gameName);
      return gameModule;
    } finally {
      this.loadingPromises.delete(gameName);
    }
  }

  // Lazy loading strategy
  async lazyLoad(gameName) {
    const gameConfig = this.getGameConfig(gameName);
    
    // Show loading indicator
    this.showGameLoadingIndicator(gameName);
    
    try {
      // Load game-specific CSS
      await this.loadGameCSS(gameConfig.cssPath);
      
      // Load game-specific JavaScript
      const gameModule = await this.loadGameJS(gameConfig.jsPath);
      
      // Load game-specific assets
      await this.loadGameAssets(gameConfig.assetsPath);
      
      return gameModule;
    } finally {
      this.hideGameLoadingIndicator(gameName);
    }
  }

  // Critical loading strategy (for immediate needs)
  async criticalLoad(gameName) {
    const gameConfig = this.getGameConfig(gameName);
    
    // Load with high priority
    const promises = [
      this.loadGameCSS(gameConfig.cssPath, 'high'),
      this.loadGameJS(gameConfig.jsPath, 'high'),
      this.loadGameAssets(gameConfig.assetsPath, 'high')
    ];
    
    const [, gameModule] = await Promise.all(promises);
    return gameModule;
  }

  // Background loading strategy
  async backgroundLoad(gameName) {
    const gameConfig = this.getGameConfig(gameName);
    
    try {
      // Load with low priority in background
      await this.loadGameCSS(gameConfig.cssPath, 'low');
      const gameModule = await this.loadGameJS(gameConfig.jsPath, 'low');
      await this.loadGameAssets(gameConfig.assetsPath, 'low');
      
      return gameModule;
    } catch (error) {
      console.warn(`Background loading failed for ${gameName}:`, error);
      return null;
    }
  }

  // Get game configuration
  getGameConfig(gameName) {
    const configs = {
      'imposter': {
        jsPath: './imposter/index.html',
        cssPath: './imposter/styles.css',
        assetsPath: './imposter/assets/',
        dependencies: ['category-loader.js', 'offline-manager.js', 'device-passer.js'],
        priority: 'high'
      },
      'headsup': {
        jsPath: './headsup/index.html',
        cssPath: './headsup/styles.css',
        assetsPath: './headsup/assets/',
        dependencies: ['game-utils.js'],
        priority: 'medium'
      }
    };
    
    const config = configs[gameName];
    if (!config) {
      throw new Error(`Unknown game: ${gameName}`);
    }
    
    return config;
  }

  // Load game CSS
  async loadGameCSS(cssPath, priority = 'normal') {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (document.querySelector(`link[href="${cssPath}"]`)) {
        resolve();
        return;
      }
      
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${cssPath}`));
      
      // Set priority based on strategy
      if (priority === 'high') {
        link.setAttribute('importance', 'high');
      } else if (priority === 'low') {
        link.setAttribute('importance', 'low');
      }
      
      document.head.appendChild(link);
    });
  }

  // Load game JavaScript
  async loadGameJS(jsPath, priority = 'normal') {
    try {
      const response = await fetch(jsPath);
      if (!response.ok) {
        throw new Error(`Failed to load JS: ${jsPath}`);
      }
      
      const jsText = await response.text();
      
      // Execute JavaScript in global scope
      const script = document.createElement('script');
      script.textContent = jsText;
      document.head.appendChild(script);
      
      // Return game module if available
      return window.gameModule || null;
    } catch (error) {
      console.error(`Failed to load game JS: ${jsPath}`, error);
      throw error;
    }
  }

  // Load game assets
  async loadGameAssets(assetsPath, priority = 'normal') {
    // For now, this is a placeholder
    // In a real implementation, this would load images, sounds, etc.
        return Promise.resolve();
  }

  // Show game loading indicator
  showGameLoadingIndicator(gameName) {
    const indicator = document.createElement('div');
    indicator.id = `game-loading-${gameName}`;
    indicator.className = 'game-loading-indicator';
    indicator.innerHTML = `
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading ${gameName}...</div>
    `;
    
    // Add styles if not present
    if (!document.getElementById('game-loader-styles')) {
      const styles = document.createElement('style');
      styles.id = 'game-loader-styles';
      styles.textContent = `
        .game-loading-indicator {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--surface);
          border: 2px solid var(--accent);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          z-index: 1000;
          box-shadow: var(--shadow);
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--border);
          border-top: 4px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loading-text {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          color: var(--text);
          text-align: center;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(indicator);
  }

  // Hide game loading indicator
  hideGameLoadingIndicator(gameName) {
    const indicator = document.getElementById(`game-loading-${gameName}`);
    if (indicator) {
      indicator.style.opacity = '0';
      setTimeout(() => indicator.remove(), 300);
    }
  }

  // Preload games based on user behavior
  async preloadPopularGames() {
    const popularGames = ['imposter', 'headsup'];
    
    // Preload with low priority in background
    const preloadPromises = popularGames.map(game => 
      this.loadGame(game, 'background').catch(error => {
        console.warn(`Failed to preload ${game}:`, error);
        return null;
      })
    );
    
    await Promise.allSettled(preloadPromises);
  }

  // Get loading statistics
  getLoadingStats() {
    return {
      loaded: this.loadedGames.size,
      loading: this.loadingPromises.size,
      cached: this.gameCache.size,
      games: Array.from(this.loadedGames)
    };
  }

  // Clear cache
  clearCache() {
    this.gameCache.clear();
    this.loadedGames.clear();
    this.loadingPromises.clear();
  }

  // Check if game is loaded
  isGameLoaded(gameName) {
    return this.loadedGames.has(gameName);
  }

  // Get cached game
  getCachedGame(gameName) {
    return this.gameCache.get(gameName);
  }

  // Unload game (for memory management)
  unloadGame(gameName) {
    this.gameCache.delete(gameName);
    this.loadedGames.delete(gameName);
    
    // Remove game-specific CSS
    const gameConfig = this.getGameConfig(gameName);
    const cssLink = document.querySelector(`link[href="${gameConfig.cssPath}"]`);
    if (cssLink) {
      cssLink.remove();
    }
  }
}

// Global instance
window.gameLoader = new GameLoader();

