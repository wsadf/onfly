<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          ID
        </th>
        <th class="text-left">
          Nome
        </th>
        <th class="text-left">
          Email
        </th>
        <th class="text-left">
          Gênero
        </th>
        <th class="text-left">
          Status
        </th>
        <th class="text-left">
          Ações
        </th>
      </tr>
    </thead>
    <tbody class="text-left">
      <tr v-for="(item, index) in users" :key="index">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.gender }}</td>
        <td>{{ item.status }}</td>
        <td>
          <v-btn density="compact" icon="fa-solid fa-trash-can" :style="{ color: 'red' }" size="x-small"
            @click="deleteUser(item.id)">
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <vue3-snackbar top center dense :duration="4000">
  </vue3-snackbar>
</template>

<script>
// import api from '@/services/api';
import postsService from '@/services/posts'
import { onMounted, ref } from 'vue';
import { useSnackbar } from "vue3-snackbar";

export default {
  name: 'TableCrud',

  setup() {

    const users = ref([]);
    const { list, remove } = postsService()
    const snackbar = useSnackbar();

    onMounted(() => {
      getUsers()
    })

    const getUsers = async () => {
      try {
        const { data } = await list();
        users.value = data;
      } catch (error) {
        console.log(error)
      }
    }

    const deleteUser = async (id) => {
      try {
        await remove(id)
        successMessage()
        await getUsers()
      } catch (error) {
        errorMessage()
      }
    }

    function successMessage() {
      snackbar.add({
        type: 'success',
        text: 'Apagado com sucesso'
      })
    }

    function errorMessage() {
      snackbar.add({
        type: 'danger',
        text: 'Erro ao excluir usuário'
      })
    }

    return { users, deleteUser, successMessage, errorMessage}
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
