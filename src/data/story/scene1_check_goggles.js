export default {
    id: 'scene1_check_goggles',
    background: {
        image: '/images/backgrounds/feng_apartment_morning.svg',
        color: '#2a2a3e'
    },
    text: `目光落到桌角那副布满灰尘的旧款 AR 眼镜上。

冯远："老伙计，你可是见证了'百镜大战'的开端啊。可惜，终究是没跟上时代。"`,
    choices: [
        {
            text: "拿起旧眼镜看看",
            nextScene: "scene1_examine_goggles"
        },
        {
            text: "继续浏览新闻",
            nextScene: "scene1_more_news"
        }
    ]
}; 