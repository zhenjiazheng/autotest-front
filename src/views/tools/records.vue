<template>
    <div>

        <Tool ref="toolRef" header="" row-key="id" show-index :columns="editColumns" class="component">
            <template #default>
                <ToolItem v-for="(item, index) in editColumns" :key="index" :width="item.width" v-bind="item" >
                    <template #edit></template>
                </ToolItem>
                <ToolItem label="操作" :required="false" fixed="right" width="150">
                    <template #edit="{ actions, index, row}">
                        <el-button type="primary" @click="actions.runRow(row)">详情</el-button>
                        <el-button type="primary" @click="actions.deleteRow(index)">删除</el-button>
                    </template>
                </ToolItem>
            </template>
        </Tool>
    </div>
</template>

<script setup lang="ts">
import { editColumns } from './tool_conf';

/**
 * table ref
 */
const toolRef = ref();
</script>
<style lang="scss" scoped>
.component {
    margin-bottom: 10px;
}
</style>