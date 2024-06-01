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
    // if (graph) {
    //     // 销毁画布
    //     graph.dispose()
    // }

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
        connecting: {
            sourceAnchor: {
                name: 'right', // 锚点会在节点右侧中心往上偏移 10px
                args: {
                    dy: -10,
                },
            },
            targetAnchor: {
                name: 'right', // 锚点会在节点右侧中心往上偏移 10px
                args: {
                    dy: -10,
                },
            },
            connectionPoint: 'anchor',
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

    // 添加节点
    const source = graph.addNode({
        shape: 'rect',
        x: 40,
        y: 40,
        width: 80,
        height: 40,
        label: '长方形',
        attrs: commonAttrs
    })

    // 添加节点
    const target = graph.addNode({
        shape: 'rect',
        x: 200,
        y: 100,
        width: 80,
        height: 40,
        label: '长方形',
        attrs: commonAttrs
    })

    // 也可以在创建连线的时候配置，优先级更高
    graph.addEdge({
        source: {
            cell: source,
            anchor: { // 锚点会在节点右侧中心往上偏移 10px
                name: 'right',
                args: {
                    dy: -10,
                },
            },
            connectionPoint: 'anchor',
        },
        target: {
            cell: target,
            anchor: { // 锚点会在节点左侧中心往上偏移 10px
                name: 'left',
                args: {
                    dy: -10,
                },
            },
            connectionPoint: 'anchor',
        },
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
