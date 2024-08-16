<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="sendEmail" class="q-gutter-md">

      <q-input
        v-model="emailForm.email"
        label="To"
        type="email"
        filled
        :rules="[ val => !!val || 'To is required']"
      />

      <q-input
        v-model="emailForm.title"
        label="subject"
        filled
        :rules="[ val => !!val || 'Subject is required']"
        />

      <q-input
        v-model="emailForm.body"
        label="Body"
        type="textarea"
        filled
        :rules="[ val => !!val || 'Body is required']"
        />

      <q-btn type="submit" label="Send Email" color="primary" :loading="loading" :disable="loading" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar} from "quasar";
import axios from "axios";

const $q = useQuasar();
const loading = ref(false);

const emailForm = ref({
  email: '',
  title: '',
  body: ''
})

const sendEmail = async () => {
  loading.value = true;
  try {
   const response = await axios.post('http://127.0.0.1:8000/api/send-email',emailForm.value,{
     headers: {
       Authorization: `Bearer ${localStorage.getItem('authToken')}`,
       "Content-Type": 'application/json',
     }
   });

    $q.notify({ type: 'positive', message:'Email sent successfully',timeout:2000})
  }catch (error) {
    $q.notify({ type: 'negative', message:'Failed to send email',timeout:2000})
  } finally {
    loading.value = false;
  }
};
</script>
