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
    // 注册定制节点
    Graph.registerNode(
        'custom-node', // 定制节点名称
        {
            inherit: 'rect', // 继承于 rect 节点
            width: 100,
            height: 40,
            attrs: { // CSS
                body: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                },
            },
        }, // 定制节点配置
        true,)
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
        embedding: {
            enabled: true,
            findParent({ node }) {
                const bbox = node.getBBox()
                return graph.getNodes().filter((node) => {
                    const data = node.getData<{ parent: boolean }>()
                    if (data && data.parent) {
                        const targetBBox = node.getBBox()
                        return bbox.isIntersectWithRect(targetBBox)
                    }
                    return false
                })
            },
        },
    })
    // 开启画布平移
    graph.enablePanning();
    // 开启画布滚轮缩放
    graph.enableMouseWheel();
    // console.log(graph);
    // 属性：居中显示
    // graph.centerContent()


    graph.addNode({
        shape: 'custom-node',
        x: 40,
        y: 140,
        width: 120,
        height: 60,
        label: 'Child\n(unembed)',
        zIndex: 10,
    })

    graph.addNode({
        shape: 'custom-node',
        x: 500,
        y: 100,
        width: 120,
        height: 60,
        label: 'Child\n(unembed)',
        zIndex: 10,
    })

    graph.addNode({
        shape: 'custom-node',
        x: 200,
        y: 80,
        width: 240,
        height: 160,
        zIndex: 1,
        label: 'Parent',
        data: {
            parent: true,
        },
    })

    graph.on('node:change:parent', ({ node }) => {
        node.attr({
            label: {
                text: 'Child\n(embed)',
            },
        })
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
