<template>
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog_v" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{dialog.title}}</v-card-title>
          <v-card-text>{{dialog.content}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1 bold" flat @click="dialog_hide">취소</v-btn>
            <v-btn color="red darken-1" flat @click="$emit('d_product')">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'modal',
  data: () => ({
    row: '1',
    dialog_v: true,
  }),
  computed: {
    dialog() {
      return this.$store.getters.dialog;
    }
  },
  mounted() {

  },
  methods: {
    dialog_hide() {
      this.$store.commit('dialog', {
        dialog: false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bold {
  font-weight: bold;
}
</style>
