<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import { ref, watch, type Ref } from "vue";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import HttpError from "@/js/Classes/Errors/HttpError";
import PokemonCard from "@/js/Components/Molecules/PokemonCard/PokemonCard.vue";
import Error from "@/js/Components/Atoms/Error/Error.vue";
import PokemonNotFoundError from "@/js/Classes/Pokemon/PokemonNotFoundError";
import SearchBar from "@/js/Components/Organisms/SearchBar/SearchBar.vue";

const search: Ref<string | null> = ref(null);
const isLoading: Ref<boolean> = ref(false);
const isError: Ref<boolean> = ref(false);
const pokemonResult: Ref<PokemonDTO | null> = ref(null);

async function submit(): Promise<void> {
  if (!search.value) {
    return;
  }

  // Set loading state
  isLoading.value = true;

  try {
    // Search
    pokemonResult.value = await PokemonService.instance.search(search.value);
  } catch (e) {
    isError.value = true;

    if (e instanceof HttpError || e instanceof PokemonNotFoundError) {
      console.error(e);
    } else {
      throw e;
    }
  }

  // Set loading state
  isLoading.value = false;
}

function reset(): void {
  isError.value = false;
  pokemonResult.value = null;
}

// Make sure error and result are reset everytime search query changes
watch(search, reset);
</script>

<template>
  <Section class="section-search-pokemon">
    <SearchBar
      v-model="search"
      placeholder="Find a pokémon"
      :disabled="isLoading"
      @submit="submit"
    />

    <Section
      class="section-search-pokemon__result"
      padding="both"
      padding-size="tiny"
      gutter="both"
    >
      <Transition name="card">
        <PokemonCard v-if="pokemonResult" :pokemon="pokemonResult" :key="pokemonResult.id" />
      </Transition>

      <Transition name="fade">
        <Error v-if="isError" :key="'error'"> Failed to find a Pokémon for '{{ search }}' </Error>
      </Transition>
    </Section>
  </Section>
</template>
