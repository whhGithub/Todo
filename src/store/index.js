import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            list: [],
            finish: []
        }
    },
    mutations: {
        addTask(state, task) {
            state.list.unshift(task)
        },
        updateTask(state, task) {
            state.list[task.idx] = task.task
        },
        updateTasks(state, tasks) {
            console.log(tasks);
            state.list = tasks
        },
        updateFinishTasks(state, tasks) {
            console.log(tasks);
            state.finish = tasks
        },
        deleteTask(state, idx) {
            state.list.splice(idx, 1);
        },
        finishTask(state, idx) {
            state.finish.unshift(state.list[idx])
            store.commit("deleteTask", idx);
        },
        backTask(state, idx) {
            state.list.unshift(state.finish[idx])
            store.commit("deleteFinishTask", idx);
        },
        deleteFinishTask(state, idx) {
            state.finish.splice(idx, 1);
        },
    }
});

export default store;