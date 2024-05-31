<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh">
        <div id="container"></div>
    </div>
</template>

<script setup lang="ts">
import {Graph} from "@antv/x6";
import {onMounted} from "vue";

/**
 * 节点和连线的数据
 * nodes=节点
 * edges=连线
 */
const data: any = {
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
                // body 是选择器名称，选中的是 rect 元素
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
                // line 是选择器名称，选中的边的 path 元素
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
    const graph = new Graph({
        container: document.getElementById('container'),
        width: 800,
        height: 600,
        background: {
            color: '#F2F7FA'
        },
        autoResize: true
    })
    // console.log(graph);

    // 数据渲染
    graph.fromJSON(data)
    // 属性：居中显示
    graph.centerContent()
    // 数据导出
    console.log("画布的数据", graph.toJSON());
})


</script>

<style scoped>

</style>
