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

onMounted(() => {
    // 注册-自定义边
    Graph.registerEdge('double-edge', {
        inherit: 'edge',
        markup: [
            {
                tagName: 'path',
                selector: 'outline',
                attrs: {
                    fill: 'none',
                },
            },
            {
                tagName: 'path',
                selector: 'line',
                attrs: {
                    fill: 'none',
                    cursor: 'pointer',
                },
            },
        ],
        attrs: {
            line: {
                connection: true,
                stroke: '#dddddd',
                strokeWidth: 4,
                strokeLinejoin: 'round',
                targetMarker: {
                    tagName: 'path',
                    stroke: '#000000',
                    d: 'M 10 -3 10 -10 -2 0 10 10 10 3',
                },
            },
            outline: {
                connection: true,
                stroke: '#000000',
                strokeWidth: 6,
                strokeLinejoin: 'round',
            },
        },
    })

    // 注册-自定义边
    Graph.registerEdge('shadow-edge', {
        inherit: 'edge',
        markup: [
            {
                tagName: 'path',
                selector: 'shadow',
                attrs: {
                    fill: 'none',
                },
            },
            {
                tagName: 'path',
                selector: 'line',
                attrs: {
                    fill: 'none',
                    cursor: 'pointer',
                },
            },
        ],
        attrs: {
            line: {
                connection: true,
                stroke: '#dddddd',
                strokeWidth: 20,
                strokeLinejoin: 'round',
                targetMarker: {
                    name: 'path',
                    stroke: 'none',
                    d: 'M 0 -10 -10 0 0 10 z',
                    offsetX: -5,
                },
                sourceMarker: {
                    name: 'path',
                    stroke: 'none',
                    d: 'M -10 -10 0 0 -10 10 0 10 0 -10 z',
                    offsetX: -5,
                },
            },
            shadow: {
                connection: true,
                refX: 3,
                refY: 6,
                stroke: '#000000',
                strokeOpacity: 0.2,
                strokeWidth: 20,
                strokeLinejoin: 'round',
                targetMarker: {
                    name: 'path',
                    d: 'M 0 -10 -10 0 0 10 z',
                    stroke: 'none',
                    offsetX: -5,
                },
                sourceMarker: {
                    name: 'path',
                    stroke: 'none',
                    d: 'M -10 -10 0 0 -10 10 0 10 0 -10 z',
                    offsetX: -5,
                },
            },
        },
    })

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


    // 定制-自定义边
    graph.addEdge({
        shape: 'double-edge',
        source: [500, 200],
        target: [900, 200],
    })

    // 定制-自定义边
    graph.addEdge({
        shape: 'shadow-edge',
        source: [500, 280],
        target: [1000, 280],
    })
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
