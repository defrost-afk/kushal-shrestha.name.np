// Dynamic Category Loader for Chhal Imposter Game
// Implements lazy loading and smart caching

class CategoryLoader {
  constructor() {
    this.loadedCategories = new Set();
    this.loadingPromises = new Map();
    this.categoryCache = new Map();
    this.popularCategories = ['festivals', 'food', 'places'];
  }

  // Load category on demand
  async loadCategory(categoryKey) {
    // Return cached if already loaded
    if (this.categoryCache.has(categoryKey)) {
      return this.categoryCache.get(categoryKey);
    }

    // Return existing promise if currently loading
    if (this.loadingPromises.has(categoryKey)) {
      return this.loadingPromises.get(categoryKey);
    }

    // Start loading category
    const loadingPromise = this._loadCategoryData(categoryKey);
    this.loadingPromises.set(categoryKey, loadingPromise);

    try {
      const categoryData = await loadingPromise;
      this.categoryCache.set(categoryKey, categoryData);
      this.loadedCategories.add(categoryKey);
      return categoryData;
    } finally {
      this.loadingPromises.delete(categoryKey);
    }
  }

  // Preload popular categories
  async preloadPopularCategories() {
    const preloadPromises = this.popularCategories.map(cat => 
      this.loadCategory(cat).catch(err => {
        return null;
      })
    );
    
    await Promise.allSettled(preloadPromises);
  }

  // Load all categories (for fallback)
  async loadAllCategories() {
    try {
      if (typeof categories !== 'undefined') {
        window.categories = categories;
        return window.categories;
      }
      if (typeof window.categories !== 'undefined') {
        return window.categories;
      }

      const response = await fetch('./words.js');
      const text = await response.text();
      
      // Extract categories from the global variable
      const script = document.createElement('script');
      script.textContent = text;
      document.head.appendChild(script);
      
      if (typeof categories !== 'undefined') {
        window.categories = categories;
      }
      return window.categories;
    } catch (error) {
      return {};
    }
  }

  // Get cached categories
  getCachedCategories() {
    const result = {};
    for (const [key, value] of this.categoryCache) {
      result[key] = value;
    }
    return result;
  }

  // Check if category is loaded
  isCategoryLoaded(categoryKey) {
    return this.loadedCategories.has(categoryKey);
  }

  // Get loading status
  isLoading(categoryKey) {
    return this.loadingPromises.has(categoryKey);
  }

  // Clear cache
  clearCache() {
    this.categoryCache.clear();
    this.loadedCategories.clear();
    this.loadingPromises.clear();
  }

  // Private method to load category data
  async _loadCategoryData(categoryKey) {
    // For now, load from the main words.js file
    // In the future, this could load from separate files
    try {
      if (!window.categories) {
        await this.loadAllCategories();
      }
      
      return window.categories[categoryKey] || null;
    } catch (error) {
      throw error;
    }
  }

  // Get category statistics
  getCategoryStats() {
    return {
      loaded: this.loadedCategories.size,
      cached: this.categoryCache.size,
      loading: this.loadingPromises.size
    };
  }
}

// Global instance
window.categoryLoader = new CategoryLoader();

