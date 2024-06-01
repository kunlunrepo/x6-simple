<template>
  <!--方案1、方案2 (element-plus)-->
  <!--    <el-progress type="dashboard" :percentage="percentage" :width="80">
          <template #default="{ percentage }">
              <span class="percentage-value">{{ percentage }}%</span>
          </template>
      </el-progress>
      <el-button type="primary" size="mini" @click="percentage = 100">
          完成
      </el-button>-->
  <!--方案1 (ant-design-vue)-->
    <div style="width:300px; height: 500px; background-color: white">
        <div>系统配置</div>

        <div>
            <div>对话开场白</div>
            <a-textarea v-model:value="chatStartTip" show-count :maxlength="100" />
            <a-switch v-model:checked="stateSwitch" />
            <a-slider id="test" v-model:value="value1" :disabled="disabled" />

        </div>
<!--        <a-steps
                direction="vertical"
                size="small"
                :current="1"
                :items="[
      { title: '完成', description },
      {
        title: '进行中',
        description,
      },
      {
        title: '等待',
        description,
      },
    ]"
        ></a-steps>-->
    </div>
</template>

<!--方案1 (element-plus)-->
<!--<script lang="ts" setup>
import { ElButton, ElProgress } from 'element-plus';
import {ref} from "vue";
const percentage = ref(80)
</script>-->

<!--方案2 (element-plus)-->
<!--<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus';

export default defineComponent({
    name: 'ProgressNode',
    components: {
        ElButton,
    },
    // inject: ['getNode'],
    data() {
        return {
            percentage: 80,
        }
    },
    mounted() {
        // const node = (this as any).getNode()
        console.log("自定义节点渲染")
    },
})

</script>-->

<!--方案3 (ant-design-vue)-->
<script lang="ts" setup>
import {Button as AButton, Steps as ASteps, Row as ARow, Col as ACol,
    Textarea as ATextarea, Switch as ASwitch, Slider as ASlider} from 'ant-design-vue'
import {ref} from "vue";

const percentage = ref(80)
const description = '这是步骤条';
const chatStartTip = ref('欢迎来到我的世界')
const stateSwitch = ref(true)
const value1 = ref<number>(0);
const disabled = ref<boolean>(false);


</script>

<style scoped>
.gutter-box {
    background: #0092ff;
    padding: 8px 0;
}
</style>
