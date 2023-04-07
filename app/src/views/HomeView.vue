<template>
  <div class="home">
    <TableCrud />
  </div>
</template>

<script>
// @ is an alias to /src
import TableCrud from '@/components/TableCrud.vue'

export default {
  name: 'HomeCrud',
  components: {
    TableCrud
  }
}
</script>
