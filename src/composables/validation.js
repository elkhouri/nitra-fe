import { computed, ref } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useSessions } from '../composables/sessions';
import { useAddons } from '../composables/addons';

const { validateAttendee } = useAttendee()
const { validateSessions } = useSessions()
const { validateAddons } = useAddons()

const errors = ref({});

function validateForm() {
  errors.value['Step 1'] = validateAttendee();
  errors.value['Step 2'] = validateSessions();
  errors.value['Step 3'] = validateAddons();
}

function clearErrors() {
  errors.value = {};
}

const hasErrors = computed(() => {
  console.log('Current errors:', errors.value );
  return Object.keys(errors.value).length > 0;
})

export function useValidation() {
  return {
    errors,
    validateForm,
    hasErrors,
    clearErrors
  }
}
