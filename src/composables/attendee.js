import { ref } from "vue";
import { event } from '../mocks/event';
import { useAddons } from '../composables/addons';

const ticketType = ref(event.ticketTypes.find(t => t.id === 'vip'));
const attendeeInfo = ref({
  name: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  shippingAddress: ""
});

export function useAttendee() {
  const { hasMerchandise } = useAddons();

  /**
   * Validates the attendee to have the required fields with valid formats
   * @returns {Error} the missing or wrongly formatted fields
   */
  function validateAttendee() {
    const errors = {};
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!attendeeInfo.value.name) {
      errors.name = "Full Name is required.";
    }
    if (!attendeeInfo.value.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(attendeeInfo.value.email)) {
      errors.email = "Email format is invalid.";
    }
    if (!attendeeInfo.value.phone) {
      errors.phone = "Phone is required.";
    } else if (!phoneRegex.test(attendeeInfo.value.phone)) {
      errors.phone = "Phone format is invalid.";
    }
    if (!attendeeInfo.value.company) {
      errors.company = "Company is required.";
    }
    if (!attendeeInfo.value.jobTitle) {
      errors.jobTitle = "Job Title is required.";
    }
    if (hasMerchandise.value && !attendeeInfo.value.shippingAddress) {
      errors.shippingAddress = "Shipping address is required for merchandise orders";
    }
    return errors;
  }
  return {
    attendeeInfo,
    ticketType,
    validateAttendee
  };
}
