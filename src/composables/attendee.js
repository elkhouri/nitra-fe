import { ref } from "vue";
import { event } from '../mocks/event';

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
  return {
    attendeeInfo,
    ticketType,
  };
}
