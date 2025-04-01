export default {
    id: 'scene1_more_news',
    background: {
        image: '/images/backgrounds/feng_apartment_computer.svg',
        color: '#2a2a3e'
    },
    text: `冯远继续浏览着其他科技新闻。大多数都在讨论即将到来的 INMO Air3 发布会。

突然，手机震动了一下，是"AR 爱好者"微信群的消息提示。`,
    choices: [
        {
            text: "查看微信消息",
            nextScene: "scene1_wechat"
        },
        {
            text: "暂时不看",
            nextScene: "scene1_ignore_wechat"
        }
    ]
}; 