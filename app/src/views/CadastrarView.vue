<template>
  <div>
    <v-form @submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
            outlined
             v-model="form.name"
             label="Primeiro nome"
             required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            outlined
             v-model="form.email"
             label="Email"
             required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
            outlined
             v-model="form.gender"
             label="Gênero"
             required>
            </v-text-field>
          </v-col>
        </v-row>        
        <v-btn color="red"   variant="flat" size="large" to="/"
            > Cancelar
          </v-btn>
          <v-btn type="submit" color="primary" variant="flat" size="large"
            > Salvar
          </v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'FormUser',
  
  methods: {
    handleSubmit() {
      alert("form submited");
    },
  },
  setup() {
    const form =  ref({
        name: '',
        email: '',
        gender: '',
    })

    return {
      form
    }

  }
}

</script>
