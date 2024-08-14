<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>HRMS</q-toolbar-title>
        <q-btn flat label="Home" to="/" />
        <q-btn flat label="Login" to="/login" />
        <q-btn flat label="Register" to="/register" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md flex flex-center">
        <LoginPage />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginPage from "pages/LoginPage.vue";
import { useRouter } from 'vue-router';

export default {
  name: 'HomePage',
  components: {
    LoginPage
},

setup()
{
  const router = useRouter();

}
};
</script>

