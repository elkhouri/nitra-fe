<template>
  <q-layout view="lHh Lpr lfr">
    <q-header> 
      <Header />
      <Stepper />
    </q-header>

    <q-page-container class="px-30">
      <router-view />
    </q-page-container>

    <q-footer>
      <Footer />
    </q-footer>
  </q-layout>
</template>

<script setup>
import Header from '../components/Header.vue'
import Stepper from '../components/Stepper.vue'
import Footer from '../components/Footer.vue'
</script>
