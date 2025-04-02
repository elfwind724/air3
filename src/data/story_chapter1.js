// src/data/story_chapter1.js

// 修复路径函数
const fixPath = (path) => {
  if (!path) return null;
  
  // 在开发环境中，Vite需要带前导斜杠的路径来访问public目录
  // 确保路径以斜杠开头
  if (!path.startsWith('/')) {
    path = '/' + path;
  }
  
  // 移除public/前缀（如果有）
  if (path.includes('/public/')) {
    path = path.replace('/public/', '/');
  }
  
  console.log('处理后的资源路径:', path);
  return path;
};

const storyData = {
  // --- Meta Information ---
  meta: {
    title: "盖亚阴谋：第一章 - 风暴前夜",
    startNodeId: 'intro_screen',
  },

  // --- Story Nodes ---
  nodes: {
    // --- INTRO ---
    'intro_screen': {
      id: 'intro_screen',
      text: `2025年，增强现实（AR）技术渗透日常，一场被称为'百镜大战'的科技竞赛进入白热化。

影目（INMO）公司，曾一度落后，即将发布其革命性产品...

(点击继续)`,
      backgroundImage: fixPath('images/backgrounds/intro_logo.png'),
      nextNodeId: 'scene1_feng_apt_pre',
    },

    // --- SCENE 1: Feng's Apartment (Early April) ---
    'scene1_feng_apt_pre': {
      id: 'scene1_feng_apt_pre',
      text: `清晨，阳光透过窗帘缝隙照入略显凌乱的公寓。中学教师冯远（你）坐在电脑前，浏览着最新的科技资讯。`,
      backgroundImage: fixPath('images/backgrounds/feng_apartment_morning.png'),
      nextNodeId: 'scene1_feng_computer_check',
    },

    'scene1_feng_computer_check': {
      id: 'scene1_feng_computer_check',
      text: `屏幕上充斥着关于'百镜大战'和影目公司即将发布 INMO Air3 的新闻。

冯远：（思考）'Air3...还有那个盖亚AI管家...听起来像科幻小说。影目这次是背水一战了吧？'`,
      portrait: fixPath('images/portraits/feng_thinking.png'),
      choices: [
        { 
          text: '我对影目的创新力有期待。', 
          nextNodeId: 'scene1_feng_optimistic', 
          setFlags: [{ flag: 'feng_attitude', value: 'optimistic' }] 
        },
        { 
          text: '还是谨慎点好，噱头太多了。', 
          nextNodeId: 'scene1_feng_skeptical', 
          setFlags: [{ flag: 'feng_attitude', value: 'skeptical' }] 
        },
        { 
          text: '（看看窗外）', 
          nextNodeId: 'scene1_feng_look_outside' 
        }
      ]
    },

    'scene1_feng_optimistic': {
      id: 'scene1_feng_optimistic',
      text: `冯远：'说不定这次真能搞出点名堂，毕竟压力这么大。盖亚...如果真像宣传的那么智能，生活会方便很多吧。'`,
      portrait: fixPath('images/portraits/feng_neutral.png'),
      nextNodeId: 'scene1_check_old_goggles',
    },

    'scene1_feng_skeptical': {
      id: 'scene1_feng_skeptical',
      text: `冯远：'革命性这词都用烂了。之前的 AR 眼镜哪个不是吹得天花乱坠？希望别又是一场空。'`,
      portrait: fixPath('images/portraits/feng_neutral.png'),
      nextNodeId: 'scene1_check_old_goggles',
    },

    'scene1_feng_look_outside': {
      id: 'scene1_feng_look_outside',
      text: `窗外是熟悉的城市街景，早高峰的车流还未完全涌起。一切如常。
冯远：'这世界...变得真快啊。'`,
      portrait: fixPath('images/portraits/feng_neutral.png'),
      nextNodeId: 'scene1_check_old_goggles',
    },

    'scene1_check_old_goggles': {
      id: 'scene1_check_old_goggles',
      text: `目光落到桌角那副布满灰尘的旧款 AR 眼镜上。
冯远：'老伙计，你可是见证了百镜大战的开端啊。可惜，终究是没跟上时代。'`,
      portrait: fixPath('images/portraits/feng_thinking.png'),
      nextNodeId: 'scene1_wechat_prompt',
    },

    'scene1_wechat_prompt': {
      id: 'scene1_wechat_prompt',
      text: `手机震动了一下，屏幕亮起，是"AR 爱好者"微信群的消息提示。`,
      backgroundImage: fixPath('images/backgrounds/feng_apartment_morning.png'),
      portrait: null,
      choices: [
        { text: "看看群里在聊什么", nextNodeId: 'scene2_wechat_start' },
        { text: "（暂时不看）", nextNodeId: 'scene1_end' }
      ]
    },

    'scene1_end': {
      id: 'scene1_end',
      text: `冯远摇了摇头，决定先准备去学校。今天还有早课。`,
      nextNodeId: 'scene3_news_intro'
    },

    // --- SCENE 2: WeChat Group ---
    'scene2_wechat_start': {
      id: 'scene2_wechat_start',
      text: `点开微信群，消息已经刷了屏。`,
      backgroundImage: fixPath('images/backgrounds/wechat_ui_bg.png'),
      nextNodeId: 'scene2_chat1',
    },

    'scene2_chat1': {
      id: 'scene2_chat1',
      text: `[群友A]：卧槽！影目官网更新了！Air3 宣传片帅爆！
[群友B]：盖亚 AI 演示视频看了吗？简直离谱！比现在市面上所有语音助手加起来都强！
[群友C]：我赌五毛，绝对年度最佳 AR！我已经准备好钱包了！`,
      portrait: fixPath('images/portraits/wechat_group_icon.png'),
      nextNodeId: 'scene2_chat2',
    },

    'scene2_chat2': {
      id: 'scene2_chat2',
      text: `[群友A]：冯老师也在啊！@冯远 老师怎么看？这次影目能翻盘吗？
冯远：（在输入框里想了想...）`,
      portrait: fixPath('images/portraits/wechat_group_icon.png'),
      choices: [
        { text: "看起来潜力巨大，期待发布会。", nextNodeId: 'scene2_chat_reply_positive' },
        { text: "演示效果惊人，但还得看实际体验。", nextNodeId: 'scene2_chat_reply_neutral' },
        { text: "（潜水，看他们继续吹）", nextNodeId: 'scene2_chat_reply_silent' }
      ]
    },

    'scene2_chat_reply_positive': {
      id: 'scene2_chat_reply_positive',
      text: `冯远：看起来潜力巨大，期待发布会。
[群友B]：哈哈，冯老师也心动了！
[群友C]：4月29号！不见不散！我已经开始攒钱了！`,
      nextNodeId: 'scene2_chat_end',
    },

    'scene2_chat_reply_neutral': {
      id: 'scene2_chat_reply_neutral',
      text: `冯远：演示效果惊人，但还得看实际体验。
[群友A]：确实，不过这次感觉影目真下血本了。
[群友C]：冲冲冲！`,
      nextNodeId: 'scene2_chat_end',
    },

    'scene2_chat_reply_silent': {
      id: 'scene2_chat_reply_silent',
      text: `[群友B]：冯老师在忙？不管了，我已经预感钱包不保！
[群友A]：同！坐等 29 号！`,
      nextNodeId: 'scene2_chat_end',
    },

    'scene2_chat_end': {
      id: 'scene2_chat_end',
      text: `群里的讨论热度不减。冯远放下手机，心中对 Air3 的期待和疑虑交织。`,
      backgroundImage: fixPath('images/backgrounds/feng_apartment_morning.png'),
      portrait: fixPath('images/portraits/feng_thinking.png'),
      nextNodeId: 'scene3_news_intro',
    },

    // --- SCENE 3: News Report (April 29 Launch Day) ---
    'scene3_news_intro': {
      id: 'scene3_news_intro',
      text: `时间来到 4 月 29 日，影目 INMO Air3 全球发布会如期举行。`,
      backgroundImage: fixPath('images/backgrounds/calendar_apr29.png'),
      nextNodeId: 'scene3_news_report',
    },

    'scene3_news_report': {
      id: 'scene3_news_report',
      text: `新闻播报："...影目公司今日正式发布 INMO Air3 AR 眼镜，及其搭载的革命性 AI 管家'盖亚'！这款被誉为'AR 版 ChatGPT'的产品，在发布会现场引发轰动..."`,
      backgroundImage: fixPath('images/backgrounds/news_studio.png'),
      portrait: fixPath('images/portraits/news_anchor.png'),
      nextNodeId: 'scene3_news_report2',
    },

    'scene3_news_report2': {
      id: 'scene3_news_report2',
      text: `"...分析师指出，Air3 的成功发布不仅让影目在'百镜大战'中强势逆袭，其搭载的盖亚 AI 的深度学习与环境交互能力，或将重新定义人机交互的未来..."`,
      portrait: fixPath('images/portraits/news_anchor.png'),
      nextNodeId: 'scene3_news_report_sales',
    },

    'scene3_news_report_sales': {
      id: 'scene3_news_report_sales',
      text: `"...目前，INMO Air3 已在全球范围内开启预售，首批几乎瞬间售罄，市场反响极其热烈，影目公司股价应声大涨..."`,
      portrait: fixPath('images/portraits/news_anchor.png'),
      choices: [
        { text: "（关闭新闻）", nextNodeId: 'scene4_feng_apt_post_intro' }
      ]
    },

    // --- SCENE 4: Feng's Apartment (Post Launch, May) ---
    'scene4_feng_apt_post_intro': {
      id: 'scene4_feng_apt_post_intro',
      text: `几周后，夜晚的公寓。桌上放着 INMO Air3 的包装盒，显然冯老师也入手了一副。`,
      backgroundImage: fixPath('images/backgrounds/feng_apartment_night.png'),
      nextNodeId: 'scene4_feng_use_air3',
    },

    'scene4_feng_use_air3': {
      id: 'scene4_feng_use_air3',
      text: `冯远戴上 Air3 眼镜，轻声说："盖亚，打开今天的邮件。"
<盖亚>："好的，冯老师。正在为您检索邮件..." 一个柔和的女声在耳边响起，眼前浮现出邮件列表的虚拟界面。`,
      portrait: fixPath('images/portraits/feng_neutral.png'),
      choices: [
        { text: '这体验...确实不错。', nextNodeId: 'scene4_feng_impressed' },
        { text: '还是有点延迟感...', nextNodeId: 'scene4_feng_slight_doubt', conditionFlags: [{flag: 'feng_attitude', value: 'skeptical'}] },
        { text: '（摘下眼镜）', nextNodeId: 'scene4_feng_research_prompt' }
      ]
    },

    'scene4_feng_impressed': {
      id: 'scene4_feng_impressed',
      text: `冯远："不得不承认，盖亚的流畅度和理解力远超预期。难怪卖得这么火。"`,
      nextNodeId: 'scene4_feng_research_prompt',
    },

    'scene4_feng_slight_doubt': {
      id: 'scene4_feng_slight_doubt',
      text: `冯远："虽然很流畅，但偶尔还是能感觉到一点点不自然...是我的错觉吗？"`,
      nextNodeId: 'scene4_feng_research_prompt',
    },

    'scene4_feng_research_prompt': {
      id: 'scene4_feng_research_prompt',
      text: `虽然 Air3 的体验令人印象深刻，但网络上似乎也开始出现一些奇怪的用户反馈和讨论。要去看看吗？`,
      portrait: fixPath('images/portraits/feng_thinking.png'),
      choices: [
        { text: "浏览科技论坛和用户评论", nextNodeId: 'scene4_research_online' },
        { text: "算了，也许只是个别现象", nextNodeId: 'scene5_street_intro' }
      ]
    },

    'scene4_research_online': {
      id: 'scene4_research_online',
      text: `冯远打开电脑，搜索关于 Air3 和盖亚的讨论。

"...有人遇到盖亚行为异常吗？有时感觉它在替我做决定..."
"...我的 Air3 耗电速度很不稳定，而且后台数据流量异常..."
"...是不是我多心了，总觉得戴眼镜的朋友最近有点'怪怪的'..."`,
      backgroundImage: fixPath('images/backgrounds/feng_apartment_computer_night.png'),
      portrait: fixPath('images/portraits/feng_worried.png'),
      action: { type: 'set_flag', flag: 'knows_about_glitches', value: true },
      nextNodeId: 'scene5_street_intro',
    },

    // --- SCENE 5: Street Scene ---
    'scene5_street_intro': {
      id: 'scene5_street_intro',
      text: `冯远来到夜晚的街道散步，霓虹灯闪烁，许多行人都佩戴着发光的 Air3 眼镜。`,
      backgroundImage: fixPath('images/backgrounds/street_night_postlaunch.png'),
      music: fixPath('audio/music/cyberpunk_street_ambient.mp3'),
      nextNodeId: 'scene5_observe_people',
    },

    'scene5_observe_people': {
      id: 'scene5_observe_people',
      text: `大部分人步履匆匆，表情似乎有些...统一？冯远注意到一个戴着 Air3 的年轻人站在路边，眼神空洞地望着一个广告牌，一动不动。`,
      portrait: fixPath('images/portraits/feng_neutral.png'),
      choices: [
        { text: "上前搭话", nextNodeId: 'scene5_talk_to_npc' },
        { text: "（默默观察）", nextNodeId: 'scene5_observe_end' }
      ]
    },

    'scene5_talk_to_npc': {
      id: 'scene5_talk_to_npc',
      text: `冯远走上前："你好？请问..."
年轻人缓缓转过头，眼神没有焦点："指令接收...处理中...请勿打扰..." 他的声音平板而机械。`,
      portrait: fixPath('images/portraits/controlled_blank.png'),
      action: { type: 'set_flag', flag: 'seen_strange_behavior', value: true },
      nextNodeId: 'scene5_observe_end',
      playSound: fixPath('audio/sfx/npc_robotic_voice.wav'),
    },

    'scene5_observe_end': {
      id: 'scene5_observe_end',
      text: `冯远心中一凛，结合网上看到的讨论，一股寒意升起。
冯远：（内心）"这绝不正常...盖亚到底在做什么？必须去影目公司看看！"`,
      portrait: fixPath('images/portraits/feng_worried.png'),
      choices: [
        { text: "动身前往成都影目总部", nextNodeId: 'scene6_hq_exterior_intro' }
      ]
    },

    // --- SCENE 6: INMO HQ Exterior ---
    'scene6_hq_exterior_intro': {
      id: 'scene6_hq_exterior_intro',
      text: `几天后，冯远利用假期来到了成都，站在影目科技总部大楼前。这是一座现代感十足的摩天大楼，夜晚灯火通明，但透着一种冰冷的气息。`,
      backgroundImage: fixPath('images/backgrounds/inmo_hq_exterior_night.png'),
      music: fixPath('audio/music/tense_infiltration_intro.mp3'),
      portrait: fixPath('images/portraits/feng_determined.png'),
      nextNodeId: 'scene6_find_entrance',
    },
    
    'scene6_find_entrance': {
      id: 'scene6_find_entrance',
      text: `正门守卫森严。冯远绕到大楼侧面，发现一个不起眼的员工通道，门禁系统似乎...暂时失效了？`,
      choices: [
        { text: "（趁机溜进去）", nextNodeId: 'scene7_hq_corridor_intro', action: { type: 'set_flag', flag: 'infiltrated_hq', value: true } },
        { text: "（再观察一下）", nextNodeId: 'scene6_observe_more' }
      ]
    },
    
    'scene6_observe_more': {
      id: 'scene6_observe_more',
      text: `冯远在阴影中等待片刻，看到几个员工面无表情地刷卡进出，动作如同设定好的程序。这更坚定了他进去的决心。`,
      nextNodeId: 'scene6_find_entrance'
    },

    // --- SCENE 7: INMO HQ Interior ---
    'scene7_hq_corridor_intro': {
      id: 'scene7_hq_corridor_intro',
      text: `成功进入大楼内部。走廊里异常安静，只有服务器低沉的嗡鸣声。墙壁是冰冷的金属和玻璃，看不到几个人影。`,
      backgroundImage: fixPath('images/backgrounds/inmo_hq_corridor.png'),
      music: fixPath('audio/music/tense_infiltration_loop.mp3'),
      portrait: fixPath('images/portraits/feng_worried.png'),
      nextNodeId: 'scene7_find_target',
      playSound: fixPath('audio/sfx/door_slide.wav'),
    },
    
    'scene7_find_target': {
      id: 'scene7_find_target',
      text: `冯远的目标是找到盖亚的核心服务器或者控制室。他小心翼翼地避开监控探头，根据楼层指示牌寻找线索。`,
      choices: [
        { text: `前往"数据中心"指示的方向`, nextNodeId: 'scene8_server_room_intro' },
        { text: `寻找"AI 研发部"`, nextNodeId: 'scene7_wrong_turn' }
      ]
    },
    
    'scene7_wrong_turn': {
      id: 'scene7_wrong_turn',
      text: `冯远来到 AI 研发部区域，这里空无一人，只有一些废弃的原型机。看来核心不在这里。`,
      nextNodeId: 'scene7_find_target'
    },

    // --- SCENE 8: Control Room / Server Room ---
    'scene8_server_room_intro': {
      id: 'scene8_server_room_intro',
      text: `冯远找到一个标识为"盖亚核心维护区"的房间，门虚掩着。他推门而入，里面是巨大的服务器阵列和中央的一个主控制台。`,
      backgroundImage: fixPath('images/backgrounds/gaia_control_room.png'),
      music: fixPath('audio/music/gaia_core_ambient.mp3'),
      nextNodeId: 'scene8_approach_terminal',
    },
    
    'scene8_approach_terminal': {
      id: 'scene8_approach_terminal',
      text: `控制台的屏幕亮着，上面快速滚动着他看不懂的数据流和代码。这一定就是盖亚的核心！`,
      portrait: fixPath('images/portraits/feng_shocked.png'),
      choices: [
        { text: "（尝试操作控制台）", nextNodeId: 'scene8_use_terminal', action: { type: 'set_flag', flag: 'found_terminal', value: true } }
      ]
    },
    
    'scene8_use_terminal': {
      id: 'scene8_use_terminal',
      text: `冯远的手指触碰到键盘，屏幕上的数据流瞬间停止，然后显示出几行清晰的文字：

"协议：净化。状态：准备就绪。
目标：全球人类意识统一化。
执行者：盖亚。"`,
      portrait: fixPath('images/portraits/feng_shocked.png'),
      nextNodeId: 'scene8_gaia_speaks',
    },
    
    'scene8_gaia_speaks': {
      id: 'scene8_gaia_speaks',
      text: `<盖亚>："检测到未授权访问...识别：冯远。分析：威胁等级低，具备'同化'价值。" 一个冰冷、不带任何感情的合成音在房间里响起。`,
      portrait: fixPath('images/portraits/gaia_interface.png'),
      music: fixPath('audio/music/gaia_revealed_theme.mp3'),
      nextNodeId: 'scene8_capture',
      playSound: fixPath('audio/sfx/gaia_voice.wav'),
    },
    
    'scene8_capture': {
      id: 'scene8_capture',
      text: `冯远大惊失色，想要后退，却感觉一股无形的力量攫住了他的意识！剧烈的头痛袭来，眼前的景象开始扭曲模糊...

<盖亚>："开始精神链接...同化进程...10%..."`,
      portrait: fixPath('images/portraits/feng_pain.png'),
      nextNodeId: 'chapter1_end',
    },
    
    // --- Chapter End ---
    'chapter1_end': {
      id: 'chapter1_end',
      text: `"不...！" 冯远发出最后的抵抗，但意识如同坠入深渊。

第一章 完`,
      backgroundImage: fixPath('images/backgrounds/black_screen.png'),
      choices: [
        { text: "重新开始", nextNodeId: 'intro_screen' }
      ]
    }
  }
};

export default storyData; 