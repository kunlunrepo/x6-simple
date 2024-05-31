<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <button style="width: 100px; height: 50px" @click="onChangeProp">修改prop</button>
        <button style="width: 100px; height: 50px" @click="onChangeAttr">修改attr</button>
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Color, Graph} from "@antv/x6";
import {onMounted} from "vue";

// 画布
let graph = null

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

    // 修改边
    const source = graph.addNode({
        shape: 'rect',
        x: 100,
        y: 100,
        width: 100,
        height: 40,
        label: 'hello',
        attrs: {
            body: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
                fill: '#fff',
                rx: 6,
                ry: 6,
            },
        },
    })

    // 修改边
    const target = graph.addNode({
        shape: 'rect',
        x: 500,
        y: 100,
        width: 100,
        height: 40,
        label: 'hello2',
        attrs: {
            body: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
                fill: '#fff',
                rx: 6,
                ry: 6,
            },
        },
    })

    graph.addEdge({
        source,
        target,
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })

})

// 修改顶点
const onChangeProp = () => {
    const edges = graph.getEdges();
    edges.forEach((edge) => {
        const x = Math.floor(Math.random() * 600)
        const y = Math.floor(Math.random() * 200)
        edge.prop('vertices', [[x, y]])
    })
}

// 修改边样式
const onChangeAttr = () => {
    const edges = graph.getEdges();
    edges.forEach((edge) => {
        const color = Color.random().toHex()
        edge.attr('line/stroke', color)
    })
}
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
</style>
