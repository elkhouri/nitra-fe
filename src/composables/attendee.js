import { ref } from "vue";

const ticketType = ref('');
const attendeeInfo = ref({
  name: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  shippingAddress: ""
});

export function useAttendee() {
  return {
    attendeeInfo,
    ticketType,
  };
}
