import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentStep = ref(1)

export function useSteps() {
  const router = useRouter()
  function goToNextStep() {
    if (currentStep.value < 4) {
      currentStep.value++
      if (currentStep.value === 2) {
        router.push({ name: 'sessions' })
      } else if (currentStep.value === 3) {
        router.push({ name: 'addons' })
      } else if (currentStep.value === 4) {
        router.push({ name: 'review' })
      }
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
