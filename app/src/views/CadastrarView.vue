<template>
  <div>
    <v-form @submit.prevent="submitForm" @closed="v$.$reset()">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field outlined v-model="form.name" label="Primeiro nome" required>
            </v-text-field>
            <span class="d-flex justify-start text-red-lighten-1" v-for="(error, index) in v$.name.$errors" :key="index">
              {{ error.$message }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field outlined v-model="form.email" label="Email" required>
            </v-text-field>
            <span class="d-flex justify-start text-red-lighten-1" v-for="(error, index) in v$.email.$errors" :key="index">
              {{ error.$message }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex">
            <input
            id="true"
            class="mr-2"
            type="radio"
            value="male"
            v-model="form.gender"
          />
          <label for="true">Masculino</label>
          <input
            id="false"
            class="mr-2"
            type="radio"
            value="female"
            v-model="form.gender"
          />
          <label for="false">Feminino</label>
        </div>
            <span class="d-flex justify-start text-red-lighten-1" v-for="(error, index) in v$.gender.$errors"
              :key="index">
              {{ error.$message }}
            </span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field outlined v-model="form.status" label="Status" required>
            </v-text-field>
            <span class="d-flex justify-start text-red-lighten-1" v-for="(error, index) in v$.status.$errors"
              :key="index">
              {{ error.$message }}
            </span>
          </v-col>
        </v-row>
        <v-btn color="red" variant="flat" size="large" to="/"> Cancelar
        </v-btn>
        <v-btn type="submit" color="primary" variant="flat" size="large"> Salvar
        </v-btn>
      </v-container>
    </v-form>
    <h1>Radios: {{form.gender}}</h1>
  </div>
</template>
<script>
import { ref } from 'vue';
import { computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, maxLength, helpers } from '@vuelidate/validators'
import postsService from '@/services/posts'


export default {
  name: 'FormUser',

  setup() {

    const { post } = postsService();

    const radioGroup = ref()

    const form = ref({
      name: '',
      email: '',
      gender: '',
      status: '',
    })


    const rules = computed(() => {
      return {
        name: { required: helpers.withMessage('O campo nome é obrigatório.', required), maxLength: maxLength(191) },
        email: { required: helpers.withMessage('O campo email é obrigatório.', required), email: helpers.withMessage('E-mail inválido.', email), maxLength: maxLength(191) },
        gender: { required: helpers.withMessage('O campo gênero é obrigatório.', required) },
        status: { required: helpers.withMessage('O campo status é obrigatório.', required) },
      }
    });


    const v$ = useVuelidate(rules, form)

    const submitForm = async () => {
      const isValid = await v$.value.$validate();
      if (isValid) {
        await post(form.value)
        alert("Cadastrado com sucesso!!!")
      } else {
        alert("Erro ao enviar o formulário")
      }
    }

    return {
      form,
      v$,
      submitForm,
      radioGroup
    }

  }
}

</script>

<style scoped>

</style>