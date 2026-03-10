<script setup lang="ts">
import type IPokemonAbility from "@/js/Classes/Pokemon/IPokemonAbility";
import Card from "@/js/Components/Molecules/Card/Card.vue";
import DataRow from "@/js/Components/Molecules/DataRow/DataRow.vue";
import Section from "@/js/Components/Fundaments/Section/Section.vue";

defineProps<{
  abilities: IPokemonAbility[];
}>();

function formatAbilityName(name: string): string {
  return name.replace(/-/g, " ");
}
</script>

<template>
  <Card class="pokemon-abilities-card">
    <template #content>
      <Section gap="extra-tiny">
        <DataRow
          v-for="ability in abilities"
          :key="ability.name"
          :label="formatAbilityName(ability.name)"
          :badge="ability.isHidden ? 'Hidden' : undefined"
          :highlighted="ability.isHidden"
        />
      </Section>
    </template>
  </Card>
</template>
