<template>
  <div>
    <v-form dark>
      <v-container>
        <v-card>
          <v-card-title>
            공지 사항
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              color="info"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="l_notice"
            :search="search"
            color="info"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td> {{ props.item.title }}</td>
              <td class="text-xs-right">{{ props.item.content }}</td>
              <td class="text-xs-center">{{ props.item.add_time }}</td>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-card>
      </v-container>
    </v-form>
    <v-footer class="page_div">
        <v-pagination
        v-model="page"
        :length="length"
        color="info"
        @input="list_req"
        ></v-pagination>
    </v-footer>
  </div>
</template>

<script>
  export default {
    data: () => ({
       search: '',
        headers: [
          {
            text: '제목',
            align: 'center',
            sortable: false,
            value: 'title'
          },
          { text: '내용', align: 'center', width:'40%', value: 'content', sortable: false },
          { text: '작성시간', align: 'center', sortable: false},
        ],
        length: 0,
        page: 1,
        start: 0,
        l_notice: [],
    }),
    computed: {
      alba2_login() {
          return this.$store.getters.alba2_login
      },
    },
    mounted() {
        this.$store.commit('add_notice_btn', true);
        this.$store.commit('add_product_btn', false);
        this.$store.dispatch('s_l_notice', {
          s_no: this.alba2_login.no,
          page: 0
        }).then((res) => {
          console.log(res)
          this.l_notice = res
          if (res.length > 0) {
            this.length = Math.ceil(res[0].total / 10)
          }
        })
    },
    methods: {
        list_req () {
            this.start = (this.page - 1) * 10;
            this.$store.dispatch('s_l_notice', {
                s_no: this.alba2_login.no,
                page: this.start
            }).then((res) => {
                if (res) {
                  this.l_notice = res
                    this.length = Math.ceil(res[0].total / 10)
                }
                
            });
        },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.page_div {
  display: block;
  height: 40px!important;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 11;
}
</style>