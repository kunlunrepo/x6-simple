<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Color, Graph} from "@antv/x6";
import {onMounted} from "vue";
import ProgressNode from "@/views/flow/adv/vue/ProgressNode.vue";
import {register} from '@antv/x6-vue-shape'
import {ElButton} from "element-plus";

// 画布
let graph = null;
let node = null;

// 注册Vue节点
register(
    {
        shape: 'custom-vue-node', // 定制节点名称
        width: 100,
        height: 100,
        component: ProgressNode,
    }, // 定制节点配置
)

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


    // 定制-添加Vue节点
    node = graph.addNode({
        shape: 'custom-vue-node',
        x: 100,
        y: 60,
    })
    // 数据导出
    console.log("画布的数据", graph.toJSON());

    // node.on('change:data', ({ current }) => {
    //     console.log("节点数据变化：", current)
    // })
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
