<script setup>
import { useSteps } from '../composables/steps';
import { useValidation } from '../composables/validation';

const { currentStep } = useSteps()
const { errors, hasStepErrors } = useValidation()
</script>

<template>
  <div class="px-24 py-1 border-y border-solid divider-default">
    <q-stepper :model-value="currentStep" ref="stepper" color="primary" active-icon="none" done-icon="img:/img/check-icon.svg" error-icon="img:/img/exclamation-icon.svg" animated flat>
      <q-step
        :name="1"
        title="Attendee Info"
        prefix="1"
        :done="currentStep > 1"
        :error="hasStepErrors('Step 1')"
        :active-icon="hasStepErrors('Step 1') ? 'img:/img/exclamation-icon.svg': 'none'"
        color="primary"
      >
      </q-step>

      <q-step
        :name="2"
        title="Sessions"
        prefix="2"
        :done="currentStep > 2"
        active-icon="hasStepErrors('Step 2') ? 'img:/img/exclamation-icon.svg': 'none'"
        :error="hasStepErrors('Step 2')"
      >
      </q-step>

      <q-step
        :name="3"
        title="Add-ons"
        prefix="3"
        :done="currentStep > 3"
        :error="hasStepErrors('Step 3')"
        active-icon="hasStepErrors('Step 3') ? 'img:/img/exclamation-icon.svg': 'none'"
      >
      </q-step>

      <q-step :name="4" title="Review" prefix="4" :done="currentStep > 4">
      </q-step>
      
    </q-stepper>
  </div>
</template>
