<template>
  <div class="px-24 py-1 border-y border-solid divider-default">
    <q-stepper v-model="step" ref="stepper" color="primary" active-icon="none" animated flat>
      <q-step
        :name="1"
        title="Attendee Info"
        prefix="1"
        :done="step > 1"
        color="primary"
      >
      </q-step>

      <q-step
        :name="2"
        title="Sessions"
        prefix="2"
        :done="step > 2"
      >
      </q-step>

      <q-step :name="3" title="Add-ons" prefix="3" :done="step > 3">
      </q-step>

      <q-step :name="4" title="Review" prefix="4" :done="step > 4">
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const step = ref(1)
</script>

<style scoped>

</style>
