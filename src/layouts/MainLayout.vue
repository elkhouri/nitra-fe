<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Stepper />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Header from '../components/Header.vue'
import Stepper from '../components/Stepper.vue'
</script>
