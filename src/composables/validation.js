import { computed, ref } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useSessions } from '../composables/sessions';
import { useAddons } from '../composables/addons';
import { STEPS } from './steps';

const { validateAttendee } = useAttendee()
const { validateSessions } = useSessions()
const { validateAddons } = useAddons()

const errors = ref({});

/**
 * Validates the whole form and sets the error values accordingly
 */
function validateForm() {
  errors.value[STEPS.ATTENDEE] = validateAttendee();
  errors.value[STEPS.SESSION] = validateSessions();
  errors.value[STEPS.ADDON] = validateAddons();
}

/**
 * Clears the errors
 */
function clearErrors() {
  errors.value = {};
}

/**
 * Checks whether there are any errors
 */
const hasErrors = computed(() => {
  return Object.values(errors.value).some(stepError => Object.keys(stepError).length > 0);
})

/**
 * Checks whether a certain step has errors
 */
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
