<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import SectionPokemonHero from "@/js/Components/Organisms/SectionPokemonHero/SectionPokemonHero.vue";
import SectionPokemonPhysical from "@/js/Components/Organisms/SectionPokemonPhysical/SectionPokemonPhysical.vue";
import SectionPokemonStats from "@/js/Components/Organisms/SectionPokemonStats/SectionPokemonStats.vue";
import SectionPokemonAbilities from "../Components/Organisms/SectionPokemonAbilities/SectionPokemonAbilities.vue";

const rawName = useRoute().params.name;
const pokemonName: string | undefined = Array.isArray(rawName) ? rawName[0] : rawName;
const pokemon: Ref<PokemonDTO | null> = ref(null);

onMounted(async () => {
  if (!pokemonName) {
    return;
  }

  pokemon.value = await PokemonService.instance.search(pokemonName);
});
</script>

<template>
  <Section
    v-if="pokemon"
    theme="dark"
    gutter="both"
    padding="both"
    padding-size="tiny"
    gap="small"
    :background="true"
  >
    <SectionPokemonHero :pokemon="pokemon" />

    <SectionPokemonPhysical :pokemon="pokemon" />

    <SectionPokemonStats :stats="pokemon.stats" />

    <SectionPokemonAbilities :abilities="pokemon.abilities" />
  </Section>
</template>
