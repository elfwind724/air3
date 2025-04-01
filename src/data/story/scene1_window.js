export default {
    id: 'scene1_window',
    background: {
        image: '/images/backgrounds/city_morning.svg',
        color: '#4a4a5e'
    },
    text: `窗外是熟悉的城市街景，早高峰的车流还未完全涌起。一切如常。

冯远："这世界...变得真快啊。"`,
    choices: [
        {
            text: "回到电脑前",
            nextScene: "scene1_news"
        },
        {
            text: "继续眺望一会",
            nextScene: "scene1_window_more"
        }
    ]
}; 