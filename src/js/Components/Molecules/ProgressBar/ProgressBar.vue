<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import gsap from "gsap";

const props = defineProps<{
  id?: string;
  value: number;
  max: number;
}>();

const el: Ref<HTMLProgressElement | null> = ref(null);

onMounted(() => {
  const proxy: { value: number } = { value: 0 };

  gsap.to(proxy, {
    value: props.value,
    duration: 1,
    ease: "elastic.out(0.3)",
    onUpdate: () => {
      if (el.value) el.value.value = proxy.value;
    },
  });
});
</script>

<template>
  <progress ref="el" class="progress-bar" :id="id" :value="0" :max="max">
    <slot />
  </progress>
</template>
