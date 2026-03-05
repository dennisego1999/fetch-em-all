<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

<template>
  <iframe class="video" :src="href" frameborder="0"></iframe>
</template>
