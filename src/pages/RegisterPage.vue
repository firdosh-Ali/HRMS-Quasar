<template>
  <q-layout>
    <q-page-container>
  <q-page class="q-pa-md flex flex-center">
<q-form @submit="register"  class="q-gutter-md form-container">
<h4><b><u>Registration form</u></b></h4>

<q-input
  v-model="form.name"
  label="Name"
  :rules="[val => !!val  || 'Name field is required']"
  filled
  dense
  class="q-mb-md input-field" />

  <q-input
    v-model="form.contact"
    label="Contact"
    :rules="[
              val => !!val || 'Contact is required',
              val => /^\d{10}$/.test(val) || 'Contact must be valid '
            ]"
    filled
    dense
    class="q-mb-md input-field" />

  <q-input
    v-model="form.address"
    label="Address"
    :rules="[val => !!val  || 'Address field is required']"
    filled
    dense
    class="q-mb-md input-field" />

  <q-input
    v-model="form.date_of_birth"
    label="Date_of_birth"
    :rules="[val => !!val  || 'Date_of_birth field is required']"
    filled
    dense
    class="q-mb-md input-field" />


  <q-input
    v-model="form.email"
    label="Email"
    :rules="[
              val => !!val || 'Email field is required',
              val => /.+@.+\..+/.test(val) || 'Email must be valid'
            ]"
    filled
    dense
    class="q-mb-md input-field" />

  <q-input
    v-model="form.password"
    label="Password"
    type="password"
    :rules="[val => !!val || 'Password field is required', val => val.length >= 6 || 'Password must be at least 6 characters']"
    filled
    dense
    class="q-mb-md input-field" />

  <q-btn
    label="Register"
    type="submit"
    color="primary"
    class="full-width q-mt-lg btn-register" />

  <div class="footer-buttons">
    <h7>Already have an Account ?</h7>
    <q-btn flat label="Login" color="primary" to="/login" />
    <q-btn flat label="Home" color="primary" to="/" />
  </div>


</q-form>
  </q-page>
  </q-page-container>
    </q-layout>
</template>

<script>
import {onMounted, ref} from 'vue';
import {useQuasar} from "quasar";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: 'RegisterPage',

  setup() {

    const $q = useQuasar();
    const router = useRouter();

    const form = ref({
      name: '',
      contact:'',
      address:'',
      date_of_birth:'',
      email:'',
      password:''
    });

    const errors = ref({
      name: '',
      contact:'',
      address:'',
      date_of_birth:'',
      email:'',
      password:''
    });

    const validateForm = () => {
      errors.value = {};

      // Validation rules
      const rules = {
        name: 'Name is required',
        contact: 'Contact field is required',
        address: 'Address field is required',
        date_of_birth:'Date_of_birth field is required',
        email: value => (!value ? 'Email field is required' : (!/.+@.+\..+/.test(value) && 'Email must be valid')),
        password: value => (!value ? 'Password field is required' : (value.length < 6 && 'Password must be at least 6 characters'))
      };

      // Validate each field
      for (const field in rules) {
        const rule = rules[field];
        const value = form.value[field];

        if (typeof rule === 'function') {
          errors.value[field] = rule(value);
        } else if (!value) {
          errors.value[field] = rule;
        }
      }

      return Object.keys(errors.value).every(key => !errors.value[key]);
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        console.log(response.data);
        router.push('/dashboard');
      } catch (error) {
     console.log(response);
      }
    };

    onMounted(() => {
      fetchUserData();
    });
    const register = async() => {
      if(validateForm()){
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/register', form.value);
          $q.notify({type: 'positive', message: 'Registeration successfully'});

          setTimeout(() => {
            window.location.href = '/login';
          },1000);
        }catch (error) {
          $q.notify({ type: 'negative', message:error.response.data.message || 'Registration failed' });
        }
      }
    };

    return {
      form,
      errors,
      register
    };
  }
};
</script>

<style scoped>

.form-container{
  max-width:400px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.input-field{
  border-radius: 8px;
  background-color: #f9f9f9;
}
.btn-register{
  border-radius: 8px;
  font-weight: bold;
}
</style>

