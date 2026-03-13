<script setup lang="ts">
import InputField from "@/js/Components/Atoms/InputField/InputField.vue";
import Button from "@/js/Components/Atoms/Button/Button.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Props {
  disabled?: boolean;
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  placeholder: "Search",
});

const emit = defineEmits<{
  (e: "submit"): void;
}>();

const search = defineModel<string | null>({ default: null });

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const queryParam = route.query.search;

  if (queryParam && typeof queryParam === "string") {
    search.value = queryParam;
  }
});

async function handleSubmit(): Promise<void> {
  await router.replace({ query: { ...route.query, search: search.value ?? null } });
  emit("submit");
}
</script>

<template>
  <Section class="search-bar" theme="dark" align="center" :background="true">
    <Section
      tag="form"
      class="form"
      flex-direction="row"
      gap="extra-tiny"
      @submit.prevent="handleSubmit"
    >
      <InputField v-model="search" id="search" :placeholder="placeholder" :disabled="disabled" />

      <Button :disabled="disabled" type="submit">Search</Button>
    </Section>
  </Section>
</template>
