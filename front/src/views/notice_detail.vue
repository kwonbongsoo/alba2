<template>
    <div>
        <v-container fluid grid-list-md>
            <v-flex xs12 sm12 md12>
                <v-text-field
                    label="제목"
                    placeholder="제목입력하세요"
                    box
                    v-model="title"
                    color="info"
                    type="text"
                    counter="30"
                ></v-text-field>
            </v-flex>

            <v-textarea
            name="input-7-1"
            box
            v-model="content"
            dark
            label="내용"
            color="info"
            auto-grow
            hint="내용을 입력하세요"
            ></v-textarea>
            <div>
                <v-btn color="info" class="float_right" @click="add_modify">등록/수정</v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
  export default {
    data: () => ({
        title: '',
        content: '',
        notice_num: 0,
    }),
    computed: {
      alba2_login() {
          return this.$store.getters.alba2_login
      },
      noice_no() {
          return this.$route.params.notice_no;
      }
    },
    mounted() {
        this.$store.commit('add_product_btn', false);
        this.$store.commit('add_notice_btn', false);
        this.notice_num = parseInt(this.noice_no, 10)
        if (this.notice_num > 0) {
            this.$store.dispatch('s_n_one', {
                n_no: this.notice_num
            }).then((res) => {
                console.log(res)
                this.title = res.title;
                this.content = res.content;
            })
        }
    },
    methods: {
        add_modify() {
            console.log(this.title.length)
            if (this.title == '') {
                alert('타이틀을 입력해주세요');
            }
            else if (this.content == '') {
                alert('내용을 입력해주세요');
            }
            else if (this.title.length > 30) {
                alert('제목이 너무 깁니다. 30글자 이하로 적어주세요')
            }
            else if (this.content.length > 300) {
                alert('내용이 너무 깁니다. 300글자 이하로 적어주세요')
            }
            else {
                let params = {
                    s_no: this.alba2_login.no,
                    title: this.title,
                    content: this.content,
                    n_no: this.notice_num
                }

                if (this.notice_num > 0) {
                    this.$store.dispatch('s_notice_update', params).then((res) => {
                        console.log(res);
                        if (res.result == 'SUCCESS') {
                            alert('공지사항을 수정했습니다.');
                            //푸시 날려야함.

                            this.$router.push('/noticeList')
                        }
                        else {
                            alert('공지사항 등록을 실패했습니다. 잠시후 다시 시도해주세요')
                        }
                    })

                }
                else {
                    this.$store.dispatch('s_notice_add', params).then((res) => {
                        console.log(res);
                        if (res.result == 'SUCCESS') {
                            alert('공지사항 등록을 성공했습니다.');
                            //푸시 날려야함.

                            this.$router.push('/noticeList')
                        }
                        else {
                            alert('공지사항 등록을 실패했습니다. 잠시후 다시 시도해주세요')
                        }
                    })
                }
            }
        },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.float_right {
    float: right;
}

</style>