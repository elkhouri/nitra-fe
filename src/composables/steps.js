import { ref } from 'vue'

export function useSteps() {
  const currentStep = ref(1)

  function goToNextStep() {
    if (currentStep.value < 4) {
      currentStep.value++
    }
  }

  function goToPreviousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
  }
}
