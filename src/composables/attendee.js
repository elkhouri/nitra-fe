import { ref } from "vue";

export function useAttendee() {
  const ticketType = ref('');
  const attendeeInfo = ref({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    shippingAddress: ""
  });

  return {
    attendeeInfo,
    ticketType,
  };
}
