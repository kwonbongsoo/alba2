<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md10 lg6>
            <v-card class="elevation-12">
              <v-toolbar dark color="info">
                <v-toolbar-title>로그인</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                    <v-text-field 
                        prepend-icon="person" 
                        name="login" 
                        color="info"
                        v-model="id"
                        label="ID" 
                        maxlength="20"
                        type="text">
                    </v-text-field>
                    <v-text-field 
                        prepend-icon="lock" 
                        name="password" 
                        color="info"
                        v-model="pwd"
                        label="Password"
                        id="password" 
                        maxlength="20"
                        type="password">
                    </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info" @click="loginClick">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  export default {
    data: () => ({
        id: '',
        pwd: '',
    }),
    computed: {
      alba2_login() {
          return this.$store.getters.alba2_login
      }
    },
    mounted() {
        this.$store.commit('add_product_btn', false);
        this.$store.commit('add_notice_btn', false);
        
        // this.$store.commit('alba2_login', {
        //     login: false,
        //     id: '',
        //     pwd: ''
        // })

        if (this.alba2_login.login) {
            this.autoLogin()
        }
        
    },
    methods: {
        loginClick() {
            let params = {
                id: this.id,
                pwd: this.pwd
            }
            this.$store.dispatch('a_login', params)
            .then((res) => {
                if (res == 'SUCCESS'){
                    alert('로그인 성공')
                    this.$router.push('/productList')
                }
                else if (res == 'NO_ACCOUNT') {
                    alert('없는 계정입니다')
                    this.pwd = ''
                }   
                else if (res == 'FAIL_PWD') {
                    alert('비밀번호가 틀렸습니다')
                    this.pwd = ''
                }
                
                    
                
            })
        },
        autoLogin() {
            this.$store.dispatch('a_login', {
                id : this.alba2_login.id,
                pwd : this.alba2_login.pwd
            })
            .then((res) => {
                if (res == '로그인 실패')
                    this.pwd = ''
                else 
                    this.$router.push('/productList')
                
            })
        }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>