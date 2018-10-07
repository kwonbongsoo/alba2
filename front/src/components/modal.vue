<template>
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog_v" persistent max-width="290">
        <v-card v-if="dialog.title == '상품 삭제'">
          <v-card-title class="headline">{{dialog.title}}</v-card-title>
          <v-card-text>{{dialog.content}}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1 bold" flat @click="dialog_hide">취소</v-btn>
            <v-btn color="red darken-1" flat @click="$emit('d_product')">삭제</v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else-if="dialog.title == '입금 확인'">
          <v-card-title class="headline">{{dialog.title}}</v-card-title>
          <v-card-text class="padding_bottom">{{dialog.content}}</v-card-text>
            <v-card-text class="padding_top">
              <v-flex xs12>
                <v-text-field label="택배회사" color="info" v-model='delivery_name' required maxLength='20'></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="송장번호" color="info" v-model='delivery_no' type="text" required maxLength='20'></v-text-field>
              </v-flex>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1 bold" flat @click="dialog_hide">취소</v-btn>
            <v-btn color="darken-1" flat @click="pay_confirm">확인</v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else-if="dialog.title == '송장 수정'">
          <v-card-title class="headline">{{dialog.title}}</v-card-title>
          <v-card-text class="padding_bottom">{{dialog.content}}</v-card-text>
            <v-card-text class="padding_top">
              <v-flex xs12>
                <v-text-field label="택배회사" color="info" v-model='delivery_name' required maxLength='20'></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="송장번호" color="info" v-model='delivery_no' type="text" required maxLength='20'></v-text-field>
              </v-flex>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1 bold" flat @click="dialog_hide">취소</v-btn>
            <v-btn color="darken-1" flat @click="pay_confirm">확인</v-btn>
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
    delivery_name: '',
    delivery_no: '',
    cnt: 0,
  }),
  computed: {
    dialog() {
      return this.$store.getters.dialog;
    },
    delivery_info () {
      return this.$store.getters.delivery_info;
    }
  },
  mounted() {

  },
  methods: {
    dialog_hide() {
      if (this.cnt < 1) {
        this.$store.commit('dialog', {
          dialog: false
        })
      }
    },
    pay_confirm() {
      let params = {
        delivery_name: this.delivery_name,
        delivery_no: this.delivery_no,
        order_no: this.delivery_info.order_no
      };
      if (this.cnt < 1) {
        this.$store.commit('progress', true)
        this.$store.dispatch('pay_confirm', params)
        .then((res) => {
          this.$store.commit('progress', false)
          if(res == 'SUCCESS' || res == 'MODIFY') {
            this.$emit('selectData');
          }
          this.$store.commit('dialog', {
            dialog: false
          })
        })
        this.cnt++;
      
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bold {
  font-weight: bold;
}
.padding_bottom {
  padding-bottom: 0;
}
.padding_top {
  padding-top: 10px;
}
</style>
