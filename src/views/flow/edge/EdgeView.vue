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

// 内置-箭头
const markers = [
    'block',
    'classic',
    'diamond',
    'circle',
    'circlePlus',
    'ellipse',
    'cross',
    'async',
]

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

    // 注册定制节点
    Graph.registerNode(
        'custom-node', // 定制节点名称
        {
            inherit: 'rect', // 继承于 rect 节点
            width: 100,
            height: 40,
            markup: [ // HTML
                {
                    tagName: 'rect', // 标签名称
                    selector: 'body', // 选择器
                },
                {
                    tagName: 'image',
                    selector: 'img',
                },
                {
                    tagName: 'text',
                    selector: 'label',
                },
            ],
            attrs: { // CSS
                body: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                },
                img: {
                    'xlink:href':
                        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
                    width: 16,
                    height: 16,
                    x: 12,
                    y: 12,
                },
            },
        }, // 定制节点配置
        true,)
    // 定制-添加节点
    const source = graph.addNode({
        shape: 'custom-node',
        x: 40,
        y: 40,
        label: 'Hello',
    })
    // 定制-添加节点
    const target = graph.addNode({
        shape: 'custom-node',
        x: 300,
        y: 220,
        label: 'World',
    })
    // 添加边
    graph.addEdge({
        source,
        target,
        attrs: { // 边属性
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
        vertices: [ // 顶点
            { x: 100, y: 200,}, // 第一个点
            { x: 300, y: 120,}, // 第二个点
        ],
        router: 'orth', // 路由，对vertices进行处理，还会必要时添加额外点
        // 如果没有 args 参数，可以简写写 connector: 'rounded'
        connector: { // 连接器，对路由的点进行处理
            name: 'rounded',
            args: {},
        },
        labels: [ // 边的标签
            {
                attrs: {
                    label: {
                        text: '40%',
                        stroke: '#aaa',
                    }
                },
                position: 0.4
            },
            {
                attrs: {
                    label: {
                        text: '60%',
                        stroke: '#aaa',
                    }
                },
                position: 0.6
            }
        ]
    })

    // 内置-箭头
    markers.forEach((marker, i) => {
        graph.addEdge({
            sourcePoint: [120, 300 + i * 40],
            targetPoint: [400, 300 + i * 40],
            label: marker,
            attrs: {
                line: {
                    sourceMarker: marker,
                    targetMarker: marker,
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                },
            },
        })
    })

    // 定制-箭头
    graph.addEdge({
        source: [500, 140],
        target: [800, 140],
        label: '自定义箭头',
        attrs: {
            line: {
                sourceMarker: {
                    tagName: 'path',
                    d: 'M 20 -10 0 0 20 10 Z',
                },
                targetMarker: {
                    tagName: 'path',
                    stroke: '#D94111',
                    strokeWidth: 2,
                    fill: '#90C54C',
                    d: 'M 20 -10 0 0 20 10 Z',
                },
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })
})

// 修改节点大小
const onChangeProp = () => {
    const nodes = graph.getNodes();
    nodes.forEach((node) => {
        const width = 100 + Math.floor(Math.random() * 50)
        const height = 40 + Math.floor(Math.random() * 10)
        node.prop('size', {width, height})
    })
}

// 修改节点样式
const onChangeAttr = () => {
    const nodes = graph.getNodes();
    nodes.forEach((node) => {
        const color = Color.random().toHex()
        node.attr('body/fill', color)
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
