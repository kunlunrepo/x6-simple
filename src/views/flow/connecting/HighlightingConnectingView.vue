<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Color, Graph, Shape} from "@antv/x6";
import {onMounted, ref} from "vue";
import {ValidateConnectionArgs} from "@antv/x6/src/graph/options";

// 画布
let graph = null


onMounted(() => {
    initData()
})

const initData = () => {

    // 自定义节点
    Graph.registerNode(
        'custom-node-width-port',
        {
            inherit: 'rect',
            width: 100,
            height: 40,
            attrs: {
                body: {
                    stroke: '#8f8f8f',
                    strokeWidth: 1,
                    fill: '#fff',
                    rx: 6,
                    ry: 6,
                },
            },
            ports: { // 连接桩
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                magnet: true,
                                stroke: '#8f8f8f',
                                r: 5,
                            },
                        },
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                magnet: true,
                                stroke: '#8f8f8f',
                                r: 5,
                            },
                        },
                    },
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
        connecting: {
            allowNode: false,
            allowBlank: false,
            highlight: true, // 连线高亮
            // 连线样式
            createEdge: () => {
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#8f8f8f',
                            strokeWidth: 2,
                        },
                    },
                })
            },
        },
        // 高亮配置
        highlighting: {
            // 连接桩可以被连接时在连接桩外围围渲染一个包围框
            magnetAvailable: {
                name: 'stroke',
                args: {
                    attrs: {
                        fill: '#fff',
                        stroke: '#A4DEB1',
                        strokeWidth: 4,
                    },
                },
            },
            // 连接桩吸附连线时在连接桩外围围渲染一个包围框
            magnetAdsorbed: {
                name: 'stroke',
                args: {
                    attrs: {
                        fill: '#fff',
                        stroke: '#31d0c6',
                        strokeWidth: 4,
                    },
                },
            },
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

    graph.addNode({
        shape: 'custom-node-width-port',
        x: 40,
        y: 40,
        label: 'hello',
        ports: {
            items: [
                {
                    id: 'port_1',
                    group: 'bottom',
                },
                {
                    id: 'port_2',
                    group: 'bottom',
                },
            ],
        },
    })

    graph.addNode({
        shape: 'custom-node-width-port',
        x: 160,
        y: 180,
        label: 'world',
        ports: {
            items: [
                {
                    id: 'port_3',
                    group: 'top',
                },
                {
                    id: 'port_4',
                    group: 'top',
                },
            ],
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
