<script setup lang="ts">
import type PokemonDTO from "@/js/Classes/Pokemon/PokemonDTO";
import Text from "@/js/Components/Atoms/Text/Text.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";

defineProps<{
  pokemon: PokemonDTO;
}>();
</script>

<template>
  <Section class="section-pokemon-physical" gap="extra-tiny">
    <Heading font-size="4">Physical</Heading>

    <Section flex-direction="row" gap="tiny">
      <div>
        <Text>Height</Text>
        <Text>{{ (pokemon.height / 10).toFixed(1) }}m</Text>
      </div>

      <div>
        <Text>Weight</Text>
        <Text>{{ (pokemon.weight / 10).toFixed(1) }}kg</Text>
      </div>
    </Section>
  </Section>
</template>
