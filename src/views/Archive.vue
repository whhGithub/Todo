<template>
     <n-space vertical>
        <n-list v-if="finishlist.length">
            <draggable
                :list="finishlist"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
            >
                <template #item="{ index, element }">
                    <task-item
                        :taskIndex="index"
                        :task="element"
                        @back="() => onBack(index)"
                    />
                </template>
            </draggable>
        </n-list>
    </n-space>

</template>

<script setup>
import { NH1 } from "naive-ui";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
    NList,
    NListItem,
    NButton,
    NSpace,
    NThing,
    NModal,
    NInput,
} from "naive-ui";
import TaskItem from "../components/finishTaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from 'uuid';
const store = useStore();
const finishlist = computed(() => store.state.finish);
const onBack = (index) => {
    store.commit("backTask", index);
};
</script>

<style scoped>
.extra {
    display: flex;
    justify-content: center;
}
</style>

