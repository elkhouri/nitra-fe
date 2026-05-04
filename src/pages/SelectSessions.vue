<script setup>
import { ref, computed } from 'vue';
import { sessions } from '../mocks/sessions';
import Session from '../components/Session.vue';
import { useSessions } from '../composables/sessions';

const { selectedSessions, toggleSession, groupedSessions } = useSessions();

const currentDate = ref(Object.keys(groupedSessions.value)[0] || '');
const toggleOptions = Object.entries(groupedSessions.value).map(([key, value]) => ({ label: key, value: key }));
const selectedCount = computed(() => Object.keys(selectedSessions.value).length);
</script>

<template>
  <q-page>
    <div class="mb-8 text-h3">Select Sessions</div>

    <q-btn-toggle class="mb-6" v-model="currentDate" toggle-color="primary" :options="toggleOptions"/>

    <div class="mb-6">
      <span v-if="selectedCount > 1">{{ selectedCount}} sessions selected</span>
      <span v-else-if="selectedCount === 1">1 session selected</span>
      <span v-else>No session selected</span>
    </div>

    <div class="mb-10 grid grid-cols-2 gap-4">
      <session
        v-for="session in groupedSessions[currentDate]"
        :key="session.id"
        :session="session"
        :active="selectedSessions[session.id]"
        @click="toggleSession(session)"
      />
    </div>
  </q-page>
</template>
