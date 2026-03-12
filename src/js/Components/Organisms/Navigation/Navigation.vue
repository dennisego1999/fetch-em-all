<script setup lang="ts">
import Link from "@/js/Components/Atoms/Link/Link.vue";
import Logo from "@/js/Components/Atoms/Logo/Logo.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
</script>

<template>
  <Section
    class="navigation"
    tag="nav"
    theme="light-tint"
    gutter="both"
    flex-direction="row"
    justify="between"
    align="center"
    gap="tiny"
    :background="true"
  >
    <Link href="/">
      <Logo class="navigation__logo" />
    </Link>

    <Section
      class="navigation__links"
      tag="ul"
      flex-direction="row"
      justify="end"
      align="center"
      gap="tiny"
    >
      <li>
        <Link href="/pokedex">
          <Text>Pokédex</Text>
        </Link>
      </li>

      <li>
        <Link href="/weight-battle">
          <Text>Weight battle</Text>
        </Link>
      </li>

      <li>
        <Link href="/find-pokemon">
          <Text>Find pokemon</Text>
        </Link>
      </li>
    </Section>
  </Section>
</template>
