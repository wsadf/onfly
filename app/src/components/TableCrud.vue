<template>
  <input type="text" placeholder="Search..."  />
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
        <td class="d-flex">
          <v-btn density="default" variant="text" icon="fa-solid fa-trash-can mr-5" :style="{ color: 'red' }" size="small"
            @click="deleteUser(item.id)">
          </v-btn>
          <v-btn  variant="text" icon="fa-solid fa-pencil" :style="{ color: '#2196F3' }" size="small"
            @click="editUser(item.id)">
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <vue3-snackbar top center dense :duration="4000">
  </vue3-snackbar>
</template>

<script>
import postsService from '@/services/posts'
import { onMounted, ref } from 'vue';
import { useSnackbar } from "vue3-snackbar";
import { useRouter } from 'vue-router';

export default {
  name: 'TableCrud',

  setup() {

    const router = useRouter();

    const users = ref([]);
    const { list, remove, search } = postsService()
    const snackbar = useSnackbar();

    onMounted(() => {
      getUsers()
    })

    const filterInput = async (words) => {
      try {
        const { data } = await search(words);
        users.value = data;
      } catch (error) {
        console.log(error)
      }
    }

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

    const editUser = (id) => {
      router.push({ name: 'cadastrar', params: { id } })
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

    return {
      users,
      deleteUser,
      successMessage,
      errorMessage,
      editUser,
      filterInput
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  tbody tr:nth-of-type(even) {
    background-color: rgba(236, 237, 237);
  }

  tbody tr:nth-of-type(odd) {
    background-color: rgb(250 ,250, 250);
  }

  .v-data-table-header {
    background-color: rgba(182, 183, 187);
    color: white;
  }

  .v-data-footer {
    background-color: rgb(250 ,250, 250);
  }

  .theme--light.v-data-table thead tr th {
    color: white;
  }
</style>
