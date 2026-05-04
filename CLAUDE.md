# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 **微博/动态社区应用**，采用 Vue 3 + Node.js 全栈架构。

## 技术栈

- **前端**: Vue 3 (client/)
- **后端**: Node.js + Koa (server/)

## 目录结构

```
chenApp/
├── client/                 # Vue 3 前端
│   └── src/
│       ├── api/            # API 请求封装
│       ├── components/     # 公共组件
│       ├── router/         # 路由配置
│       ├── stores/         # 状态管理 (Pinia)
│       ├── views/          # 页面视图
│       ├── App.vue         # 根组件
│       └── main.js        # 入口文件
├── server/                 # Node.js 后端
│   ├── config/            # 配置文件
│   ├── middleware/        # 中间件
│   ├── models/            # 数据模型
│   ├── routes/            # 路由
│   ├── utils/             # 工具函数
│   └── package.json
└── package.json           # 根目录配置
```

## 核心功能需求

1. **用户认证**: 注册、登录、JWT token
2. **动态发布**: 文字、图片、话题标签
3. **社交关系**: 关注/粉丝、点赞、评论、转发
4. **信息流**: 关注的人的最新动态

## 协作方式

**只提供思路和提示，代码由用户自己编写。**

## 开发命令

尚未配置，需在 package.json 中添加:
- 前端开发服务器启动命令
- 后端服务启动命令
- 构建、测试等脚本