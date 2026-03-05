<script setup lang="ts">
import Logo from "../../Atoms/Logo/Logo.vue";
import Section from "../../Fundaments/Section/Section.vue";
</script>

<template>
  <Section
    class="navigation"
    tag="navigation"
    theme="light-tint"
    padding="both"
    gutter="both"
    align="center"
    :background="true"
  >
    <Logo class="navigation__logo" />
  </Section>
</template>
