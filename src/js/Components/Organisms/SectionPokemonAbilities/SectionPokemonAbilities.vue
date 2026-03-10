<script setup lang="ts">
import Section from "@/js/Components/Fundaments/Section/Section.vue";
import Heading from "@/js/Components/Atoms/Heading/Heading.vue";
import type IPokemonAbility from "@/js/Classes/Pokemon/IPokemonAbility";
import PokemonAbilitiesCard from "@/js/Components/Molecules/PokemonAbilitiesCard/PokemonAbilitiesCard.vue";

defineProps<{
  abilities: IPokemonAbility[];
}>();
</script>

<template>
  <Section class="section-pokemon-abilities" gap="extra-tiny">
    <Heading :level="3">Abilities</Heading>

    <PokemonAbilitiesCard :abilities="abilities" />
  </Section>
</template>
