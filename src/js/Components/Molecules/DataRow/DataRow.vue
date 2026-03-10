<script setup lang="ts">
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Badge from "@/js/Components/Atoms/Badge/Badge.vue";

withDefaults(
  defineProps<{
    label: string;
    badge?: string;
    highlighted?: boolean;
  }>(),
  {
    badge: undefined,
    highlighted: false,
  },
);
</script>

<template>
  <div class="data-row" :class="{ 'data-row--highlighted': highlighted }">
    <Text :capitalize="true" class="data-row__label">{{ label }}</Text>

    <Badge v-if="badge">{{ badge }}</Badge>
  </div>
</template>
