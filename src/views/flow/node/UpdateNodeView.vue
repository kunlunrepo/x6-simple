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
    // 数据渲染
    // graph.fromJSON(data)
    // 属性：居中显示
    // graph.centerContent()

    // 节点属性
    const commonAttrs = {
        body: {
            fill: '#fff',
            stroke: '#8f8f8f',
            strokeWidth: 1,
        },
        label: {
            refX: 0.5,
            refY: '100%',
            refY2: 4,
            textAnchor: 'middle',
            textVerticalAnchor: 'top',
        },
    }

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
        x: 120,
        y: 240,
        label: 'Hello',
    })
    // 定制-添加节点
    const target = graph.addNode({
        shape: 'custom-node',
        x: 520,
        y: 300,
        label: 'World',
    })
    // 添加边
    graph.addEdge({
        source,
        target,
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        }
    })
    // 数据导出
    // console.log("画布的数据", graph.toJSON());
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
