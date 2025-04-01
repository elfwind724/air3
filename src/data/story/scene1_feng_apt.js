export default {
    id: 'scene1_feng_apt',
    background: {
        image: '/images/backgrounds/feng_apartment_morning.svg',
        color: '#2a2a3e'
    },
    text: "清晨，阳光透过窗帘缝隙照入略显凌乱的公寓。中学教师冯远坐在电脑前，浏览着最新的科技资讯。",
    choices: [
        {
            text: "查看科技新闻",
            nextScene: "scene1_news"
        },
        {
            text: "看看窗外",
            nextScene: "scene1_window"
        }
    ],
    textStyles: [
        {
            start: 0,
            end: 2,
            type: 'bold'
        }
    ]
}; 