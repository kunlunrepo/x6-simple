<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import { Graph, Shape} from "@antv/x6";
import {onMounted} from "vue";

// 画布
let graph = null;

// 注册Html节点
Shape.HTML.register({
    shape: 'custom-html',
    width: 160,
    height: 80,
    effect: ['data'],
    html() {
        const div = document.createElement('div')
        div.className = 'custom-html'
        return div
    },
})

onMounted(() => {

    // 创建画布
    graph = new Graph({
        container: document.getElementById('container'),
        autoResize: true,
        background: {
            color: '#F2F7FA',
        },
        grid: {
            visible: true,
            type: 'doubleMesh',
            args: [
                {
                    color: '#eee', // 主网格线颜色
                    thickness: 1, // 主网格线宽度
                },
                {
                    color: '#ddd', // 次网格线颜色
                    thickness: 1, // 次网格线宽度
                    factor: 4, // 主次网格线间隔
                },
            ],

        },
    })
    // 开启画布平移
    graph.enablePanning();
    // 开启画布滚轮缩放
    graph.enableMouseWheel();
    // console.log(graph);
    // 属性：居中显示
    // graph.centerContent()


    // 定制-添加Html节点
    graph.addNode({
        shape: 'custom-html',
        x: 60,
        y: 100,
    })

    // 数据导出
    console.log("画布的数据", graph.toJSON());

})



</script>

<style>
.backgournd-grid-app {
    display: flex;
    width: 100%;
    padding: 0;
    font-family: sans-serif;

    .app-content {
        flex: 1;
        height: 280px;
        margin-right: 8px;
        margin-left: 8px;
        border-radius: 5px;
        box-shadow: 0 12px 5px -10px rgb(0 0 0 / 10%), 0 0 4px 0 rgb(0 0 0 / 10%);
    }
}
.custom-html {
    width: 100%;
    height: 100%;
    background: #333232;
    border-radius: 1em;
    box-shadow: 0 0.125em 0.3125em rgb(0 0 0 / 25%),
    0 0.02125em 0.06125em rgb(0 0 0 / 25%);
    perspective: 600px;
}
.custom-html:before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 50%;
    background: #333232
    linear-gradient(180deg, rgb(0 0 0 / 10%) 50%, rgb(0 0 0 / 40%));
    border-radius: 0 0 1em 1em;
    transform: rotateX(180deg);
    transform-origin: center top;
    transition: 0.7s ease-in-out transform;
    content: ' ';
}
.custom-html:hover:before {
    transform: rotateX(0);
}
</style>
