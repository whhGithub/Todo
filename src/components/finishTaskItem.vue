<template>
    <n-list-item class="task-item-wrapper">
        <template #prefix>
            <n-icon size="16">
                <drag-indicator-outlined />
            </n-icon>
        </template>
        <swiper
            :initial-slide="1"
            :slides-per-view="1"
            :resistance-ratio="0.75"
            :speed="200"
            @transitionEnd="onTransitionEnd"
        >
            <swiper-slide class="back-slide">回档</swiper-slide>
            <swiper-slide class="content-slide">{{ task.content }}</swiper-slide>
            <swiper-slide class="back1-slide">回档</swiper-slide>
        </swiper>
    </n-list-item>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { NListItem, NIcon } from "naive-ui";
import { DragIndicatorOutlined } from "@vicons/material";

const props = defineProps({
    task: Object,
    taskIndex: Number,
});
const emit = defineEmits(["back"]);

const onTransitionEnd = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 2) {
        emit("back");
        instance.destroy();
    }else if(activeIndex === 0){
        emit("back")
        instance.destroy();
    }
};
</script>

<style lang="postcss">
.task-item-wrapper {
    & .back1-slide {
        color: white;
        background: tomato;
        padding-left: 16px;
        justify-content: flex-start;
        box-sizing:border-box;
    }
    & .back-slide {
        color: white;
        width:362px;
        background: tomato;
        justify-content: flex-end;
        box-sizing:border-box;
        padding-right: 20px !important;
    }
}

    .task-item-wrapper:not(:last-child) {
        border-bottom: none !important;
    }
</style>