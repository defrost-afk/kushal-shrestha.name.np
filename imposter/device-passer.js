// Enhanced Device Passer for Local Multiplayer
// Improves device passing experience with animations and offline support

class DevicePasser {
  constructor() {
    this.currentPlayerIndex = 0;
    this.players = [];
    this.passHistory = [];
    this.isTransitioning = false;
    this.passCompleteCallback = null;
    this.passCancelledCallback = null;
    
    // Detect device capabilities
    this.hasVibration = 'vibrate' in navigator;
    this.hasMotionSensors = 'DeviceMotionEvent' in window;
    
    // Initialize
    this.initializePasser();
  }

  // Initialize device passer
  initializePasser() {
    // Add styles for enhanced passing
    this.addPasserStyles();
    
    // Listen for device orientation changes
    if (this.hasMotionSensors) {
      window.addEventListener('devicemotion', this.handleDeviceMotion.bind(this));
    }
    
    // Listen for keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcut.bind(this));
  }

  // Add enhanced styles
  addPasserStyles() {
    if (document.getElementById('passer-styles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'passer-styles';
    styles.textContent = `
      .pass-device-enhanced {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 18px;
        background: rgba(248,245,239,0.98);
        z-index: 9999;
        overflow: hidden;
        padding: 24px;
      }
      
      .pass-device-enhanced::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, var(--accent), var(--red), var(--accent));
        border-radius: 14px;
        opacity: 0;
        z-index: -1;
        transition: opacity 0.3s;
        animation: borderGlow 2s infinite;
      }
      
      .pass-device-enhanced.active::before {
        opacity: 0.7;
      }
      
      @keyframes borderGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.8; }
      }
      
      .pass-countdown {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        font-weight: bold;
        color: var(--accent);
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        z-index: 10;
        animation: pulse-countdown 1s infinite;
      }
      
      @keyframes pulse-countdown {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
      }
      
      .pass-instructions {
        background: var(--card);
        border: 2px solid var(--border);
        border-radius: 8px;
        padding: 16px;
        margin: 20px 0;
        text-align: center;
        font-size: 14px;
        line-height: 1.4;
      }
      
      .pass-tips {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        margin-top: 16px;
      }
      
      .pass-tip {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 12px;
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .pass-tip-icon {
        font-size: 18px;
      }
      
      .device-orientation-indicator {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: var(--accent);
        z-index: 1000;
        display: none;
      }
      
      .pass-animation {
        animation: slidePass 0.5s ease-out;
      }
      
      @keyframes slidePass {
        0% { transform: translateX(100%); opacity: 0; }
        50% { transform: translateX(0); opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
      }
    `;
    document.head.appendChild(styles);
  }

  // Enhanced pass device function
  async passDeviceToPlayer(playerIndex, playerName) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentPlayerIndex = playerIndex;
    
    // Record pass in history
    this.passHistory.push({
      playerIndex,
      playerName,
      timestamp: Date.now(),
      deviceHandshake: await this.generateDeviceHandshake()
    });
    
    // Show enhanced passing screen
    this.showEnhancedPassScreen(playerName, playerIndex);
    
    // Vibrate if supported
    if (this.hasVibration) {
      this.vibratePassPattern();
    }
    
    // Play pass sound
    this.playPassSound();
    
    // Show countdown
    await this.showPassCountdown();
    
    // Hide passing screen
    this.hidePassScreen();
    this.isTransitioning = false;
  }

  // Show enhanced pass screen
  showEnhancedPassScreen(playerName, playerIndex) {
    const passScreen = document.createElement('div');
    passScreen.className = 'pass-device-enhanced active';
    passScreen.innerHTML = `
      <div class="pass-countdown">3</div>
      <div class="pass-card">
        <div class="pass-icon">📱</div>
        <div class="pass-name">${playerName}</div>
        <div class="pass-instruction">
          <strong>Pass device to ${playerName}</strong>
          <div class="pass-tips">
            <div class="pass-tip">
              <span class="pass-tip-icon">👆</span>
              <span>Tap when ready</span>
            </div>
            <div class="pass-tip">
              <span class="pass-tip-icon">🔄</span>
              <span>Hold device firmly</span>
            </div>
            <div class="pass-tip">
              <span class="pass-tip-icon">👀</span>
              <span>Keep screen private</span>
            </div>
          </div>
        </div>
      </div>
      <button class="btn-primary" onclick="devicePasser.confirmPassReceived()">
        I HAVE THE DEVICE
      </button>
    `;
    
    document.body.appendChild(passScreen);
    
    // Add animation class
    setTimeout(() => {
      passScreen.classList.add('pass-animation');
    }, 100);
  }

  // Show pass countdown
  async showPassCountdown() {
    return new Promise((resolve) => {
      let count = 3;
      const countdownEl = document.querySelector('.pass-countdown');
      
      const interval = setInterval(() => {
        count--;
        if (countdownEl) {
          countdownEl.textContent = count;
          countdownEl.style.transform = `translate(-50%, -50%) scale(${count > 0 ? 1 : 1.5})`;
          countdownEl.style.opacity = count > 0 ? '1' : '0';
        }
        
        if (count <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  }

  // Hide pass screen
  hidePassScreen() {
    const passScreen = document.querySelector('.pass-device-enhanced');
    if (passScreen) {
      passScreen.style.opacity = '0';
      setTimeout(() => passScreen.remove(), 300);
    }
  }

  // Confirm pass received
  confirmPassReceived() {
    // Vibrate to confirm
    if (this.hasVibration) {
      navigator.vibrate([100, 50, 100]);
    }
    
    // Play confirmation sound
    this.playConfirmSound();
    
    // Hide pass screen
    this.hidePassScreen();
    
    // Trigger next step
    if (typeof this.passCompleteCallback === 'function') {
      this.passCompleteCallback(this.currentPlayerIndex);
    }
  }

  // Vibration pattern for passing
  vibratePassPattern() {
    if (!this.hasVibration) return;
    
    // Triple pulse pattern
    navigator.vibrate([200, 100, 200, 100, 200]);
  }

  // Play pass sound
  playPassSound() {
    // Use existing sound system
    if (typeof playSound === 'function') {
      playSound('pass');
    } else {
      // Fallback sound generation
      this.generateTone(440, 200);
    }
  }

  // Play confirmation sound
  playConfirmSound() {
    if (typeof playSound === 'function') {
      playSound('confirm');
    } else {
      // Fallback sound generation
      this.generateTone(660, 150);
    }
  }

  // Generate tone (fallback)
  generateTone(frequency, duration) {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      // Audio not available
    }
  }

  // Handle device motion for automatic pass detection
  handleDeviceMotion(event) {
    if (!this.isTransitioning) return;
    
    const acceleration = event.accelerationIncludingGravity;
    const magnitude = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2);
    
    // Detect sharp movement (device being passed)
    if (magnitude > 15) {
      this.onDeviceMotionDetected();
    }
  }

  // Handle keyboard shortcuts
  handleKeyboardShortcut(event) {
    if (!this.isTransitioning) return;
    
    // Space or Enter to confirm pass
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.confirmPassReceived();
    }
    
    // Escape to cancel (if implemented)
    if (event.code === 'Escape') {
      event.preventDefault();
      this.cancelPass();
    }
  }

  // Generate device handshake for session tracking
  async generateDeviceHandshake() {
    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      timestamp: Date.now(),
      randomId: Math.random().toString(36).substr(2, 9)
    };
    
    // Store in offline manager if available
    if (window.offlineManager) {
      window.offlineManager.queueAction({
        type: 'device_handshake',
        data: deviceInfo
      });
    }
    
    return deviceInfo;
  }

  // Cancel pass
  cancelPass() {
    this.isTransitioning = false;
    this.hidePassScreen();
    
    if (typeof this.passCancelledCallback === 'function') {
      this.passCancelledCallback();
    }
  }

  // Get pass statistics
  getPassStatistics() {
    return {
      totalPasses: this.passHistory.length,
      averagePassTime: this.calculateAveragePassTime(),
      deviceHandshakes: this.passHistory.length,
      lastPassTime: this.passHistory.length > 0 ? 
        this.passHistory[this.passHistory.length - 1].timestamp : null
    };
  }

  // Calculate average pass time
  calculateAveragePassTime() {
    if (this.passHistory.length < 2) return 0;
    
    let totalTime = 0;
    for (let i = 1; i < this.passHistory.length; i++) {
      totalTime += this.passHistory[i].timestamp - this.passHistory[i - 1].timestamp;
    }
    
    return totalTime / (this.passHistory.length - 1);
  }

  // Set callback for pass completion
  onPassComplete(callback) {
    this.passCompleteCallback = callback;
  }

  // Set callback for pass cancellation
  onPassCancelled(callback) {
    this.passCancelledCallback = callback;
  }

  // Reset passer state
  reset() {
    this.currentPlayerIndex = 0;
    this.isTransitioning = false;
    this.passHistory = [];
  }
}

// Global instance
window.devicePasser = new DevicePasser();

