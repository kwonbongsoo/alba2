<template>
    <div class="pwd_container">
        <v-form>
            <v-text-field
            v-model="id"
            :maxlength="20"
            color="info"
            label="ID"
            required
            ></v-text-field>
            <v-text-field
            v-model="pwd"
            :maxlength="20"
            color="info"
            label="새 비밀번호"
            required
            type="password"
            ></v-text-field>
            <v-text-field
            v-model="pwd_confirm"
            :maxlength="20"
            color="info"
            label="새 비밀번호 확인"
            type="password"
            required
            ></v-text-field>
            <v-btn @click="pwdChange">비밀번호 변경</v-btn>
        </v-form>


        <v-form>
            <v-text-field
            v-model="bank_name"
            :maxlength="20"
            color="info"
            label="은행명"
            required
            ></v-text-field>
            <v-text-field
            v-model="bank_no"
            :maxlength="20"
            color="info"
            label="계좌번호"
            required
            type="number"
            ></v-text-field>
            <!-- <v-text-field
            v-model="pwd_confirm"
            :maxlength="20"
            color="info"
            label="새 비밀번호 확인"
            type="password"
            required
            ></v-text-field> -->
            <v-btn @click="infoChange">정보 변경</v-btn>
            <!-- <v-btn @click="test">테스트</v-btn> -->
        </v-form>
    </div>
</template>

<script>

  export default {
    data: () => ({
      id: '',
      pwd: '',
      pwd_confirm: '',
      bank_name: '',
      bank_no: ''
    }),
    computed: {
        alba2_login() {
            return this.$store.getters.alba2_login
        }
    },
    mounted() {
        this.$store.commit('add_product_btn', false)
        this.id = this.alba2_login.id

        this.$store.dispatch('store_info', {
            no: this.alba2_login.no,
            id: this.id
        })
        .then((res) => {
            console.log(res)
            if (res.length > 0) {
                this.bank_name = res[0].bank_name
                this.bank_no = res[0].bank_no
            }
        })
    },
    methods: {
        pwdChange() {
            if (this.pwd == '' || this.pwd_confirm == '') {
                alert('비밀번호를 입력해주세요')
            }
            else if (this.pwd.length < 8 || this.pwd_confirm.length < 8) {
                alert('비밀번호는 8자리 이상 입력해주세요')
            }
            else if (this.pwd != this.pwd_confirm) {
                alert('비밀 번호가 서로 일치하지 않습니다.')
            }
            else {
                let params = {
                    id: this.id,
                    pwd: this.pwd,
                    no: this.alba2_login.no
                }

                this.$store.dispatch('a_pwd_update', params)
                .then((res) => {
                    if(res == 'OK') {
                        alert('업데이트 되었습니다.')
                        this.pwd = ''
                        this.pwd_confirm = ''
                    }
                    else {
                        alert('업데이트를 재시도 해주세요')
                        this.pwd = ''
                        this.pwd_confirm = ''
                    }
                })
            }
        },
        infoChange() {
            // if (this.id == '') {
            //     alert('아이디를 입력하세요')
            // }
            if (this.bank_name == '') {
                alert('은행명을 입력하세요')
            }
            else if (this.bank_no == '') {
                alert('계좌번호를 입력해주세요')
            }
            else {
                let params = {
                    bank_name: this.bank_name,
                    bank_no: this.bank_no,
                    id: this.id,
                    no: this.alba2_login.no
                }
                this.$store.dispatch('store_update', params)
                .then((res) => {
                    if(res == 'OK') {
                        alert('업데이트 되었습니다.')
                    }
                    else {
                        alert('업데이트를 재시도 해주세요')
                    }
                })
            }
            
        }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pwd_container {
    padding: 2% 5%;
}

</style>