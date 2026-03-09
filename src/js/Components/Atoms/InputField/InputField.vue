<script setup lang="ts">
const model = defineModel();

defineProps<{
  id: string;
  placeholder: string;
}>();
</script>

<template>
  <input
    v-model="model"
    class="input-field"
    type="text"
    :id="id"
    :name="id"
    :placeholder="placeholder"
  />
</template>
