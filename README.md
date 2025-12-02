# 半导体APC（先进过程控制）数据平台前端

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4-purple?logo=vite)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.10-red?logo=ant-design)](https://ant.design/)
[![React Flow](https://img.shields.io/badge/React%20Flow-11.10-green)](https://reactflow.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一个基于现代前端技术栈构建的、用于半导体制造业的**先进过程控制（APC）数据平台**可视化前端。本系统模拟展示了APC系统中关键的数据集成、处理、监控与分析流程。

![APC 数据平台截图1](https://raw.githubusercontent.com/WT-15/apc-data-platform-ui-demo/main/docs/assets/13a8394b-cdd9-4c6b-b716-c25cad2dbdb4.png)
![APC 数据平台截图2](https://raw.githubusercontent.com/WT-15/apc-data-platform-ui-demo/main/docs/assets/38de21b3-339b-4547-bdb3-bb41bd07494a.png)
![APC 数据平台截图3](https://raw.githubusercontent.com/WT-15/apc-data-platform-ui-demo/main/docs/assets/0516cf47-e92c-48e9-a25b-7d0637c3b712.png)
![APC 数据平台截图4](https://raw.githubusercontent.com/WT-15/apc-data-platform-ui-demo/main/docs/assets/afb99099-c597-40c1-bfae-7450c0940e82.png)
![APC 数据平台截图5](https://raw.githubusercontent.com/WT-15/apc-data-platform-ui-demo/main/docs/assets/f81a31e7-139e-4eea-9e2f-06eaa683b14d.png)


## ✨ 核心特性

- **🏗️ 模块化仪表板**：采用侧边栏导航与内容区分离的经典布局，清晰划分五大功能模块。
- **🔌 数据源管理**：模拟展示各类半导体制造设备（如蚀刻机、量测机）的数据源配置、状态监控与协议管理。
- **🌊 可视化数据流设计**：使用 **React Flow** 构建交互式数据流图，直观呈现从设备数据采集到数据湖的完整ETL/流处理管道。
- **📈 任务与质量监控**：集成统计图表与列表，展示数据处理任务的状态、系统性能指标及数据质量健康度。
- **🔗 数据血缘分析**：通过树形结构追踪数据从源头到模型的完整血缘关系，增强数据可信度与可追溯性。

## 🛠️ 技术栈

| 技术 | 用途 | 版本 |
| :--- | :--- | :--- |
| [React](https://reactjs.org/) | UI组件库与视图构建 | ^18.2 |
| [Vite](https://vitejs.dev/) | 前端构建与开发工具 | ^4.4 |
| [Ant Design](https://ant.design/) | 企业级UI设计语言与React组件库 | ^5.10 |
| [React Flow](https://reactflow.dev/) | 交互式流程图与节点图库 | ^11.10 |
| [Recharts](https://recharts.org/) | 基于React的图表库 | ^2.8 |
| [@ant-design/icons](https://ant.design/components/icon-cn) | Ant Design的图标库 | ^5.2 |

## 🚀 快速开始

### 前置要求
- [Node.js](https://nodejs.org/) (推荐 18.x 或 20.x LTS 版本)
- [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/) 包管理器

### 安装与运行

1.  **克隆项目**
    ```bash
    git clone https://github.com/WT-15/apc-data-platform-ui-demo.git
    cd apc-data-platform # 请切换至你的项目目录名
    ```

2.  **安装依赖**
    ```bash
    npm install
    # 或使用 yarn
    yarn
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    # 或
    yarn dev
    ```
    服务器启动后，在浏览器中打开终端提示的地址（通常是 `http://localhost:5173`）。

4.  **构建与预览生产版本**
    ```bash
    # 构建生产环境代码
    npm run build
    # 本地预览构建结果
    npm run preview
    ```

## 📁 项目结构
```
apc-data-platform/
├── src/
│   ├── components/
│   │   ├── DataSourceConfig.jsx
│   │   ├── DataFlowDesigner.jsx
│   │   ├── TaskFlowMonitor.jsx
│   │   ├── DataLineageView.jsx
│   │   └── DataQualityDashboard.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── .gitignore
```


## 🧩 核心模块详解

### 1. 数据流设计 (`DataFlowDesigner`)
- 使用 **React Flow** 实现了可拖拽、可连接的可视化数据管道。
- 预设了 **数据源节点** (蚀刻机、量测机等)、**处理节点** (数据清洗、特征提取等) 和 **数据湖节点** (Apache Paimon)。
- 连线动画与颜色区分了实时流、事件流与批处理等不同数据流类型。

### 2. 数据源管理 (`DataSourceConfig`)
- 使用 Ant Design 的 `Table`, `Card`, `Tag`, `Modal` 等组件构建。
- 模拟了对半导体制造设备数据源的增删改查与状态管理。

### 3. 监控与看板 (`TaskFlowMonitor`, `DataQualityDashboard`)
- 集成 **Recharts** 绘制了系统性能与数据质量趋势图。
- 使用 `Statistic`, `Timeline`, `Steps` 等组件直观展示任务进度与系统时间线。

## 🤝 如何贡献

欢迎提交 Issue 或 Pull Request 来帮助改进这个项目。
1. Fork 本仓库。
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)。
3. 提交你的更改 (`git commit -m ‘Add some AmazingFeature’`)。
4. 推送到分支 (`git push origin feature/AmazingFeature`)。
5. 开启一个 Pull Request。

## 📄 许可证

本项目基于 **MIT License** 开源。详细信息请查看 [LICENSE](LICENSE) 文件。

---

> **提示**：此项目为**前端演示项目**，专注于展示APC系统的前端界面与交互逻辑，后端数据为静态模拟。