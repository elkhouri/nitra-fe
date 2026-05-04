<script setup>
import { useSteps } from '../composables/steps';

const { currentStep } = useSteps()
</script>

<template>
  <div class="px-24 py-1 border-y border-solid divider-default">
    <q-stepper :model-value="currentStep" ref="stepper" color="primary" active-icon="none" animated flat>
      <q-step
        :name="1"
        title="Attendee Info"
        prefix="1"
        :done="currentStep > 1"
        color="primary"
      >
      </q-step>

      <q-step
        :name="2"
        title="Sessions"
        prefix="2"
        :done="currentStep > 2"
      >
      </q-step>

      <q-step :name="3" title="Add-ons" prefix="3" :done="currentStep > 3">
      </q-step>

      <q-step :name="4" title="Review" prefix="4" :done="currentStep > 4">
      </q-step>
      
    </q-stepper>
  </div>
</template>
