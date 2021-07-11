<template>
<div>
    <n-space vertical>
        <n-list v-if="list.length">
            <draggable
                :list="list"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
            >
                <template #item="{ index, element }">
                    <task-item
                        :taskIndex="index"
                        :task="element"
                        @delete="() => onDelete(index)"
                        @finish="() => onFinish(index)"
                        @edit="() => onEdit(index,element.content)"
                    />
                </template>
            </draggable>
        </n-list>
        <n-thing v-else> 请添加待办任务 </n-thing>
        <div class="extra">
            <n-button @click="showModal = true"> 添加 </n-button>
        </div>
    </n-space>

    <n-modal
        v-model:show="showModal"
        preset="dialog"
        title="Dialog"
        :show-icon="false"
    >
        <template #header>
            <div>添加任务</div>
        </template>
        <div>
            <n-input
                v-model:value="content"
                type="input"
                placeholder="请填写任务信息..."
            />
        </div>

        <template #action>
            <n-button @click="onAdd">添加</n-button>
        </template>
    </n-modal>
    
        <n-modal
        v-model:show="showUpdateModal"
        preset="dialog"
        title="Dialog"
        :show-icon="false"
    >
        <template #header>
            <div>编辑任务</div>
        </template>
        <div>
            <n-input
                v-model:value="contentUpdate"
                type="input"
                placeholder="请填写任务信息..."
            />
        </div>

        <template #action>
            <n-button @click="onUpdate">确定</n-button>
        </template>
    </n-modal>
</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
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
import TaskItem from "../components/TaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from 'uuid';
const initTask = {
    content: "",
    status: "INCOMPLETE",
};

const store = useStore();
const list = computed(() => store.state.list);
let showModal = ref(false);
let showUpdateModal = ref(false);
let content = ref(initTask.content);
let contentUpdate = ref(initTask.content);
let contentUpdateidx = ref(0);
const dragList = (e) => {
    const { moved } = e;
    const { oldIndex, newIndex } = moved;
    const tasks = cloneDeep(list);
    tasks.splice(oldIndex, newIndex, tasks[oldIndex]);
    store.commit("updateTasks", tasks);
};

const onAdd = () => {
    store.commit("addTask", {
        ...initTask,
        id :uuidv4(),
        content: content.value,
    });
    showModal.value = false;
    content.value = "";
};

const onEdit = (idx,content) => {
    showUpdateModal.value = true;
    contentUpdate.value = content;
    contentUpdateidx.value = idx
};

const onUpdate = () => {
    let task = {
        ...initTask,
        id :uuidv4(),
        content: contentUpdate.value,
    };
    store.commit("updateTask", {
        idx:contentUpdateidx.value,
        task:task
    });
    showUpdateModal.value = false;
};

const onDelete = (index) => {
    store.commit("deleteTask", index);
};
const onFinish = (index) => {
    store.commit("finishTask", index);
};
</script>

<style scoped>
.n-thing {
    text-align: center;
}

.extra {
    display: flex;
    justify-content: center;
}
</style>
