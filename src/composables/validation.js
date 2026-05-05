import { computed, ref } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useSessions } from '../composables/sessions';
import { useAddons } from '../composables/addons';
import { STEPS } from './steps';

const { validateAttendee } = useAttendee()
const { validateSessions } = useSessions()
const { validateAddons } = useAddons()

const errors = ref({});

function validateForm() {
  errors.value[STEPS.ATTENDEE] = validateAttendee();
  errors.value[STEPS.SESSION] = validateSessions();
  errors.value[STEPS.ADDON] = validateAddons();
}

function clearErrors() {
  errors.value = {};
}

const hasErrors = computed(() => {
  return Object.values(errors.value).some(stepError => Object.keys(stepError).length > 0);
})

function hasStepErrors(step) {
  return Object.keys(errors.value[step] || {}).length > 0;
}

export function useValidation() {
  return {
    errors,
    validateForm,
    hasErrors,
    clearErrors,
    hasStepErrors
  }
}
