export default {
    id: 'scene1_news',
    background: {
        image: '/images/backgrounds/feng_apartment_computer.svg',
        color: '#2a2a3e'
    },
    text: `屏幕上充斥着关于"百镜大战"和影目公司即将发布 INMO Air3 的新闻。

冯远：（思考）"Air3...还有那个'盖亚'AI 管家...听起来像科幻小说。影目这次是背水一战了吧？"`,
    choices: [
        {
            text: ""我对影目的创新力有期待。"",
            nextScene: "scene1_feng_optimistic",
            setFlags: [{ flag: 'feng_attitude', value: 'optimistic' }]
        },
        {
            text: ""还是谨慎点好，噱头太多了。"",
            nextScene: "scene1_feng_skeptical",
            setFlags: [{ flag: 'feng_attitude', value: 'skeptical' }]
        },
        {
            text: "继续浏览其他新闻",
            nextScene: "scene1_more_news"
        }
    ]
}; 