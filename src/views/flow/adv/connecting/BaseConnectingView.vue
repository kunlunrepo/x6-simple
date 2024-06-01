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
    Graph.registerNode(
        'custom-node',
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
        shape: 'custom-node',
        x: 40,
        y: 200,
        label: 'hello',
    })

    const target = graph.addNode({
        shape: 'custom-node',
        x: 300,
        y: 80,
        label: 'world',
    })

    graph.addEdge({
        source: {
            cell: source,
            anchor: {
                name: 'right',
                args: {
                    dy: -10,
                },
            },
            connectionPoint: 'anchor',
        },
        target: {
            cell: target,
            anchor: {
                name: 'left',
                args: {
                    dy: -10,
                },
            },
            connectionPoint: 'anchor',
        },
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })

    graph.addEdge({
        source: {
            cell: source,
            anchor: {
                name: 'right',
            },
            connectionPoint: 'anchor',
        },
        target: {
            cell: target,
            anchor: {
                name: 'left',
            },
            connectionPoint: 'anchor',
        },
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
        },
    })

    graph.addEdge({
        source: {
            cell: source,
            anchor: {
                name: 'right',
                args: {
                    dy: 10,
                },
            },
            connectionPoint: 'anchor',
        },
        target: {
            cell: target,
            anchor: {
                name: 'left',
                args: {
                    dy: 10,
                },
            },
            connectionPoint: 'anchor',
        },
        attrs: {
            line: {
                stroke: '#8f8f8f',
                strokeWidth: 1,
            },
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
