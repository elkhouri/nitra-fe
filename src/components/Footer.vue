<script setup>
import { useSteps } from '../composables/steps';

const { currentStep, goToNextStep } = useSteps()
</script>

<template>
  <div class="bg-white border-t border-solid border-neutral-2 py-4 px-30">
    <div class="flex justify-between items-center">
      <div>
      </div>
      <button class="bg-orange-400 text-white rounded py-2.5 px-5 border-radius-[10px] border-0 font-medium" @click="goToNextStep">Next: Session Selection</button>
    </div>
  </div>
</template>
