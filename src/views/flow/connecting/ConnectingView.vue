<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div style="display: flex; flex-direction: column; margin-right: 10px">
            <div><input type="checkbox" v-model="allowBlank" @change="onChange('allowBlank')">allowBlank</div>
            <div><input type="checkbox" v-model="allowMulti" @change="onChange('allowMulti')">allowMulti</div>
            <div><input type="checkbox" v-model="allowLoop" @change="onChange('allowLoop')">allowLoop</div>
            <div><input type="checkbox" v-model="allowNode" @change="onChange('allowNode')">allowNode</div>
            <div><input type="checkbox" v-model="allowEdge" @change="onChange('allowEdge')">allowEdge</div>
            <div><input type="checkbox" v-model="allowPort" @change="onChange('allowPort')">allowPort</div>
        </div>
        <div id="container" class="app-content"></div>
    </div>
</template>

<script setup lang="ts">
import {Color, Graph, Shape} from "@antv/x6";
import {onMounted, ref} from "vue";

// 画布
let graph = null

// 连线配置
const allowBlank = ref(true)
const allowMulti = ref(true)
const allowLoop = ref(true)
const allowNode = ref(true)
const allowEdge = ref(true)
const allowPort = ref(true)

onMounted(() => {
    initData()
})

const initData = () => {
    if (graph) {
        // 销毁画布
        graph.dispose()
    }
    // 连线配置
    const options = {
        allowBlank: allowBlank.value,
        allowMulti: allowMulti.value,
        allowLoop: allowLoop.value,
        allowNode: allowNode.value,
        allowEdge: allowEdge.value,
        allowPort: allowPort.value
    }

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
            ...options, // 连线配置
            createEdge: () => { // 连线样式
                return new Shape.Edge({
                    attrs: {
                        line: {
                            stroke: '#A2B1C3',
                            strokeWidth: 2,
                        },
                    },
                })
            }
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
        x: 60,
        y: 50,
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
        ports: {
            groups: {
                in: {
                    position: 'top',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
                out: {
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
            items: [
                {
                    id: 'port1',
                    group: 'in',
                },
                {
                    id: 'port2',
                    group: 'in',
                },
                {
                    id: 'port3',
                    group: 'in',
                },
                {
                    id: 'port4',
                    group: 'out',
                },
                {
                    id: 'port5',
                    group: 'out',
                },
            ],
        },
    })

    graph.addNode({
        x: 160,
        y: 200,
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
        ports: {
            groups: {
                in: {
                    position: 'top',
                    attrs: {
                        circle: {
                            magnet: true,
                            stroke: '#8f8f8f',
                            r: 5,
                        },
                    },
                },
                out: {
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
            items: [
                {
                    id: 'port1',
                    group: 'in',
                },
                {
                    id: 'port2',
                    group: 'in',
                },
                {
                    id: 'port3',
                    group: 'in',
                },
                {
                    id: 'port4',
                    group: 'out',
                },
                {
                    id: 'port5',
                    group: 'out',
                },
            ],
        },
    })

    graph.addEdge({
        source: [320, 80],
        target: [500, 200],
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })
}

const onChange = () => {
   initData();
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
