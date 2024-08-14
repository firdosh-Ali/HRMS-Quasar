<template>
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card>
      <q-card-section>
        <div class="q-mb-md text-h5">Edit User</div>
        <q-input v-model="formData.name" label="Name" />
        <q-input v-model="formData.address" label="Address" />
        <q-input v-model="formData.contact" label="Contact" />
        <q-input v-model="formData.email" label="Email" />
        <q-input v-model="formData.date_of_birth" label="Date of Birth" type="date" />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Cancel" color="negative" @click="closeDialog" />
        <q-btn label="Update" color="primary" @click="updateUser" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {onMounted, ref, watch, defineEmits, defineProps} from 'vue';
import axios from 'axios';
import {useQuasar} from 'quasar';

const props = defineProps(['user']);
const emit = defineEmits(['close', 'update']);

const isDialogOpen = ref(false);
const formData = ref({ ...props.user });

const $q = useQuasar();

watch(() => props.user, (newUser) => {
  formData.value = { ...newUser };
}, { immediate: true });

const open = () => {
  isDialogOpen.value = true;
};

const closeDialog = () => {
  isDialogOpen.value = false;
  emit('close');
};

const updateUser = async () => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/users/${formData.value.id}`, formData.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });

    emit('update');

    $q.notify({
      type:'positive',
      message: 'user updated successfully',
      timeout:2000
    });

    closeDialog();

  } catch (error) {
if(error.response && error.response.status === 422){
  const errors = error.response.data.errors;
  if(errors.email){
    $q.notify({
      type:'negative',
      message:'an error occured',
      timeout:2000,
    });
  }
}else {
  console.error('failed to update user:', error);
  $q.notify({
    message:'Email already exist',
    timeout: 2000,
  });
}
  }
};
onMounted(() => {
  if(props.user) {
    open()
  }
});
</script>
