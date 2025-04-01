import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Courier New', Courier, monospace; /* 使用等宽字体作为像素字体的临时替代 */
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        line-height: 1.5;
        font-size: 16px;
        overflow: hidden;
    }

    button {
        font-family: inherit;
        cursor: pointer;
        border: none;
        outline: none;
        background: none;
        
        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }

    /* 自定义滚动条样式 */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 4px;
    }

    /* 禁用文本选择 */
    .no-select {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    /* 淡入动画 */
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    /* 打字机效果 */
    @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
    }

    .typing {
        overflow: hidden;
        white-space: nowrap;
        animation: typing 3.5s steps(40, end);
    }

    /* 闪烁效果 */
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }

    .blink {
        animation: blink 0.5s infinite;
    }

    /* 故障效果 */
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }

    .glitch {
        animation: glitch 0.3s infinite;
    }
`;

export default GlobalStyle; 