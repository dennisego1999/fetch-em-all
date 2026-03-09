<script setup lang="ts">
import Text from "../Text/Text.vue";

defineProps<{
  type: string;
}>();
</script>

<template>
  <Text class="pokemon-type-badge">
    {{ type }}
  </Text>
</template>
