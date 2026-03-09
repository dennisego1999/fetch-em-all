<script setup lang="ts">
interface Props {
  disabled?: boolean;
  downloadFile?: boolean;
  downloadName?: string;
  method?: string;
  href?: string | null;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  downloadFile: false,
  downloadName: "result",
  method: "get",
  href: null,
});

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <a
    v-if="href && downloadFile"
    class="button"
    :class="{ 'button--disabled': disabled }"
    :href="href"
    :download="downloadName"
    @click="emit('click')"
  >
    <slot />
  </a>

  <button
    v-else
    class="button"
    :class="{ 'base-button--disabled': disabled }"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
