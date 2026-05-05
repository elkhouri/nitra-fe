import { computed } from 'vue';
import { useAttendee } from '../composables/attendee';
import { useAddons } from '../composables/addons';

const { ticketType } = useAttendee()
const { selectedAddons } = useAddons();

export const useSummary = () => {
  const isVIP = computed(() => ticketType.value && ticketType.value.id === 'vip');

  /**
   * The amount of the 10% discount applied to the workshops if the ticket type is VIP
   */
  const workshopDiscount = computed(() => {
    if (!isVIP.value) return 0

    return Object.values(selectedAddons.value).reduce((discount, addon) => {
      if (addon.category === 'workshop') {
        return discount + addon.price * 0.1;
      }
      return discount;
    }, 0);
  });

  /**
   * The total price of the cart with all the items and discount included
   */
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
