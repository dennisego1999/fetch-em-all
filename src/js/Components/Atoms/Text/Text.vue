<script setup lang="ts">
import { useAttrs } from "vue";

defineProps({
  tag: { type: String, default: "div" },
  fontSize: { type: String, default: "inherit" },
  textAlign: { type: String, default: null },
  forceAlign: { type: String, default: null },
  cap: { default: null },
  clamp: { default: null },
  flow: { type: String, default: null },
  variant: { type: String, default: null },
  wrap: { type: String, default: null },
});

const attrs = useAttrs();
const { class: _, ...filteredAttrs } = attrs as Record<string, unknown>;
</script>

<template>
  <component
    :is="tag"
    class="text"
    v-bind="{
      ...filteredAttrs,
      'data-font-size': fontSize,
      'data-text-align': textAlign,
      'data-force-align': forceAlign,
      'data-cap': cap,
      'data-clamp': clamp,
      'data-flow': flow,
      'data-variant': variant,
      'data-wrap': wrap,
    }"
    ><slot
  /></component>
</template>
