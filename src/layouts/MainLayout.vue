<template>
  <q-layout view="lHh Lpr lfr">
    <q-header> 
      <Header  />
      <Stepper v-if="!atLastStep" />
    </q-header>

    <q-page-container class="px-30">
      <router-view class="pt-10" />
    </q-page-container>

    <q-footer>
      <Footer v-if="!atLastStep" />
    </q-footer>
  </q-layout>
</template>

<script setup>
import Header from '../components/Header.vue'
import Stepper from '../components/Stepper.vue'
import Footer from '../components/Footer.vue'
import { useSteps } from '../composables/steps';

const { setStepFromRoute, atLastStep } = useSteps();
setStepFromRoute()
</script>
