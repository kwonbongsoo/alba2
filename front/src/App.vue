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
        <v-list-tile @click="noticeListGo">
          <v-list-tile-action>
            <v-icon>today</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>공지사항</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
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
            <v-list-tile-title>상점 정보</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="alba2_login.login && acpt_cnt > 0" @click="userAcptGo">
          <v-list-tile-action>
            <v-icon>add_comment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-badge right dark>
              <span slot="badge">{{acpt_cnt}}</span>
              <span>가입 승인</span>
            </v-badge>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="orderGo">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>주문 조회</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile @click="statisticsGo">
          <v-list-tile-action>
            <v-icon>assessment</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>주문 통계</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
        <v-list-tile @click="cancelListGo">
          <v-list-tile-action>
            <v-icon>cancel_presentation</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>취소요청</v-list-tile-title>
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
      <v-toolbar-title v-text="alba2_login.store_name"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-show="add_product_btn" color="info" @click="productAddGo">새 상품 등록</v-btn>
      <v-btn v-show="add_notice_btn" color="info" @click="noticeDetailGo">새 공지 등록</v-btn>
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
    }
  },
  computed: {
    add_product_btn() {
      return this.$store.getters.add_product_btn;
    },
    add_notice_btn() {
      return this.$store.getters.add_notice_btn;
    },
    progress() {
      return this.$store.getters.progress;
    },
    alba2_login() {
      return this.$store.getters.alba2_login;
    },
    acpt_cnt() {
      return this.$store.getters.acpt_cnt;
    }
  },
  methods: {
    productListGo() {
      this.$router.push('/productList');
    },
    productAddGo() {
      this.$router.push('/product');
    },
    userAcptGo() {
      this.$router.push('/userAcpt');
    },
    logout() {
      this.$store.commit('alba2_login', {
          login: false,
          id: '',
          pwd: ''
      })
      this.$router.push('/login');
    },
    pwdChange() {
      this.$router.push('/masterInfo');
    },
    orderGo() {
      this.$router.push('/order');
    },
    statisticsGo() {
      this.$router.push('/statistics');
    },
    cancelListGo() {
      this.$router.push('/cancelList');
    },
    noticeListGo() {
      this.$router.push('/noticeList');
    },
    noticeDetailGo() {
      this.$router.push('/noticeDetail/'+0);
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

