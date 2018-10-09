<template>
  <v-form dark>
    <v-container fluid grid-list-md>
      <div>
          <h2>주문 취소 요청</h2>
      </div>
      <br>
        <v-data-iterator
        :items="o_l_req"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        color="info"
        row
        wrap
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs12
          sm6
          md4
          lg3
          color="info"
        >
          <v-card>
            <v-card-title>
              <div class="width">
                <h4>{{ props.item.order_time }}</h4>
                <div class="float_right">
                  <v-btn class="btn" color="error" @click="o_cancel_y(props.item.no)">취소승낙</v-btn>
                  <v-btn class="btn" color="success" @click="o_cancel_n(props.item.no)">취소거부</v-btn>
                </div>
              </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>이름:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.alias }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>가격:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.total_price }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>상품:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.product_names }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>옵션:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.options }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>세부가격:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.product_prices }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>송장정보:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.delivery_info }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>주소정보:</v-list-tile-content>
                <v-list-tile-content class="align-end">
                  {{ props.item.addr }}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      o_l_req: [],
      rowsPerPageItems: [10, 20, 30],
      pagination: {
        rowsPerPage: 10
      },
    }),
    computed: {
      alba2_login() {
        return this.$store.getters.alba2_login
      },
    },
    mounted() {
        this.refreshList()
        this.$store.commit('add_product_btn', false);
        this.$store.commit('add_notice_btn', false);
        
    },
    methods: {
        refreshList() {
          this.$store.dispatch('store_acpt_cnt', {
              s_no: this.alba2_login.no
          })
          this.$store.dispatch('s_l_cancel_req', {
              s_no: this.alba2_login.no
          }).then((res) => {
              this.o_l_req = res
          })
        },
        o_cancel_y (no) {
          console.log(no)
          let confirm = window.confirm('주문 취소를 승낙 하시겠습니까?')

          if (confirm) {
            let params = {
              s_no: this.alba2_login.no,
              o_no: no
            }

            this.$store.dispatch('o_cancel_y', params).then((res) => {
              console.log(res)
              if(res.result == 'SUCCESS') {
                alert('취소를 완료했습니다.')
                this.refreshList()
              }
              else {
                alert('나중에 다시 시도해주세요')
              }
              
            })
          }
        },
        o_cancel_n (no) {
          console.log(no)
          let confirm = window.confirm('주문 취소를 거부 하시겠습니까?')

          if (confirm) {
            let params = {
              s_no: this.alba2_login.no,
              o_no: no
            }

            this.$store.dispatch('o_cancel_n', params).then((res) => {
              console.log(res)
              if(res.result == 'SUCCESS') {
                alert('취소 거부를 완료했습니다.')
                this.refreshList()
              }
              else {
                alert('나중에 다시 시도해주세요')
              }
            })
          }
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
.width {
  width: 100%;
}
.float_right {
  float: right;
}
</style>