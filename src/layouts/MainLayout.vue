<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Stepper />

    <q-page-container class="px-30 mt-10">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Header from '../components/Header.vue'
import Stepper from '../components/Stepper.vue'
</script>
