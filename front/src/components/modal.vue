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

        <v-card v-else-if="dialog.title == '배송 시작'">
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
            <v-btn color="darken-1" flat @click="delivery_start">확인</v-btn>
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
            <v-btn color="darken-1" flat @click="delivery_start">확인</v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-else-if="dialog.title == '상점 주문 취소'">
          <v-card-title class="headline">{{dialog.title}}</v-card-title>
          <v-card-text class="padding_bottom">{{dialog.content}}</v-card-text>
            <v-card-text class="padding_top">
              <v-flex xs12>
                <v-text-field label="취소 사유(20자 이하)" color="info" v-model='reason' required maxLength='20'></v-text-field>
              </v-flex>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1 bold" flat @click="dialog_hide">취소</v-btn>
            <v-btn color="darken-1" flat @click="s_order_cancel">확인</v-btn>
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
    reason: '',
  }),
  computed: {
    dialog() {
      return this.$store.getters.dialog;
    },
    delivery_info () {
      return this.$store.getters.delivery_info;
    },
    s_order_cancel_info () {
      return this.$store.getters.s_order_cancel_info;
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
    delivery_start() {
      let params = {
        delivery_name: this.delivery_name,
        delivery_no: this.delivery_no,
        order_no: this.delivery_info.order_no
      };
      if (this.cnt < 1) {
        this.$store.commit('progress', true)
        this.$store.dispatch('delivery_start', params)
        .then((res) => {
          this.$store.commit('progress', false)
          if(res == 'SUCCESS' || res == 'MODIFY') {
            alert('송장 정보가 변경되었습니다.')
            this.$emit('list_req');
          }
          this.$store.commit('dialog', {
            dialog: false
          })
        })
        this.cnt++;
      
      }
    },
    s_order_cancel() {
      let params = {
        s_no: this.s_order_cancel_info.s_no,
        o_no: this.s_order_cancel_info.o_no,
        reason: this.reason
      }

      console.log(params)

      if (this.cnt < 1) {
        this.$store.commit('progress', true)
        this.$store.dispatch('s_order_cancel', params)
        .then((res) => {
          console.log(res)
          if(res.result == 'SUCCESS') {
            this.$emit('list_req');
            alert('주문이 정상적으로 취소 됬습니다.')
          }
          this.$store.commit('dialog', {
            dialog: false
          })
          this.$store.commit('progress', false)
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
