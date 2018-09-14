<template>
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        <v-card>
          <v-card-title class="headline">상품 삭제</v-card-title>
          <v-card-text>정말 이 상품을 삭제 하시겠습니까?.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="option_dialog_true">취소</v-btn>
            <v-btn color="green darken-1" flat @click="option_dialog_true">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'optionModal',
  props: ['l_option'],
  data: () => ({
    row: '1',
    dialog: true,
  }),
  mounted() {
    console.log(this.l_option)
  },
  methods: {
    option_dialog_true() {
      this.$store.commit('option_dialog', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
