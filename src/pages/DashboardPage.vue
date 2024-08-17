<template>

  <q-page class="q-pa-md">
    <div class="DashBoard-page full-height full-width">
      <div class="header text-h4 text-center q-pa-md">
        Ambition Guru Employee Details
      </div>
    </div>
    <div v-if="users.length">
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        separator="horizontal"
        :pagination="pagination"
      >

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="edit"
              color="primary"
              @click="openEditForm(props.row)"
            />

            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deleteUser(props.row.id)"
            />

          </q-td>
        </template>


      </q-table>
    </div>

    <div v-else>
      <q-spinner color="primary" />
      <p>Loading data...</p>
    </div>

    <EditForm
      v-if="selectedUser"
      :user="selectedUser"
      @close="handleClose"
      @update="fetchUsers"
    />

  </q-page>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import EditForm from 'pages/EditForm.vue';
import { useQuasar} from "quasar";

const $q = useQuasar();
const users = ref([]);
const selectedUser = ref(null);

const columns = ref([
  { name: 'id', label: 'ID', align: 'left', field: row => row.id },
  { name: 'name', label: 'Name', align: 'left', field: row => row.name },
  { name: 'address', label: 'Address', align: 'left', field: row => row.address },
  { name: 'contact', label: 'Contact', align: 'left', field: row => row.contact },
  { name: 'email', label: 'Email', align: 'left', field: row => row.email },
  { name: 'date_of_birth', label: 'Date_of_birth', align: 'left', field: row => row.date_of_birth },
  {
    name:'actions',
    label:'Actions',
    align:'center',
    field: row => row,
    sortable:false
    }
]);

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
});

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/all-users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });
    users.value = response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    });

    $q.notify({
      type: 'positive',
      message: 'User deleted successfully',
      timeout: 2000
    });

    // Refresh the user list
    fetchUsers();
  } catch (error) {
    console.error('Failed to delete user:', error);
    $q.notify({
      type: 'negative',
      message: 'Failed to delete user',
      timeout: 2000
    });
  }
};

const openEditForm = (user) => {
  selectedUser.value = { ...user };
};

const handleClose = () => {
  selectedUser.value = null;
};


onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.DashBoard-page {
  background-color: dodgerblue;
  color:white;
}
</style>
