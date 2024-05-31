<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Color, Graph} from "@antv/x6";
import {onMounted} from "vue";

// 画布
let graph = null

// 节点和边的数据
const data = {
    nodes: [
        {
            id: 'node1',
            shape: 'rect',
            x: 40,
            y: 40,
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
        },
        {
            id: 'node2',
            shape: 'rect',
            x: 160,
            y: 180,
            width: 100,
            height: 40,
            label: 'world',
            attrs: {
                body: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                },
            },
        },
    ],
    edges: [
        {
            shape: 'edge',
            source: 'node1',
            target: 'node2',
            label: 'x6',
            attrs: {
                line: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                },
            },
        },
    ],
}

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

    // 渲染数据
    graph.fromJSON(data)


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
</style>
