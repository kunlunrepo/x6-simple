<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="dndContainer">
            <div
                    data-type="rect"
                    className="dnd-rect"
                    @mousedown=startDrag
            >
                Rect
            </div>
            <div
                    data-type="circle"
                    className="dnd-circle"
                    @mousedown=startDrag
            >
                Circle
            </div>
        </div>
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Graph, Shape} from "@antv/x6";
import {onMounted} from "vue";
import {Dnd} from '@antv/x6-plugin-dnd'
import {Snapline} from '@antv/x6-plugin-snapline'

// 画布
let graph = null;
let dnd = null;

onMounted(() => {

    // 创建画布
    graph = new Graph({
        container: document.getElementById('container'),
        autoResize: true,
        background: {
            color: '#F2F7FA',
        },
        mousewheel: {
            enabled: true,
            modifiers: ['ctrl', 'meta'],
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

    // 对齐线
    graph.use(
        new Snapline({
            enabled: true,
            sharp: true,
        }),
    )

    const source = graph.addNode({
        x: 130,
        y: 30,
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
        x: 180,
        y: 160,
        width: 100,
        height: 40,
        label: 'World',
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
    graph.centerContent()

    let dndContainer = document.getElementById('dndContainer')

    dnd = new Dnd({
        target: graph,
        scaled: false,
        dndContainer: dndContainer,
        getDragNode: (node) => node.clone({ keepId: true }),
        getDropNode: (node) => node.clone({ keepId: true }),
    })

    // 数据导出
    console.log("画布的数据", graph.toJSON());
})

// 拖动开始调用
const startDrag = (e: any) => {
    const target = e.currentTarget
    const type = target.getAttribute('data-type')
    console.log("拖曳节点类型", type)
    const node = type === 'rect' ? graph.createNode({
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
            : graph.createNode({
                width: 60,
                height: 60,
                shape: 'circle',
                label: 'Circle',
                attrs: {
                    body: {
                        stroke: '#8f8f8f',
                        strokeWidth: 1,
                        fill: '#fff',
                    },
                },
            })

    // console.log(node)
    dnd.start(node, e)
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
    background: #333232 linear-gradient(180deg, rgb(0 0 0 / 10%) 50%, rgb(0 0 0 / 40%));
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
