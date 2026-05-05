<script setup>
import { useSteps, STEPS } from '../composables/steps';
import { useValidation } from '../composables/validation';

const { currentStep } = useSteps()
const { errors, hasStepErrors } = useValidation()
</script>

<template>
  <div class="px-24 py-1 border-y border-solid divider-default">
    <q-stepper :model-value="currentStep" ref="stepper" color="primary" active-icon="none" done-icon="img:/img/check-icon.svg" error-icon="img:/img/exclamation-icon.svg" animated flat>
      <q-step
        :name="STEPS.ATTENDEE"
        title="Attendee Info"
        prefix="1"
        :done="currentStep !== STEPS.ATTENDEE"
        :error="hasStepErrors(STEPS.ATTENDEE)"
        :active-icon="hasStepErrors(STEPS.ATTENDEE) ? 'img:/img/exclamation-icon.svg': 'none'"
        color="primary"
      >
      </q-step>

      <q-step
        :name="STEPS.SESSION"
        title="Sessions"
        prefix="2"
        :done="[STEPS.ADDON, STEPS.REVIEW].includes(currentStep)"
        active-icon="hasStepErrors(STEPS.SESSION) ? 'img:/img/exclamation-icon.svg': 'none'"
        :error="hasStepErrors(STEPS.SESSION)"
      >
      </q-step>

      <q-step
        :name="STEPS.ADDON"
        title="Add-ons"
        prefix="3"
        :done="[STEPS.REVIEW].includes(currentStep)"
        :error="hasStepErrors(STEPS.ADDON)"
        active-icon="hasStepErrors(STEPS.ADDON) ? 'img:/img/exclamation-icon.svg': 'none'"
      >
      </q-step>

      <q-step :name="STEPS.REVIEW" title="Review" prefix="4">
      </q-step>
      
    </q-stepper>
  </div>
</template>
