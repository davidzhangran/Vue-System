import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// 文件引入过后自动运行，组件在这里已经全局注册，名称在这个文件里也已经取好了

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
    // 其组件目录的相对路径
    './components/',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /[\w-]+\.vue$/
)

requireComponent.keys().forEach((fileName) => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            fileName
                // Remove the "./_" from the beginning
                .replace(/^\.\/_/, '')
                // Remove the file extension from the end
                .replace(/\.\w+$/, '')
        )
    )
    console.log(componentName);
    // 全局注册组件
    Vue.component(componentName, componentConfig.default || componentConfig)
})