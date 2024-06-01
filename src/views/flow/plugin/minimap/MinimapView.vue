<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
        <div id="app-minimap"/>
    </div>
</template>

<script setup lang="ts">
import { Graph, Shape} from "@antv/x6";
import {onMounted} from "vue";
import { MiniMap } from '@antv/x6-plugin-minimap'
// 画布
let graph = null;

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

    // 小地图
    graph.use(
        new MiniMap({
            container: document.getElementById("app-minimap"),
            width: 200,
            height: 160,
            padding: 10,
            // graphOptions: { // 控制小地图渲染方式，尽量不用
            //     createCellView(cell) {
            //         // 可以返回三种类型数据
            //         // 1. null: 不渲染
            //         // 2. undefined: 使用 X6 默认渲染方式
            //         // 3. CellView: 自定义渲染
            //         if (cell.isEdge()) {
            //             return null
            //         }
            //         if (cell.isNode()) {
            //             return null
            //         }
            //     },
            // },
        }),
    )

    graph.addNode({
        x: 200,
        y: 100,
        width: 100,
        height: 40,
        label: 'Rect',
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

    const source = graph.addNode({
        x: 32,
        y: 32,
        width: 100,
        height: 40,
        label: 'Hello',
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

    const target = graph.addNode({
        shape: 'circle',
        x: 160,
        y: 180,
        width: 60,
        height: 60,
        label: 'World',
        attrs: {
            body: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
                fill: '#fff',
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


    // 数据导出
    console.log("画布的数据", graph.toJSON());
})


// 取消
const onUndo = () => {
    graph.undo();
}

// 重做
const  onRedo = () => {
    graph.redo();
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
