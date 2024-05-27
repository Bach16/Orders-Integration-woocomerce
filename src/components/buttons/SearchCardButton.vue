<template>
  <RouterLink :to="params ? { name: route, params: { id: id } } : { name: route }">
    <v-btn color="primary" height="36"> {{ content }} </v-btn>
  </RouterLink>
</template>
<script>
export default{
    props: ["route","id","content","params"]
}
</script>
