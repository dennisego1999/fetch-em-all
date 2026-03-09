<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import InputField from "@/js/Components/Atoms/InputField/InputField.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import { ref, watch, type Ref } from "vue";
import Form from "@/js/Components/Atoms/Form/Form.vue";
import PokemonService from "@/js/Classes/Pokemon/PokemonService";
import EmptySearchError from "@/js/Classes/Errors/EmptySearchError";
import HttpError from "@/js/Classes/Errors/HttpError";
import PokemonCard from "@/js/Components/Molecules/PokemonCard/PokemonCard.vue";
import Error from "@/js/Components/Atoms/Error/Error.vue";
import PokemonNotFoundError from "@/js/Classes/Pokemon/PokemonNotFoundError";

const search: Ref<string | null> = ref(null);
const isLoading: Ref<boolean> = ref(false);
const isError: Ref<boolean> = ref(false);
const pokemonResult: Ref<PokemonDTO | null> = ref(null);

async function onChange() {
  if (!search.value) {
    throw new EmptySearchError();
  }

  // Set loading state
  isLoading.value = true;

  try {
    // Search
    pokemonResult.value = await PokemonService.instance.search(search.value);
  } catch (e) {
    isError.value = true;

    if (
      e instanceof EmptySearchError ||
      e instanceof HttpError ||
      e instanceof PokemonNotFoundError
    ) {
      console.error(e);
    } else {
      throw e;
    }
  }

  // Set loading state
  isLoading.value = false;
}

function reset() {
  // Reset reactives
  isError.value = false;
  pokemonResult.value = null;
}

// Make sure error and result are reset everytime search query changes
watch(search, reset);
</script>

<template>
  <Section class="section-search-pokemon">
    <Section
      class="section-search-pokemon__form"
      theme="dark"
      padding="both"
      padding-size="tiny"
      gutter="both"
      align="center"
      :background="true"
    >
      <Form @submit.prevent>
        <InputField
          v-model="search"
          id="search"
          placeholder="Find a pokémon"
          :disabled="isLoading"
          @change="onChange"
          @enter="reset"
        />
      </Form>
    </Section>

    <Section
      class="section-search-pokemon__result"
      padding="both"
      padding-size="tiny"
      gutter="both"
      :size="pokemonResult && !isError ? 2 : 10"
    >
      <Transition name="fade" mode="out-in">
        <PokemonCard v-if="pokemonResult" :pokemon="pokemonResult" />

        <Error v-else-if="isError"> Failed to find a Pokémon for '{{ search }}' </Error>
      </Transition>
    </Section>
  </Section>
</template>
