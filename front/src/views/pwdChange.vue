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
            <v-btn @click="pwdChange">변경하기</v-btn>
        </v-form>
    </div>
</template>

<script>

  export default {
    data: () => ({
      id: '',
      pwd: '',
      pwd_confirm: ''
    }),
    computed: {
        alba2_login() {
            return this.$store.getters.alba2_login
        }
    },
    mounted() {
        this.id = this.alba2_login.id
    },
    methods: {
        pwdChange() {
            if (this.pwd != this.pwd_confirm) {
                alert('비밀 번호가 서로 일치하지 않습니다.')
            }
            else {
                let params = {
                    id: this.id,
                    pwd: this.pwd
                }
                console.log(params)
                alert('서버 db 구현해야됨')
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