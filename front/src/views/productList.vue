<template>
  <div>
    <v-hover class="product">
      <v-card
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`"
        class="mx-auto"
        width="344"
      >
        <v-btn icon class="mr-0 float_right">
          <v-icon>clear</v-icon>
        </v-btn>
        <v-img @click="productDetail"
          :aspect-ratio="16/9"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        />
        
        <v-card-title @click="productDetail">
          <div>
            <span class="headline">Cafe Badilico</span>
            <div class="d-flex">
              <v-rating
                :value="value"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="ml-2 grey--text text--darken-2">
                <span>{{ value }}</span>
                <span>({{ reviews }})</span>
              </div>
            </div>
          </div>
          <v-spacer></v-spacer>
          <span>2,000원</span>
        </v-card-title>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
  export default {
    data: () => ({
      reviews: 413,
      value: 4.5
    }),
    computed: {

    },
    mounted() {
      this.$store.dispatch('l_product', '')
    },
    methods: {
      productDetail() {
        this.$router.push('/product')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product {
  position: relative;
}

.float_right {
  position: absolute;
  z-index: 2;
  right: 0;
}
</style>