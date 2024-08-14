
<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-pa-md">

        <div v-if="userData">
        <q-card class="q-ma-xs" bordered>
          <q-card-section>
            <div class="q-mb-md flex flex-center">
              <q-avatar size="120px" class="q-mr-md">
                <img :src="userData?.profile_picture || 'https://play-lh.googleusercontent.com/yXzH6YlTpH_aXHTETtmgduoA7k0itJ1QIdy0K9Vjv2Tv1PwV1xwOanc8WCkBF4lASg' " alt="Profile" />
              </q-avatar>
              <div>
                <h2>{{ userData.name }}</h2>
               <p>Ambition Guru</p>
                <p><strong>Employee Id:</strong> {{ userData.id }}</p>
                <p>{{userData.email}}</p>
              </div>
            </div>

            <q-separator />

            <q-expansion-item label="Contact Details" icon="phone" dense>
              <q-item>
                <q-item-section>
                  <p><strong>Phone:</strong> {{ userData.contact }}</p>
                  <p><strong>Email:</strong> {{ userData.email }}</p>
                  <p><strong>Address:</strong> {{ userData.address }}</p>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-expansion-item label="Employment Details" icon="work" dense>
              <q-item>
                <q-item-section>
                  <p><strong>Employee Name:</strong> {{ userData.name }}</p>
                  <p><strong>Employee Date_of_birth:</strong> {{ userData.date_of_birth }}</p>
                  <p><strong>Created Date:</strong> {{ userData.created_at }}</p>
                  <p><strong>Updated Date:</strong> {{ userData.updated_at }}</p>
                <p>Status : </p>
              <p>Manager  :</p>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-expansion-item label="Additional Information" icon="info" dense>
              <q-item>
                <q-item-section>
                  <p><strong>Date of Birth:</strong> {{ userData.date_of_birth }}</p>
            <p>Emergency Contact : 100 </p>
                <p>Skills : </p>
                 <p>Certification : </p>
                </q-item-section>
              </q-item>
            </q-expansion-item>

            <q-separator />

          </q-card-section>
        </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";

const userData = ref(null);

const fetchUserData = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    userData.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};



onMounted(() => {
  fetchUserData();
});

</script>
