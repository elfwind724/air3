/**
 * 资源加载辅助函数
 * 用于处理游戏中的图片、音频等资源路径
 */

// 存储当前播放的音频实例
let currentBackgroundMusic = null;
let currentSoundEffect = null;

/**
 * 获取资源完整URL
 * @param {string} path - 资源路径
 * @returns {string} 完整URL
 */
export const getAssetUrl = (path) => {
  if (!path) return null;
  
  // 如果是完整URL（以http开头），则直接返回
  if (path.startsWith('http')) {
    return path;
  }
  
  // 移除开头的斜杠并确保使用正确的分隔符
  let cleanPath = path.replace(/^\/+/, '').replace(/\\/g, '/');
  
  // 移除 public/ 前缀（如果存在）
  cleanPath = cleanPath.replace(/^public\//, '');
  
  console.log(`资源路径处理: ${path} -> ${cleanPath}`);
  return cleanPath;
};

/**
 * 预加载图片
 * @param {string} url - 图片URL
 * @returns {Promise} - 图片加载Promise
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = (e) => {
      console.error(`图片加载失败: ${url}`, e);
      reject(new Error(`无法加载图片: ${url}`));
    };
    img.src = getAssetUrl(url);
  });
};

/**
 * 停止当前背景音乐
 */
export const stopBackgroundMusic = () => {
  if (currentBackgroundMusic) {
    currentBackgroundMusic.pause();
    currentBackgroundMusic.currentTime = 0;
    currentBackgroundMusic = null;
  }
};

/**
 * 停止当前音效
 */
export const stopSoundEffect = () => {
  if (currentSoundEffect) {
    currentSoundEffect.pause();
    currentSoundEffect.currentTime = 0;
    currentSoundEffect = null;
  }
};

/**
 * 播放背景音乐
 * @param {string} url - 音频URL
 * @param {boolean} loop - 是否循环播放
 * @returns {Promise} - 音频加载Promise
 */
export const playBackgroundMusic = (url, loop = true) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      stopBackgroundMusic();
      resolve(null);
      return;
    }

    // 停止当前播放的背景音乐
    stopBackgroundMusic();
    
    const audio = new Audio();
    audio.loop = loop;
    audio.volume = 0.5; // 设置适中的音量
    
    audio.oncanplaythrough = () => {
      currentBackgroundMusic = audio;
      audio.play().catch(e => console.error('播放音乐失败:', e));
      resolve(url);
    };
    
    audio.onerror = (e) => {
      console.error(`音频加载失败: ${url}`, e);
      reject(new Error(`无法加载音频: ${url}`));
    };
    
    audio.src = getAssetUrl(url);
  });
};

/**
 * 播放音效
 * @param {string} url - 音频URL
 * @returns {Promise} - 音频加载Promise
 */
export const playSoundEffect = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    
    // 停止当前播放的音效
    stopSoundEffect();
    
    const audio = new Audio();
    audio.volume = 0.7; // 音效音量稍大
    
    audio.oncanplaythrough = () => {
      currentSoundEffect = audio;
      audio.play().catch(e => console.error('播放音效失败:', e));
      resolve(url);
    };
    
    audio.onerror = (e) => {
      console.error(`音频加载失败: ${url}`, e);
      reject(new Error(`无法加载音频: ${url}`));
    };
    
    audio.src = getAssetUrl(url);
  });
};

export default {
  getAssetUrl,
  preloadImage,
  playBackgroundMusic,
  playSoundEffect,
  stopBackgroundMusic,
  stopSoundEffect
}; 