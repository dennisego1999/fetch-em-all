<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import PokemonIdentifier from "@/js/Components/Atoms/PokemonIdentifier/PokemonIdentifier.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonTypeBadge from "@/js/Components/Atoms/PokemonTypeBadge/PokemonTypeBadge.vue";
import Visual from "../../Molecules/Visual/Visual.vue";
import PokemonAvatar from "../../Atoms/PokemonAvatar/PokemonAvatar.vue";

defineProps<{
  pokemon: PokemonDTO;
}>();
</script>

<template>
  <Section
    class="section-pokemon-hero"
    flex-direction="row"
    justify="between"
    align="center"
    gap="tiny"
  >
    <PokemonAvatar :pokemon="pokemon" />

    <Section>
      <PokemonIdentifier :id="pokemon.id" />

      <Heading :capitalize="true">{{ pokemon.name }}</Heading>
    </Section>

    <Section
      class="section-pokemon-hero__badges"
      flex-direction="row"
      justify="end"
      :wrap="true"
      gap="extra-tiny"
    >
      <PokemonTypeBadge v-for="type in pokemon.types" :key="type" :type="type" />
    </Section>
  </Section>
</template>
