<script setup lang="ts">
import InputField from "@/js/Components/Atoms/InputField/InputField.vue";
import Button from "@/js/Components/Atoms/Button/Button.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";

interface Props {
  disabled?: boolean;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: "Search",
});

const emit = defineEmits<{
  submit: [];
}>();

const search = defineModel<string | null>({ default: null });
</script>

<template>
  <Section
    class="search-bar"
    theme="dark"
    padding="both"
    padding-size="tiny"
    gutter="both"
    align="center"
    :background="true"
  >
    <Section
      tag="form"
      class="form"
      flex-direction="row"
      gap="extra-tiny"
      @submit.prevent="emit('submit')"
    >
      <InputField v-model="search" id="search" :placeholder="placeholder" :disabled="disabled" />

      <Button :disabled="disabled" type="submit">Search</Button>
    </Section>
  </Section>
</template>
