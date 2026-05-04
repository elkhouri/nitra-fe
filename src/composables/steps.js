import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router';

const currentStep = ref(1)
const stepRouteMap = {
  1: 'attendee-info',
  2: 'sessions',
  3: 'addons',
  4: 'review',
}
export function useSteps() {
  const router = useRouter()
  const route = useRoute()

  function goToNextStep() {
    if (currentStep.value < 4) {
      currentStep.value++
      routerNavigate()
    }
  }

  function goToPreviousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
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
    setStepFromRoute
  }
}
