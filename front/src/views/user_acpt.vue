<template>
  <v-form dark>
    <v-container>
      <div>
          <h2>유저 승인</h2>
      </div>
      <br>
      <v-layout row wrap v-for="item in acpt_nlist" :key="item.no">
        <v-flex xs12 sm6 md3>
          <v-text-field
            :value="item.u_alias"
            label="Solo"
            solo
            readonly
          ></v-text-field>
        </v-flex>
        <v-btn class="no_margin" @click="acptYClick(item.no)" color="success">승인</v-btn>
        <v-btn class="no_margin" @click="acptNClick(item.no)" color="error">거부</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      acpt_nlist: [] 
    }),
    computed: {
      alba2_login() {
        return this.$store.getters.alba2_login
      },
    },
    mounted() {
        this.refreshList()
        
    },
    methods: {
        acptYClick(no) {
            this.$store.dispatch('store_acpt_y', {
              s_no: this.alba2_login.no,
              us_no: no
            })
            .then((res) => {
              this.refreshList()
            })
        },
        acptNClick(no) {
          this.$store.dispatch('store_acpt_delete', {
              s_no: this.alba2_login.no,
              us_no: no
            })
            .then((res) => {
              this.refreshList()
            })
        },
        refreshList() {
          this.$store.dispatch('store_acpt_cnt', {
              s_no: this.alba2_login.no
          })
          this.$store.dispatch('store_acpt_nlist', {
              s_no: this.alba2_login.no
          }).then((res) => {
              this.acpt_nlist = res
          })
        }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.no_margin {
    margin: 8px;
    height: 48px;
}

</style>