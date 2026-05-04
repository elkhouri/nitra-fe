import { ref, computed } from "vue";
import { groupBy } from "lodash-es";
import { format } from "date-fns";
import { sessions } from '../mocks/sessions';

const selectedSessions = ref({});
const allSessions = ref(sessions);

export function useSessions () {
  function toggleSession(session) {
    if (selectedSessions.value[session.id]) {
      delete selectedSessions.value[session.id]
    } else {
      selectedSessions.value[session.id] = true
    }
  }

  const groupedSessions = computed(() => {
    return groupBy(allSessions.value, session => {
      const date = new Date(session.date);
      return format(date, 'MMM dd');
    });
  });

  return {
    selectedSessions,
    groupedSessions,
    toggleSession,
  };
}
