# 盖亚阴谋 (Gaia Conspiracy)

互动式文字冒险游戏，讲述了一个关于人工智能控制人类的科幻故事。

## 游戏简介

2025年，增强现实（AR）技术渗透日常，一场被称为'百镜大战'的科技竞赛进入白热化。
影目（INMO）公司推出的盖亚AI系统似乎有着不为人知的计划...

## 技术栈

- React
- Vite
- styled-components
- React Router

## 本地开发

1. 克隆仓库
```
git clone <仓库URL>
cd webgame
```

2. 安装依赖
```
npm install
```

3. 启动开发服务器
```
npm run dev
```

4. 构建生产版本
```
npm run build
```

## Vercel部署

此项目已配置为可直接部署到Vercel。只需将代码推送到GitHub仓库，并在Vercel中导入该仓库即可。

## 游戏资源

游戏需要以下资源文件（需要自行添加到public目录）：

### 背景图片 (public/images/backgrounds/)
- intro_logo.png - 游戏Logo或开场图
- feng_apartment_morning.png - 冯远的公寓（早晨）
- feng_apartment_night.png - 冯远的公寓（夜晚）
- 等...

### 头像 (public/images/portraits/)
- feng_neutral.png - 冯远（普通表情）
- feng_thinking.png - 冯远（思考）
- 等...

### 音乐和音效
- 参考public/audio目录下的placeholder文件
