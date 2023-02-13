# Vue 3.2 + TypeScript + Vite + Pinia

## 🚩搭建Vue3项目，开箱即用的模版 

:white_check_mark: Svg (`矢量图形`)

:white_check_mark: Mitt  (`组件通信`)

:white_check_mark: Sass (`样式处理`)

:white_check_mark: Pinia (`状态管理`)

:white_check_mark: Axios (`HTTP库`)

:white_check_mark: Eslint (`代码检查`)

:white_check_mark: Echarts (`图表`)

:white_check_mark: Prettier (`代码格式化`)

:white_check_mark: Ant design (`Ui框架按需引入`)


:white_check_mark: 高德地图 (`基础地图`)

:white_check_mark: NProgress (`页面进度`)

:white_check_mark: @vueuse/motion (`组件动画` https://motion.vueuse.org/)



# 🏃如何运行

1. `git clone git@github.com:tsinghua-lau/one-step.git`
2. yarn install
3. yarn run dev
3. 本地访问 http://127.0.0.1:8088  在线访问 https://one-step-ten.vercel.app/

# 🛂代码检查

`yarn run lint` 

# 🖼️预览

#### 登录
![image](https://github.com/tsinghua-lau/one-step/blob/master/src/assets/preview/index.png?raw=true)

#### 图表
![image](https://github.com/tsinghua-lau/one-step/blob/master/src/assets/preview/echarts.png?raw=true)

#### 高德地图
![image](https://github.com/tsinghua-lau/one-step/blob/master/src/assets/preview/gd.png?raw=true)

#### 列表
![image](https://github.com/tsinghua-lau/one-step/blob/master/src/assets/preview/list.gif?raw=true)

# 动机 😛
为什么要搭建这个```项目模版```？
 * 节省开发时间提高效率
 * 结合主流项目规范化项目架构

# 适合 😀
什么时候适合用？
 * 不想一步步集成项目节省时间
 * 尝试规范话项目代码结构 
 * 学习Ts如何在V3项目具体使用场景

# 还在维护中👋

# Major bug 🐛

* 某次安装依赖后项目启动白屏，控制台无报错，首页需要40s甚至更久，加载出首页后页面点击无法跳转，整个项目无法使用。ant-design-vue + vite，使用按需引入的方式，启动 vite 服务时会对 style 进行依赖预构建，在切换不同路由时如果其他模块有使用到新的组件，页面会卡住直至 dependencies optimized 完成。
终端输出：
![image](https://user-images.githubusercontent.com/43164478/218356564-a4c87fd2-bafe-4c42-902c-039e123fd25a.png)



尝试方法：
* 删除依赖重新install
* 拉取仓库历史版本
* 新建项目将代码复制

最终解决: 

开发环境全部导入Ant组件，打包时用按需导入。
修改文件"tsconfig.json" & "vite.config.ts"
详情查看仓库提交历史

 
 


# 最后 🤭
由于水平和时间有限，难免会有错误，欢迎提出Issues，也很欢迎Star

