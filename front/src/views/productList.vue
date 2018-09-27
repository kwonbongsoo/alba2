<template>
  <div class="product_list_container">
    
    <v-hover class="product" v-for="(product, index) in l_product" :key="index">
      
      <v-card 
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
        width="344"
      >
      <div v-if="product.sold_yn == 'Y'" @click="productDetail(product)" class="sold_out">
        <span>준비중</span>
      </div>
        <v-btn icon class="mr-0 float_right" @click="cancel_dialog(product.no, product.img_name)">
          <v-icon class="red_icon">clear</v-icon>
        </v-btn>
        <v-img @click="productDetail(product)"
          :aspect-ratio="1.5/1"
          :src="product.img_url"
        />
        
        <v-card-title class="block_box" @click="productDetail(product)">
          <div>
            <span class="headline">{{product.name}}</span>
            <div class="d-flex">
              <div class="ml-2 text--darken-2">
                <span class="headline">{{formatPrice(product.price)}}원</span>
              </div>
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-card-title>
      </v-card>
      
    </v-hover>
    <v-footer app class="page_div">
        <v-pagination 
        v-model="page"
        :length="leng"
        @input="list_req"
        color="info"
      ></v-pagination>
    </v-footer>
    <modal v-if="dialog.dialog" @d_product="d_product"/>
  </div>
</template>

<script>
import modal from '../components/modal'
  export default {
    components: {
      modal
    },
    data: () => ({
      page: 1,
      leng: 0,
      d_product_data: ''
    }),
    computed: {
      l_product() {
        return this.$store.getters.l_product
      },
      p_length() {
        return this.$store.getters.p_length
      },
      dialog() {
        return this.$store.getters.dialog;
      },
      alba2_login() {
        return this.$store.getters.alba2_login
      },
    },
    mounted() {
      this.$store.commit('product', '')
      this.$store.commit('add_product_btn', true)
      this.$store.dispatch('l_product', {
        page: (this.page-1)*10,
        s_no: this.alba2_login.no
      })
      .then(() => {
        this.leng = parseInt(this.p_length)
      })
      this.$store.dispatch('store_acpt_cnt', {
        s_no: this.alba2_login.no
      })
    },
    methods: {
      productDetail(product) {
        this.$store.commit('product', product)
        this.$router.push('/product')
      },
      list_req() {
        this.$store.dispatch('l_product', {
          page: (this.page-1)*10,
          s_no: this.alba2_login.no
        })
        .then((res) => {
          console.log(res)
        })
      },
      cancel_dialog(no, img_name) {
        this.d_product_data = {
          no: no,
          original_name: img_name
        }
        this.$store.commit('dialog', {
          dialog: true,
          title: '상품 삭제',
          content: '정말 이 상품을 삭제 하시겠습니까?'
        })
      },
      d_product() {
        this.$store.dispatch('d_product', this.d_product_data)
        .then((res) => {
          console.log(res)
          this.d_product_data =  ''
          this.$store.commit('dialog', {
            dialog: false
          })
          this.$store.dispatch('l_product', {
            page: (this.page-1)*10,
            s_no: this.alba2_login.no
          })
          .then(() => {
            this.leng = parseInt(this.p_length)
          })
        })
      },
      formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product_list_container {
  text-align: center;
}
.product {
  position: relative;
  display: inline-block;
  margin: 10px 10px!important;
}
.page_div {
  display: block;
  height: 40px!important;
  text-align: center!important;
  z-index: 11;
  
}
.block_box {
  display: block;
}

.float_right {
  position: absolute;
  z-index: 2;
  right: 0;
}
.sold_out {
  width:100%;
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, .7);
  height: 325px;
}
.sold_out > span {
  position: absolute;
  bottom: 10%;
  right: 10%;
  font-weight: bold;
  font-size: 30px;
  z-index: 10;
}
.red_icon {
  color: red!important;
  font-weight: bold;
}
</style>