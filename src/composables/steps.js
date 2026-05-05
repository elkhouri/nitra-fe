import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useValidation } from '../composables/validation';

export const STEPS = {
  ATTENDEE: 'Step 1',
  SESSION: 'Step 2',
  ADDON: 'Step 3',
  REVIEW: 'Step 4',
  COMPLETE: 'Complete'
}

const currentStep = ref(STEPS.ATTENDEE)

const stepRouteMap = {
  [STEPS.ATTENDEE]: 'attendee-info',
  [STEPS.SESSION]: 'sessions',
  [STEPS.ADDON]: 'addons',
  [STEPS.REVIEW]: 'review',
  [STEPS.COMPLETE]: 'complete'
}
export function useSteps() {
  const router = useRouter()
  const route = useRoute()
  const { validateForm, hasErrors, clearErrors } = useValidation()

  const atLastStep = computed(() => currentStep.value === STEPS.COMPLETE)

  function goToNextStep() {
    if (currentStep.value === STEPS.REVIEW) {
      validateForm()
      if (hasErrors.value) {
        return
      }
    }

    const nextSteps = {
      [STEPS.ATTENDEE]: STEPS.SESSION,
      [STEPS.SESSION]: STEPS.ADDON,
      [STEPS.ADDON]: STEPS.REVIEW,
      [STEPS.REVIEW]: STEPS.COMPLETE,
    }
    const nextStep = nextSteps[currentStep.value]
    currentStep.value = nextStep
    clearErrors()
    routerNavigate(nextStep)
  }

  function goToPreviousStep() {
    const prevSteps = {
      [STEPS.SESSION]: STEPS.ATTENDEE,
      [STEPS.ADDON]: STEPS.SESSION,
      [STEPS.REVIEW]: STEPS.ADDON,
    }
    const prevStep = prevSteps[currentStep.value]
    currentStep.value = prevStep
    clearErrors()
    routerNavigate(prevStep)
  }

  function setStep(step) {
    currentStep.value = step
    routerNavigate()
  }

  function routerNavigate(nextStep) {
    const routeName = stepRouteMap[nextStep]
    if (routeName) {
      router.push({ name: routeName })
    }
  }

  function setStepFromRoute() {
    const routeName = route.name
    const step = Object.keys(stepRouteMap).find(key => stepRouteMap[key] === routeName)
    if (step) {
      currentStep.value = step
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
