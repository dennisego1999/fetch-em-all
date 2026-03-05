<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
    alt: string;
    fit?: "cover" | "contain";
  }>(),
  {
    fit: "cover",
  },
);
</script>

<template>
  <figure class="visual" :data-fit="fit">
    <img class="visual__image" :src="src" :alt="alt" />
  </figure>
</template>
