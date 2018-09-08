<template>
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="60%">
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        <v-card>
          <v-card-title class="headline">옵션 추가 / 수정 / 삭제</v-card-title>
          <v-card-text class="detail_title">
            선택옵션 목록
            
          </v-card-text>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="option_dialog_true">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click="option_dialog_true">Agree</v-btn>
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
    dialog: true
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
.detail_title {
  font-size: 20px;
}
</style>
