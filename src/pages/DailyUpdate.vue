<template>
  <q-page padding>

    <div class="q-mb-md text-h5 text-center">
      <u>  Daily Updates </u>
    </div>

  <div class="row items-lg-center">
    <q-btn
      round
      color="primary"
      icon="add"
      @click="openForm"
      />
  </div>
    <br>

    <q-dialog v-model="isFormOpen" persistent>
      <q-card style="min-width: 500px; max-width: 700px;">
        <q-card-section>
          <div class="text-h6">{{isEditing ? 'Edit Daily Update' : 'Add Daily Update' }}</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="SubmitForm">

            <q-input v-model="form.name" label="Name" filled required />
            <q-input v-model="form.updateStatus" label="Update Status" filled required />
            <q-input v-model="form.description" label="Description" filled required type="textarea"/>

            <div class="q-mt-md">
            <q-btn type="submit" label="Submit" color="primary" />
              <q-btn label="cancel" color="negative" flat @click="closeForm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table
      :rows="activities" :columns="columns" row-keys="id" flat bordered >

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            icon="edit"
            @click="editActivity(props.row)"
            flat
            />

          <q-btn
            color="negative"
            icon="delete"
            @click="deleteActivity(props.row.id)"
            flat
            class="q-ml-sm"
          />

        </q-td>
      </template>
    </q-table>

  </q-page>
</template>



<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useQuasar} from "quasar";

const $q = useQuasar();

const isFormOpen = ref(false);
const isEditing = ref(false);

const form = ref({
  name: '',
  updateStatus:'',
  description:'',
});

const activities = ref([]);

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'name', label: 'Name', align: 'left', field: 'name' },
  { name: 'updateStatus', label: 'update status', align:'left', field: 'updateStatus' },
  { name: 'description', label: 'Description', align:'left', field: 'description'},
  { name: 'created_at', label: 'Created_at', align: 'left', field: 'created_at' },
  { name: 'actions', label: 'Actions', align: 'center' }
];

const openForm = () => {
  isFormOpen.value = true;
  isEditing.value = false;
  form.value = {name: '', updateStatus: '', description: ''};
};

const closeForm = () => {
  isFormOpen.value = false;
};

const fetchActivities = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/activities', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'content-Type': 'application/json',
      },
    });
    activities.value = response.data || [];
  }catch(error){
    console.error('Error fetching activities:',error);
    activities.value = [];
  }
};

const editActivity = (activity) => {
  form.value = {...activity};
  isEditing.value = true;
  isFormOpen.value = true;
};

const deleteActivity = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/activities/${id}`, {
      headers : {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        'content-Type': 'application/json',
    },
    });

    $q.notify({
      type: 'positive',
      message: 'Activity deleted successfully',
      timeout: 2000
    });

    await fetchActivities();
  } catch (error) {
    console.error("Error deleting activity:", error);
    $q.notify({
      type: "negative",
      message: "Failed to delete activity. Please try again",
      timeout: 2000,
    });
  }
};
const SubmitForm = async () => {
  try {
    if(isEditing.value){
      await axios.post(`http://127.0.0.1:8000/api/activities/${form.value.id}`, form.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'content-Type': 'application/json',
        },
      });

      $q.notify({
        type:'positive',
        message: 'Activity updated successfully',
        timeout:2000
      });
    }else {
      await axios.post('http://127.0.0.1:8000/api/activities', form.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      $q.notify({
        type: 'positive',
        message: 'Activity added successfully',
        timeout: 2000
      });
    }

await fetchActivities();
closeForm();

  }catch (error){
    console.error('error submitting form:',error);
    $q.notify({
      type: 'negative',
      message: 'Failed to add activity. Please try again',
      timeout: 2000
    });
    }
};

onMounted(fetchActivities);

</script>
