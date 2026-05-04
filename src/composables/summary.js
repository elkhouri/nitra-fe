import { computed } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useAddons } from '../composables/addons';

const { ticketType } = useAttendee()
const { selectedAddons } = useAddons();

export const useSummary = () => {
  const isVIP = computed(() => ticketType.value && ticketType.value.id === 'vip');

  const workshopDiscount = computed(() => {
    if (!isVIP.value) return 0

    return Object.values(selectedAddons.value).reduce((discount, addon) => {
      if (addon.category === 'workshop') {
        return discount + addon.price * 0.1;
      }
      return discount;
    }, 0);
  });

  const totalPrice = computed(() => {
    if (!ticketType.value) return 0;

    const addonsTotal = Object.values(selectedAddons.value).reduce((total, addon) => {
      if (addon.quantity) {
        return total + addon.price * addon.quantity;
      } else {
        return total + addon.price;
      }
    }, 0);
    const discount = workshopDiscount.value;
    const total = ticketType.value.price + addonsTotal - discount;

    return total;
  });

  return {
    workshopDiscount,
    totalPrice
  };
}
