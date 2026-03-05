<script setup lang="ts">
import Navigation from "../Components/Organisms/Navigation/Navigation.vue";
</script>

<template>
  <Navigation />

  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in" appear>
      <main>
        <Component :is="Component" />
      </main>
    </Transition>
  </RouterView>
</template>
