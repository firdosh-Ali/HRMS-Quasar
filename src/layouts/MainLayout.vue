<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          HRMS-Management
        </q-toolbar-title>


        <q-btn @click="logout" label="Logout" flat />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          <h5><b> HR-Human Resource</b></h5>
        </q-item-label>

        <q-item clickable v-ripple @click="goToDashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
            <q-item-label caption>View dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goToProfile">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>View profile</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goToDailyUpdate">
          <q-item-section avatar>
            <q-icon name="menu_book" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Daily Update</q-item-label>
            <q-item-label caption>View daily-update</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goToHRPolicy">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>HR Policy</q-item-label>
            <q-item-label caption>View hr policy</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goToEmailPage">
          <q-item-section avatar>
            <q-icon name="email" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Send Email</q-item-label>
            <q-item-label caption>View Send Email</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goToHolidaysPage">
          <q-item-section avatar>
            <q-icon name="holiday" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Holidays</q-item-label>
            <q-item-label>View Holidays</q-item-label>
          </q-item-section>
        </q-item>


      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from 'quasar';
import {onMounted, ref} from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';


const $q = useQuasar();
const router = useRouter();

const leftDrawerOpen = ref(false);


function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const goToDashboard = () => {
  router.push('/dashboard');
};
const goToProfile = () => {
  router.push('/dashboard/profile');
};

const goToDailyUpdate = () => {
  router.push('/dashboard/daily-update');
}

const goToHRPolicy = () => {
  router.push('/dashboard/HRPolicy');
}

const goToEmailPage = () => {
  router.push('/dashboard/EmailPage');
}

const goToHolidaysPage = () => {
  router.push('/dashboard/HolidaysPage');
}


const fetchUserData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
  } catch (error) {
    router.push('/login');

  }
};

const logout = async () => {
  try {
   const response =  await axios.post('http://127.0.0.1:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
if(response.data.status=== true) {
  $q.notify({type: 'positive', message: 'Logged out successfully'});
  localStorage.removeItem('authToken');
  router.push('/login');
}
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Failed to logout' });
  }
};

onMounted(() => {
  fetchUserData();
});

</script>
