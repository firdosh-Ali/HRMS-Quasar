<template>
  <q-page class="q-pa-none">
    <div class="holiday-page full-height full-width">
      <div class="header text-h4 text-center q-pa-md">
        Holiday Details
      </div>
      <q-separator />
      <div class="holiday-content q-pa-md">
        <q-list bordered separator>
          <q-item v-for="holiday in holidays" :key="holiday.id" clickable>
            <q-item-section>
              <div class="text-subtitle1">{{ holiday.id }}</div>
              <div class="text-subtitle1">{{ holiday.name }}</div>
              <div class="text-caption text-grey">{{ holiday.date }}</div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const holidays = ref([
  { id: 1, name: "New Year's Day", date: '2024-01-01' },
  { id: 2, name: 'Labours Day', date: '2024-07-04' },
  { id: 3, name: 'Christmas Day', date: '2024-12-25' },
  { id: 4, name: 'Eid Day', date: '2024-2-25' },
  { id: 5, name: 'Bakra Eid Day', date: '2024-3-15' },
  { id: 6, name: 'Dashain Day', date: '2024-09-25' },
  { id: 7, name: 'Tihar Day', date: '2024-12-25' },
  // Add more holidays as needed
]);
</script>

<style scoped>
.holiday-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;
}

.header {
  background-color: #3f51b5;
  color: white;
}

.holiday-content {
  flex-grow: 1;
  overflow-y: auto;
  background-color: white;
}

.q-list {
  padding: 0 16px;
}

.q-item {
  padding: 16px 0;
}
</style>
