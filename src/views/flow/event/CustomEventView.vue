<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Color, Graph, Shape} from "@antv/x6";
import {onMounted, ref} from "vue";


// 画布
let graph = null


onMounted(() => {
    initData()
})

const initData = () => {

    // 自定义节点
    Graph.registerNode(
        'custom-click-node',
        {
            markup: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
                {
                    tagName: 'g',
                    children: [
                        {
                            tagName: 'text',
                            selector: 'btnText',
                        },
                        {
                            tagName: 'rect',
                            selector: 'btn',
                        },
                    ],
                },
            ],
            attrs: {
                btn: {
                    refX: '100%',
                    refX2: -28,
                    y: 4,
                    width: 24,
                    height: 18,
                    rx: 10,
                    ry: 10,
                    fill: 'rgba(255,255,0,0.01)',
                    stroke: 'red',
                    cursor: 'pointer',
                    event: 'node:delete',
                },
                btnText: {
                    fontSize: 14,
                    fill: 'red',
                    text: 'x',
                    refX: '100%',
                    refX2: -19,
                    y: 17,
                    cursor: 'pointer',
                    pointerEvent: 'none',
                },
                body: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                    refWidth: '100%',
                    refHeight: '100%',
                },
                label: {
                    fontSize: 14,
                    fill: '#333333',
                    refX: '50%',
                    refY: '50%',
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                },
            },
        },
        true,
    )
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
    // 数据渲染
    // graph.fromJSON(data)
    // 属性：居中显示
    // graph.centerContent()

    const source = graph.addNode({
        shape: 'custom-click-node',
        x: 40,
        y: 80,
        width: 120,
        height: 40,
        attrs: {
            label: {
                text: 'Source',
            },
        },
    })

    const target = graph.addNode({
        shape: 'custom-click-node',
        x: 360,
        y: 80,
        width: 120,
        height: 40,
        attrs: {
            label: {
                text: 'Target',
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

    // 删除节点 自定义事件
    graph.on('node:delete', ({ view, e }: any) => {
        console.log('node:delete', view)
        e.stopPropagation()
        view.cell.remove()
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
