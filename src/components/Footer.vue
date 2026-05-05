<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSteps } from '../composables/steps';
import { useValidation } from '../composables/validation';


const { currentStep, goToNextStep, goToPreviousStep } = useSteps()
const { errors, hasErrors, hasStepErrors } = useValidation()
const route = useRoute();

const nextButtonName = computed(() => {
  switch (route.name) {
    case 'attendee-info':
      return 'Next: Session Selection';
    case 'sessions':
      return 'Next: Add-ons';
    case 'addons':
      return 'Next: Review';
    case 'review':
      return 'Submit Registration';
    default:
      return 'Next';
  }
});
</script>

<template>
  <div class="bg-white border-t border-solid border-neutral-2 py-4 px-30">
    <div class="flex justify-between items-center">
      <div>
        <button v-if="currentStep > 1" class="bg-neutral-muted-rest hover:bg-neutral-muted-hover text-neutral-muted rounded py-2.5 px-5 border-radius-[10px] border-0 font-medium cursor-pointer" @click="goToPreviousStep">Back</button>
      </div>
      <button :disabled="hasErrors && currentStep === 4" class="bg-orange-400 hover:bg-orange-500 text-white rounded py-2.5 px-5 border-radius-[10px] border-0 font-medium cursor-pointer" @click="goToNextStep">{{ nextButtonName }}</button>
    </div>
  </div>
</template>
