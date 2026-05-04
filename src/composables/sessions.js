import { ref, computed } from "vue";
import { groupBy } from "lodash-es";
import { format, areIntervalsOverlapping } from "date-fns";
import { sessions } from '../mocks/sessions';

const selectedSessions = ref({});
const allSessions = ref(sessions);

export function useSessions () {
  function toggleSession(session) {
    if (selectedSessions.value[session.id]) {
      delete selectedSessions.value[session.id]
    } else {
      selectedSessions.value[session.id] = session
    }
  }

  const groupedSessions = computed(() => {
    return groupBy(allSessions.value, session => {
      const date = new Date(session.date);
      return format(date, 'MMM dd');
    });
  });

  function sessionsOverlap(sessionA, sessionB) {
    const startA = new Date(sessionA.date);
    const endA = new Date(sessionA.endDate);
    const startB = new Date(sessionB.date);
    const endB = new Date(sessionB.endDate);
    return areIntervalsOverlapping(
      { start: startA, end: endA },
      { start: startB, end: endB }
    );
  }

  function validateSessions() {
    const errors = {};
    const sessionArray = Object.values(selectedSessions.value);
    for (let i = 0; i < sessionArray.length; i++) {
      const session = sessionArray[i];
      if (session.capacity <= session.registeredAttendees) {
        errors[session.id] = `Session "${session.title}" is at full capacity.`;
      }
      for (let j = i + 1; j < sessionArray.length; j++) {
        const otherSession = sessionArray[j];
        if (sessionsOverlap(session, otherSession)) {
          errors[session.id] = `Session "${session.title}" conflicts with "${otherSession.title}".`;
        }
      }
    }
    return errors;
  }

  return {
    selectedSessions,
    groupedSessions,
    toggleSession,
    validateSessions
  };
}
