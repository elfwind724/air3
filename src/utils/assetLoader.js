/**
 * 资源加载辅助函数
 * 用于处理游戏中的图片、音频等资源路径
 */

/**
 * 获取资源完整URL
 * @param {string} path - 资源路径
 * @returns {string} 完整URL
 */
export const getAssetUrl = (path) => {
  if (!path) return null;
  
  // 移除开头的斜杠
  let cleanPath = path;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.substring(1);
  }
  
  // 如果是完整URL（以http开头），则直接返回
  if (cleanPath.startsWith('http')) {
    return cleanPath;
  }
  
  // 公共资源直接使用绝对路径，不使用import.meta.url (这会导致URL错误)
  console.log(`资源路径处理: ${path} -> /${cleanPath}`);
  return `/${cleanPath}`;
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
    img.onerror = () => {
      console.error(`图片加载失败: ${url}`);
      reject(new Error(`无法加载图片: ${url}`));
    };
    img.src = getAssetUrl(url);
  });
};

/**
 * 预加载音频
 * @param {string} url - 音频URL
 * @returns {Promise} - 音频加载Promise
 */
export const preloadAudio = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }
    
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve(url);
    audio.onerror = () => {
      console.error(`音频加载失败: ${url}`);
      reject(new Error(`无法加载音频: ${url}`));
    };
    audio.src = getAssetUrl(url);
  });
};

export default {
  getAssetUrl,
  preloadImage,
  preloadAudio
}; 