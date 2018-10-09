<template>
    <div class="">
        <div class="order_container">
            <v-layout row wrap>
                <div class="date_div">
                    <v-flex xs2 sm2 md2 class="inline_block">
                        <v-select
                            :items="items"
                            v-model="select"
                            return-object
                            label="주문 상태 선택"
                            solo
                            class="inline_block width"
                            item-text="state"
                            item-value="abbr"
                            color="info"
                        ></v-select>
                    </v-flex>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    
                <v-flex xs2 sm2 md2 class="inline_block margin_bottom">
                    <v-text-field
                        solo
                        v-model="search"
                        color="info"
                        label="주문자 검색"
                        append-icon="search"
                        max-length="20"
                    ></v-text-field>
                </v-flex>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <v-flex xs6 sm6 md6 class="inline_block">
                    <v-menu
                        ref="menu1"
                        :close-on-content-click="false"
                        v-model="menu1"
                        :nudge-right="40"
                        :return-value.sync="s_dt"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <v-text-field
                        slot="activator"
                        v-model="s_dt"
                        label="조회할 기간 선택(시작)"
                        prepend-icon="event"
                        readonly
                        color="info"
                        ></v-text-field>
                        <v-date-picker v-model="s_dt" color="info" locale="ko-kr"  :max="e_dt" @input="$refs.menu1.save(s_dt)" @change="changeDate(1)" light no-title></v-date-picker>

                    </v-menu>
                </v-flex>
                <v-flex xs6 sm6 md6 class="inline_block">
                    <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        :return-value.sync="e_dt"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                    >
                        <v-text-field
                        slot="activator"
                        v-model="e_dt"
                        label="조회할 기간 선택(종료)"
                        prepend-icon="event"
                        readonly
                        color="info"
                        ></v-text-field>
                        <v-date-picker v-model="e_dt" color="info" locale="ko-kr" :min="s_dt" :max="today" @input="$refs.menu2.save(e_dt)" @change="changeDate(2)" light no-title></v-date-picker>

                    </v-menu>
                </v-flex>
                
                <v-btn class="btn abs" color="info" @click="selectData">조회</v-btn>
                </div>
            </v-layout>
            <v-data-table v-if="o_list"
                :headers="headers"
                :items="o_list"
                hide-actions
                class="elevation-1"
            >  
            
                    
                
                <template slot="items" slot-scope="props">
                <td class="text-xs-center bold">{{ props.item.order_time }}</td>
                <td class="text-xs-center bold">{{ props.item.alias }}</td>
                <td class="text-xs-right bold">{{ props.item.total_price }}</td>
                <td class="text-xs-center bold">
                    <v-tooltip bottom>
                        <span slot="activator">{{ props.item.product_names }}</span>
                        <div class="product_info">{{ props.item.product_names }}</div>
                        <div class="product_info">{{ props.item.product_prices }}</div>
                        <div class="product_info">{{ props.item.count }}</div>
                        <div class="product_info">{{ props.item.options }}</div>
                    </v-tooltip>
                </td>
                <td class="text-xs-center bold">{{ props.item.delivery_name }}</td>
                <td class="text-xs-center bold">{{ props.item.delivery_no }}</td>
                <td v-if="props.item.status > 1 && props.item.cancel_yn != 'Y'" class="text-xs-center bold padding_zero"><v-btn class="btn" color="info" @click="delivery_modify(props.item.no)">수정</v-btn></td>
                <td v-else class="text-xs-center">*</td>
                <td v-if="props.item.cancel_yn == 'Y'" class="text-xs-center bold">취소</td>
                <td v-else-if="props.item.cancel_yn == 'N'" class="text-xs-center bold"><v-btn class="btn" color="info" @click="order_cancel(props.item.no)">상점주문취소</v-btn></td>
                <td v-else class="text-xs-center bold">
                    <v-btn class="btn" color="error" @click="o_cancel_y(props.item.no)">취소승낙</v-btn>
                    <v-btn class="btn" color="success" @click="o_cancel_n(props.item.no)">취소거부</v-btn>
                </td>
                <td v-if="props.item.cancel_yn == 'Y'" class="text-xs-center bold">취소완료</td>
                <td v-else-if="props.item.status == 0" class="text-xs-center bold padding_zero"><v-btn class="btn" color="info" @click="pay_confirm(props.item.no)">입금확인</v-btn></td>
                <td v-else-if="props.item.status == 1" class="text-xs-center bold"><v-btn class="btn" color="info" @click="delivery_start(props.item.no)">배송시작</v-btn></td>
                <td v-else-if="props.item.status == 2" class="text-xs-center bold">배송중</td>
                <td v-else class="text-xs-center bold">거래완료</td>
                </template>
            </v-data-table>
        </div>
         <v-footer class="page_div">
            <v-pagination
            v-model="page"
            :length="o_length"
            color="info"
            @input="list_req"
            ></v-pagination>
        </v-footer>
        <modal v-if="dialog.dialog" @list_req="list_req"/>
    </div>
</template>

<script>
import modal from '../components/modal'
  export default {
    components: {
      modal
    },
    data: () => ({
        menu1: false,
        menu2: false,
        today: '',
        s_dt: null,
        e_dt: null,
        select: { state: 'All', no: 4 },
        items: [
          { state: '입금확인', no: 0 },
          { state: '배송준비', no: 1 },
          { state: '배송중', no: 2 },
          { state: '거래완료', no: 3 },
          { state: 'All', no: 4 },
        ],
        page: 1,
        start: 0,
        o_length: 1,
        headers: [
            {
                text: '주문일자',
                align: 'center',
                sortable: false,
                class: 'bold'
            },
            { text: '주문자', align: 'center', sortable: false, class: 'bold' },
            { text: '총가격', align: 'center', sortable: false, class: 'bold' },
            { text: '상품(상세정보를 보시려면 커서를 올리세요)', align: 'center', sortable: false, class: 'bold' },
            //   { text: '상품가격', align: 'center', sortable: false, class: 'bold' },
            //   { text: '상품상세정보', align: 'center', sortable: false, class: 'bold' },
            { text: '택배회사', align: 'center', sortable: false, class: 'bold' },
            { text: '송장번호', align: 'center', sortable: false, class: 'bold' },
            { text: '송장수정', align: 'center', sortable: false, class: 'bold' },
            { text: '취소', align: 'center', sortable: false, class: 'bold' },
            { text: '주문상태', align: 'center', sortable: false, class: 'bold' },
        ],
        order_pay_confirm_data: {
            order_no: '',
        },
        search: '',
        search_data: '',
        reason: '',
        btn_cnt: 0,
    }),
    computed: {
      alba2_login() {
          return this.$store.getters.alba2_login;
      },
      o_list() {
          return this.$store.getters.o_list;
      },
      dialog() {
        return this.$store.getters.dialog;
      },
    },
    mounted() {

        this.$store.commit('add_product_btn', false);
        this.$store.commit('add_notice_btn', false);
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1
        let day = date.getDate();
        if(month < 10){
            month = "0"+month;
        }
        if(day < 10){
            day = "0"+day;
        }
        this.today = year+ '-' +month+ '-' +day;
        this.$store.commit('o_list', '');
        this.$store.commit('delivery_info', '');
        this.$store.commit('s_order_cancel_info', '');
    },
    methods: {
        changeDate (a) {
            if (this.s_dt && this.e_dt) {
                let stDate = new Date(this.s_dt) ;
                let endDate = new Date(this.e_dt) ;
            
                let btMs = endDate.getTime() - stDate.getTime() ;
                let btDay = btMs / (1000*60*60*24) ;

                if (btDay > 93) {
                    alert('4개월 이상 데이터를 조회 할수 없습니다. 날짜를 수정 해주세요');
                    this.$nextTick(() => {
                        if (a == 1)
                            this.s_dt = null;
                        else
                            this.e_dt = null;

                        console.log(this.s_dt)
                    })
                }
            }


        },
        selectData () {
            if (!this.s_dt || !this.e_dt)
                alert('날짜를 선택해주세요');
            else {
                this.page = 1;
                this.start = (this.page - 1) * 30;
                if (this.search != '')
                    this.search_data = '%' + this.search + '%'
                else {
                    this.search_data = '%'
                }
                let params = {
                    s_no: this.alba2_login.no,
                    s_dt: this.s_dt,
                    e_dt: this.e_dt,
                    page: this.start,
                    status: this.select.no,
                    search: this.search_data
                }
                console.log(params)
                this.$store.dispatch('s_l_order', params).then((res) => {
                    console.log(res)
                    this.o_length = res.total / 30;
                    this.o_length = parseInt(this.o_length, 10);
                    if (res.total % 30 > 0) {
                    this.o_length += 1;
                    }
                });
            }
        },
        list_req () {
            this.start = (this.page - 1) * 30;
            if (this.search != '')
                this.search_data = '%' + this.search + '%'
            else {
                this.search_data = '%'
            }
            this.$store.dispatch('s_l_order', {
                s_no: this.alba2_login.no,
                s_dt: this.s_dt,
                e_dt: this.e_dt,
                page: this.start,
                status: this.select.no,
                search: this.search_data
            }).then((res) => {
                this.o_length = res.total / 30;
                this.o_length = parseInt(this.o_length, 10);
                if (res.total % 30 > 0) {
                this.o_length += 1;
                }
            });
        },
        pay_confirm (no) {
            let confirm = window.confirm('입금 확인을 확실히 하셨습니까?')

            if (confirm) {
                let params = {
                    order_no: no
                }
                this.btn_cnt = 1
                this.$store.commit('progress', true)
                this.$store.dispatch('pay_confirm', params).then((res) => {
                    this.btn_cnt = 0
                    this.$store.commit('progress', false)
                    if (res == 'SUCCESS') {
                        alert('입금확인 처리 하였습니다.')
                    }
                    this.list_req()
                })
            }


        },
        delivery_start (no) {
            if(this.btn_cnt == 0) {
                this.$store.commit('delivery_info' ,{
                    order_no: no,
                })
                this.$store.commit('dialog', {
                    dialog: true,
                    title: '배송 시작',
                    content: '배송 정보를 입력해주세요'
                })
            }
        },
        delivery_modify (no) {
            if(this.btn_cnt == 0) {
                this.$store.commit('delivery_info' ,{
                    order_no: no,
                })
                this.$store.commit('dialog', {
                    dialog: true,
                    title: '송장 수정',
                    content: '송장정보를 수정하세요'
                })
            }
        },
        order_cancel (no) {
            console.log(no)
            if(this.btn_cnt == 0) {
                this.$store.commit('s_order_cancel_info' ,{
                    s_no: this.alba2_login.no,
                    o_no: no
                })
                this.$store.commit('dialog', {
                    dialog: true,
                    title: '상점 주문 취소',
                    content: '주문 취소 사유를 적어주세요. (사용자에게 푸시로 알려줍니다)'
                })
            }
            
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
                this.list_req()
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
              if(res.result == 'SUCCESS') {
                alert('취소 거부를 완료했습니다.')
                this.list_req()
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
.inline_block {
    display: inline-block;
}

.abs {
  position: absolute;
  top: 10px;
}
.date_div {
  position: relative;
}
.page_div {
  display: block;
  height: 40px!important;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 11;
}
.order_container {
    padding: 24px;
    padding-top: 4px;
    padding-bottom:40px;
}
.table {
    width: 100%;
    display: block;
}
.padding_zero {
    padding: 0!important;
}
.product_info {
    font-size: 17px;
    text-align: center;
}

</style>