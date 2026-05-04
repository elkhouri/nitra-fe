import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useValidation } from '../composables/validation';

const currentStep = ref(1)

const stepRouteMap = {
  1: 'attendee-info',
  2: 'sessions',
  3: 'addons',
  4: 'review',
  5: 'complete'
}
export function useSteps() {
  const router = useRouter()
  const route = useRoute()
  const { validateForm, hasErrors, clearErrors } = useValidation()

  const atLastStep = computed(() => currentStep.value === Object.keys(stepRouteMap).length)

  function goToNextStep() {
    if (currentStep.value < Object.keys(stepRouteMap).length) {
      if (currentStep.value === 4) {
        validateForm()
        if (hasErrors.value) {
          return
        }
      }
      currentStep.value++
      clearErrors()
      routerNavigate()
    }
  }

  function goToPreviousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
      routerNavigate()
    }
  }

  function setStep(step) {
    if (step >= 1 && step <= Object.keys(stepRouteMap).length) {
      currentStep.value = step
      // clearErrors()
      routerNavigate()
    }
  }

  function routerNavigate() {
    const routeName = stepRouteMap[currentStep.value]
    if (routeName) {
      router.push({ name: routeName })
    }
  }

  function setStepFromRoute() {
    const routeName = route.name
    const step = Object.keys(stepRouteMap).find(key => stepRouteMap[key] === routeName)
    if (step) {
      currentStep.value = parseInt(step)
    }
  }

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    setStep,
    setStepFromRoute,
    atLastStep
  }
}
