<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="productListGo">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>상품</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-show="add_product_btn" color="info" @click="productAddGo">새 상품 등록</v-btn>
    </v-toolbar>
    <v-content>
      <router-view class="router_view"/>
    </v-content>
    <v-progress-circular
      v-if="progress"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    add_product_btn() {
      return this.$store.getters.add_product_btn;
    },
    progress() {
      return this.$store.getters.progress;
    }
  },
  methods: {
    productListGo() {
      this.$router.push('/productList')
    },
    productAddGo() {
      this.$router.push('/product/'+0)
    },
  }
}
</script>

<style lang="scss" scoped>
.router_view {
  margin: 20px 0;
}
.v-toolbar {
  z-index: 3;
}
.v-navigation-drawer {
  z-index: 4;
}
.v-progress-circular {
  position: fixed  !important;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: visible;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>

