export default {
    id: 'intro_screen',
    background: {
        image: '/images/backgrounds/intro_logo.svg',
        color: '#1a1a2e'
    },
    text: `GAIA CONSPIRACY

2025年，增强现实（AR）技术渗透日常，一场被称为百镜大战的科技竞赛进入白热化。

影目（INMO）公司，曾一度落后，即将发布其革命性产品...

点击继续`,
    music: '/audio/music/intro_theme.mp3',
    nextScene: 'scene1_feng_apt',
    textStyles: [
        {
            start: 0,
            end: 15,
            type: 'bold'
        }
    ],
    choices: [
        {
            text: "开始新游戏",
            nextScene: "scene1_feng_apt"
        },
        {
            text: "继续游戏",
            nextScene: "load_game",
            condition: "hasSaveData"
        },
        {
            text: "游戏设置",
            nextScene: "settings"
        }
    ]
};

// Settings scene
export const settings = {
    id: 'settings',
    background: {
        image: '/images/backgrounds/settings_bg.png',
        color: '#000000',
        location: 'Settings'
    },
    text: `游戏设置

音乐音量：[滑块]
音效音量：[滑块]
文字速度：[滑块]
全屏显示：[开关]`,
    choices: [
        {
            text: "返回主菜单",
            nextScene: "intro_screen"
        }
    ]
};

// Load game handler scene
export const load_game = {
    id: 'load_game',
    background: {
        image: '/images/backgrounds/load_game_bg.png',
        color: '#000000',
        location: 'Load Game'
    },
    text: `正在加载存档...`,
    onEnter: ({ loadGame }) => {
        if (loadGame) {
            loadGame();
        }
        return null;
    }
}; 