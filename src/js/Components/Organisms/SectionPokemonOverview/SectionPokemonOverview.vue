<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import { onMounted, ref, type Ref } from "vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import PokemonCard from "@/js/Components/Molecules/PokemonCard/PokemonCard.vue";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Button from "@/js/Components/Atoms/Button/Button.vue";
import Loader from "@/js/Components/Atoms/Loader/Loader.vue";

let offset: number = 0;
const limit: number = 12;
const results: Ref<PokemonDTO[]> = ref([]);
const hasNext: Ref<boolean> = ref(true);
const isFetching: Ref<boolean> = ref(false);

async function fetchPokemons() {
  // Set fetching state
  isFetching.value = true;

  // Get the next batch
  const { pokemons, hasNext: next } = await PokemonService.instance.findAll(offset, limit);

  // Check if next
  hasNext.value = next;

  // Add to results list
  results.value.push(...pokemons);

  // Update offset
  offset += limit;

  // Reset fetching state
  isFetching.value = false;
}

onMounted(async () => fetchPokemons());
</script>

<template>
  <Section
    class="section-pokemon-overview"
    theme="dark"
    gap="tiny"
    padding="both"
    gutter="both"
    :background="true"
  >
    <Heading>A list of all pokemon</Heading>

    <Text>
      Every. Single. One. From the iconic to the "why does this exist," here's every Pokémon ever
      crammed into one scrollable fever dream. Pulled fresh from PokéAPI, because apparently someone
      had to catalogue 1000+ creatures and it wasn't going to be us.
    </Text>

    <TransitionGroup
      v-if="results.length > 0"
      name="card"
      tag="section"
      class="section section-pokemon-overview"
      data-size="10"
      data-flex-direction="row"
      data-gap="extra-tiny"
      data-wrap="true"
      appear
    >
      <PokemonCard v-for="pokemon in results" :key="pokemon.id" :pokemon="pokemon" />
    </TransitionGroup>

    <Transition name="card" mode="out-in">
      <Button
        v-if="hasNext && results.length > 0 && !isFetching"
        :disabled="isFetching"
        @click="fetchPokemons"
      >
        Load more
      </Button>

      <Loader v-else />
    </Transition>
  </Section>
</template>
