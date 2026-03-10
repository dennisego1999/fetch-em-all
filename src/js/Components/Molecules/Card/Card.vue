<script setup lang="ts">
import Link from "@/js/Components/Atoms/Link/Link.vue";
import Section from "../../Fundaments/Section/Section.vue";

withDefaults(
  defineProps<{
    href?: string;
  }>(),
  {
    href: undefined,
  },
);
</script>

<template>
  <component :is="href ? Link : 'div'" class="card" v-bind="href ? { href } : {}">
    <Section tag="article" gap="extra-tiny">
      <header v-if="$slots.header" class="card__header">
        <slot name="header" />
      </header>

      <div v-if="$slots.content" class="card__content">
        <slot name="content" />
      </div>

      <footer v-if="$slots.footer" class="card__footer">
        <slot name="footer" />
      </footer>
    </Section>
  </component>
</template>
