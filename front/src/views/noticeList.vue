<template>
    
</template>

<script>
  export default {
    data: () => ({
        
    }),
    computed: {
      alba2_login() {
          return this.$store.getters.alba2_login
      }
    },
    mounted() {
        this.$store.commit('add_notice_btn', true);
        this.$store.commit('add_product_btn', false);
    },
    methods: {
        
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>