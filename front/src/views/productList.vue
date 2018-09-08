<template>
  <div class="product_list_container">
    
    <v-hover class="product" v-for="(product, index) in l_product" :key="index">
      
      <v-card 
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
        width="344"
      >
      <div v-if="product.sold_yn == 'Y'" class="sold_out">
        <span>준비중</span>
      </div>
        <v-btn icon class="mr-0 float_right">
          <v-icon>clear</v-icon>
        </v-btn>
        <v-img @click="productDetail(product.no)"
          :aspect-ratio="16/9"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        
        <v-card-title class="block_box" @click="productDetail(product.no)">
          <div>
            <span class="headline">{{product.name}}</span>
            <div class="d-flex">
              <div class="ml-2 text--darken-2">
                <span class="headline">{{product.price}}원</span>
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
      ></v-pagination>
    </v-footer>
  </div>
</template>

<script>
  export default {
    data: () => ({
      reviews: 413,
      value: 4.5,
      page: 1,
      leng: 0,
      val: 0,
    }),
    computed: {
      l_product() {
        return this.$store.getters.l_product
      },
      p_length() {
        return this.$store.getters.p_length
      }
    },
    mounted() {
      this.$store.commit('add_product_btn', true)
      this.$store.dispatch('l_product', {
        page: (this.page-1)*10
      })
      .then(() => {
        this.leng = parseInt(this.p_length)
      })
    },
    methods: {
      productDetail(no) {
        this.$router.push('/product/'+no)
      },
      list_req() {
        this.$store.dispatch('l_product', {
          page: (this.page-1)*10
        })
        .then((res) => {
          console.log(res)
        })
      }
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
  height: 290px;
}
.sold_out > span {
  position: absolute;
  bottom: 10%;
  right: 10%;
  font-weight: bold;
  font-size: 30px;
  z-index: 100;
}
</style>