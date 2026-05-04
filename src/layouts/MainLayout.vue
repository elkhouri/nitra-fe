<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <Header />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>