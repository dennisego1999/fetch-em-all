<script setup lang="ts">
import Text from "@/js/Components/Atoms/Text/Text.vue";

defineProps<{
  id: number;
}>();
</script>

<template>
  <Text class="pokemon-identifier">#{{ String(id).padStart(3, "0") }}</Text>
</template>
