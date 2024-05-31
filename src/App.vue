<template>
  <!--画布容器-->
    <div style="width: 100vw; height: 100vh" className="backgournd-grid-app">
        <div id="container" class="app-content"></div>
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
    graph.centerContent()

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

    // 内置-添加节点 (长方形)
    graph.addNode({
        shape: 'rect',
        x: 40,
        y: 40,
        width: 80,
        height: 40,
        label: '长方形',
        attrs: commonAttrs
    })
    // 内置-添加节点 (圆形)
    graph.addNode({
        shape: 'circle',
        x: 180,
        y: 40,
        width: 40,
        height: 40,
        label: '圆',
        attrs: commonAttrs
    })
    // 内置-添加节点 (椭圆)
    graph.addNode({
        shape: 'ellipse',
        x: 280,
        y: 40,
        width: 80,
        height: 40,
        label: '椭圆',
        attrs: commonAttrs,
    })
    // 内置-添加节点 (多边形)
    graph.addNode({
        shape: 'path',
        x: 420,
        y: 40,
        width: 40,
        height: 40,
        path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
        attrs: commonAttrs,
        label: '心形',
    })
    // 内置-添加节点 (五角星)
    graph.addNode({
        shape: 'polygon',
        x: 60,
        y: 150,
        width: 40,
        height: 40,
        points: '100,10 40,198 190,78 10,78 160,198',
        attrs: commonAttrs,
        label: '五角星',
    })
    // 内置-添加节点 (折线)
    graph.addNode({
        shape: 'polyline',
        x: 180,
        y: 150,
        width: 40,
        height: 40,
        label: '折线',
        attrs: {
            body: {
                ...commonAttrs.body,
                refPoints: '0,0 0,10 10,10 10,0',
            },
            label: commonAttrs.label,
        },
    })
    // 内置-添加节点 (图片)
    graph.addNode({
        shape: 'image',
        x: 290,
        y: 150,
        width: 60,
        height: 40,
        imageUrl:
            'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg',
        label: '图片',
        attrs: commonAttrs,
    })


    // 数据导出
    // console.log("画布的数据", graph.toJSON());
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
