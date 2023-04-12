<template>
  <!-- <input v-model="searchInput" placeholder="Pesquisar..." /> -->
  {{ meta }}
  <div class="d-flex">
    <v-text-field label="Pesquisar..." :append-inner-icon="'fa-solid fa-search'" @click:append-inner="filterInput()
    " v-model="searchInput" class="mr-5">
    </v-text-field>
    <v-btn class="text-none" color="warning" variant="flat" size="x-large" prepend-icon="" @click="clearInput()">Limpar busca</v-btn>
  </div>
  <!-- <v-btn density="default" variant="text" icon="fa-solid fa-search mr-5" :style="{ color: 'red' }" size="small"
    @click="filterInput()">
  </v-btn> -->
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
          <v-btn variant="text" icon="fa-solid fa-pencil" :style="{ color: '#2196F3' }" size="small"
            @click="editUser(item.id)">
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-row class="mt-8">
    <v-col>
    <v-text-field type="number" label="Digite qual página deseja..." v-model="navPages" @blur="navPagesInput()"></v-text-field>
  </v-col>
  <v-col class="mt-2 d-flex justify-space-around">
    <v-btn color="blue-darken-4" @click="primeiraPagina()">primeira</v-btn>
    <v-btn color="blue-darken-4" @click="anteriorPagina()">anterior</v-btn>
    <v-btn color="blue">{{ paginaAtual }}</v-btn>
    <v-btn color="blue-darken-4" @click="proximaPagina()">proxima</v-btn>
    <v-btn color="blue-darken-4" @click="ultimaPagina()">ultima</v-btn>
  </v-col>
  <v-col class="mt-3">
    <p class="font-weight-bold">Total de páginas: {{ totalPaginas }}</p>
  </v-col>
</v-row>
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
    const totalPaginas = ref('');
    const { list, remove, search, pagination } = postsService()
    const snackbar = useSnackbar();
    const searchInput = ref('');
    const paginaAtual = ref(1);
    const navPages = ref('');

    onMounted(() => {
      getUsers()
    })

    const navPagesInput = async () => {
      paginaAtual.value = navPages.value;
      // if(paginaAtual >= 1){
      const { data } = await pagination(paginaAtual);
      users.value = [];
      users.value = data;
    }

    const primeiraPagina = async () => {
      paginaAtual.value = 1;
      // if(paginaAtual >= 1){
      const { data } = await pagination(paginaAtual);
      users.value = [];
      users.value = data;
      //  }
      // console.log(paginaAtual)
    }

    const anteriorPagina = async () => {
      if(paginaAtual.value >   1){
        paginaAtual.value--;
      const { data } = await pagination(paginaAtual);
      users.value = [];
      users.value = data;
       }
    }

    const proximaPagina = async () => {
      console.log(paginaAtual.value, totalPaginas.value)
      if(paginaAtual.value <= (totalPaginas.value -1)){
        paginaAtual.value++;
        const { data } = await pagination(paginaAtual);
        users.value = [];
        users.value = data;
      }
    }

    const ultimaPagina = async () => {
      paginaAtual.value = totalPaginas.value;
      // if(paginaAtual >= 1){
      const { data } = await pagination(paginaAtual);
      users.value = [];
      users.value = data;
      //  }
      // console.log(paginaAtual)
    }


    const getUsers = async () => {
      try {
        const { data, meta } = await list();
        users.value = data;
        totalPaginas.value = meta.pagination.pages;
      } catch (error) {
        // console.log(error)
      }
    },

      filterInput = async () => {
          const { data } = await search(searchInput.value);
          users.value = [];
          users.value = data;
      }

      function clearInput() {
          getUsers();
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
      totalPaginas,
      deleteUser,
      successMessage,
      errorMessage,
      editUser,
      filterInput,
      searchInput,
      pagination,
      paginaAtual,
      proximaPagina,
      anteriorPagina,
      primeiraPagina,
      ultimaPagina,
      clearInput,
      navPages,
      navPagesInput

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
  background-color: rgb(250, 250, 250);
}

.v-data-table-header {
  background-color: rgba(182, 183, 187);
  color: white;
}

.v-data-footer {
  background-color: rgb(250, 250, 250);
}

.theme--light.v-data-table thead tr th {
  color: white;
}
</style>
