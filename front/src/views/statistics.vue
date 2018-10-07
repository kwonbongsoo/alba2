<template>
    <div>
        <div class="statistics_container">
            <v-layout row wrap>
                <div class="date_div">
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
            <v-data-table v-if="statistics_list"
                :headers="headers"
                :items="statistics_list"
                hide-actions
                class="elevation-1"
            >  
                <template slot="items" slot-scope="props">
                <td class="text-xs-center bold">{{ props.item.order_time }}</td>
                <td class="text-xs-center bold">{{ props.item.cnt }}</td>
                <td class="text-xs-right bold">{{ formatPrice(props.item.all_total_price) }}원</td>
                <td class="text-xs-center bold">{{ props.item.cancel_cnt }}</td>
                <td class="text-xs-right bold">{{ formatPrice(props.item.cancel_price) }}원</td>
                <td class="text-xs-right bold">{{ formatPrice(props.item.total_price) }}원</td>
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
    </div>

</template>

<script>
  export default {
    data: () => ({
        menu1: false,
        menu2: false,
        today: '',
        s_dt: null,
        e_dt: null,
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
            { text: '주문 건수', align: 'center', sortable: false, class: 'bold' },
            { text: '주문 금액', align: 'center', sortable: false, class: 'bold' },
            { text: '취소 건수', align: 'center', sortable: false, class: 'bold' },
            //   { text: '상품가격', align: 'center', sortable: false, class: 'bold' },
            //   { text: '상품상세정보', align: 'center', sortable: false, class: 'bold' },
            { text: '취소 금액', align: 'center', sortable: false, class: 'bold' },
            { text: '매출 금액', align: 'center', sortable: false, class: 'bold' },
        ],
    }),
    computed: {
      alba2_login() {
          return this.$store.getters.alba2_login;
      },
      statistics_list () {
          return this.$store.getters.statistics_list;
      },
      
    },
    mounted() {
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
        this.$store.commit('statistics_list', '');
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
                let params = {
                    s_no: this.alba2_login.no,
                    s_dt: this.s_dt,
                    e_dt: this.e_dt,
                    page: this.start
                }
                console.log(params)
                this.$store.dispatch('s_o_statistics', params).then((res) => {
                    // console.log(res)
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
            this.$store.dispatch('s_o_statistics', {
                s_no: this.alba2_login.no,
                s_dt: this.s_dt,
                e_dt: this.e_dt,
                page: this.start
            }).then((res) => {
                this.o_length = res.total / 30;
                this.o_length = parseInt(this.o_length, 10);
                // console.log(res);
                if (res.total % 30 > 0) {
                this.o_length += 1;
                }
            });
        },
        formatPrice (value) {
            value += '';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  top: 5px;
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
.statistics_container {
    padding: 24px;
    padding-top: 4px;
    padding-bottom:40px;
}
</style>