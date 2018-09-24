<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      hide-overlay
      fixed
      app
      class="high_sky_plus"
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
        <v-list-tile v-if="alba2_login.login" @click="pwdChange">
          <v-list-tile-action>
            <v-icon>vpn_key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>마스터 정보</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="alba2_login.login" @click="pwdChange">
          <v-list-tile-action>
            <v-icon>add_comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-badge right dark>
              <span slot="badge">2</span>
              <span>가입 승인</span>
            </v-badge>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="alba2_login.login" @click="logout">
          <v-list-tile-action>
            <v-icon>subdirectory_arrow_right</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>로그아웃</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      class="high_sky"
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
      title: 'NATURE AND HUMAN'
    }
  },
  computed: {
    add_product_btn() {
      return this.$store.getters.add_product_btn;
    },
    progress() {
      return this.$store.getters.progress;
    },
    alba2_login() {
      return this.$store.getters.alba2_login;
    }

  },
  methods: {
    productListGo() {
      this.$router.push('/productList')
    },
    productAddGo() {
      this.$router.push('/product')
    },
    logout() {
      this.$store.commit('alba2_login', {
          login: false,
          id: '',
          pwd: ''
      })
      this.$router.push('/login')
    },
    pwdChange() {
      this.$router.push('/masterInfo')
    }
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
.high_sky {
  z-index: 11;
}
.high_sky_plus {
  z-index: 12;
}
.v-badge__badge {
  top: 0!important;
  right: 30px!important;
}

</style>

