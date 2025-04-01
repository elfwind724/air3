export const theme = {
    colors: {
        primary: '#00ffff',      // 主色调：青色
        secondary: '#ff00ff',    // 次要色：品红
        background: '#1a1a2e',   // 背景色：深蓝黑
        text: '#ffffff',         // 文本色：浅灰
        textDim: 'rgba(255, 255, 255, 0.7)',
        textHighlight: '#ffff00', // 高亮文本：黄色
        textDisabled: '#666666', // 禁用文本：深灰
        warning: '#ffff00',      // 警告色：红色
        error: '#ff0000',
        success: '#00ff00'       // 成功色：绿色
    },
    fonts: {
        pixel: "'Pixel Font', monospace",  // 像素字体
        system: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" // 系统字体
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
        xlarge: '32px'
    },
    transitions: {
        fast: '0.2s',
        normal: '0.3s',
        slow: '0.5s'
    },
    shadows: {
        small: '0 2px 4px rgba(0,0,0,0.2)',
        medium: '0 4px 8px rgba(0,0,0,0.2)',
        large: '0 8px 16px rgba(0,0,0,0.2)'
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px'
    },
    zIndex: {
        background: -1,
        content: 1,
        overlay: 100,
        modal: 1000,
        notification: 2000,
        loading: 9999
    }
}; 