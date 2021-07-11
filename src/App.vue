<template>
    <div id="app">
        <n-layout>
            <n-layout-header>
                <h1>mini TO-DO</h1>
                 <router-link to="/">
                 <n-button>首页</n-button>
                 </router-link>
                 <router-link to="/archive">
                 <n-button>归档页</n-button>
                 </router-link>
            </n-layout-header>
                
            <n-layout-content>
                <router-view />
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGridItem,
    NButton,
    NGrid,
    NH1,
} from "naive-ui";
import router from "./router/index.js"
import css from "./assets/style.css"
import { useStore } from "vuex";
const store = useStore()
onMounted(()=>{
    let myData= localStorage.getItem("myData");
    if(myData){
        myData = JSON.parse(myData)
        store.commit("updateTasks",myData[0])
        store.commit("updateFinishTasks",myData[1])
    }
})

window.onbeforeunload = (event) =>{
    let list = store.state.list;
    let finish = store.state.finish;
    let myData = [list,finish];
    localStorage.setItem("myData",JSON.stringify(myData));
}

</script>

<style lang="postcss" scoped>
#app {
    background: #f5f5f5;

    & .n-layout-header {
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
    }

    & .n-layout-content {
        margin:  auto;
        padding: 16px;
        max-width: 360px;
    }
}
</style>
