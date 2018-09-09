<template>
  <div class="">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600">
        <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
        <v-card>
          <v-card-title class="modal_title">옵션 추가 / 수정 / 삭제</v-card-title>
          <div class="select_option_ex">
            <v-radio-group v-model="row" row>
              <v-radio label="선택 옵션" value="1"></v-radio>
              <v-radio label="예 시" value="2"></v-radio>
              <span class="ex_line_height" xs1> &nbsp;&nbsp;추가옵션 예시&nbsp;&nbsp;</span>
               <v-layout row wrap>
                  <v-flex xs1>
                    <v-checkbox input-value="true" value></v-checkbox>
                  </v-flex>
                  <v-flex xs1>
                    <v-checkbox value></v-checkbox>
                  </v-flex>
                </v-layout>
            </v-radio-group>
          </div>
          <v-card-text class="detail_title">
            옵션 목록
          </v-card-text>

          <div class="select_option_list">
            <v-list
              v-for="item in l_option"
              :key="item.title"
              >
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title class="option_title">{{ item.title }}&nbsp;&nbsp; {{item.multi_yn == 'Y' ? '(선택옵션)' : '(추가옵션)'}}
                    <v-icon class="right" 
                    >clear</v-icon>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile class="padding_option"
                v-for="subItem in item.option"
                :key="subItem.name"
              >
                <v-list-tile-content class="left">
                  <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-content class="right">
                  <v-list-tile-title>{{ subItem.price }}원</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="option_dialog_true">Disagree</v-btn>
            <v-btn color="green darken-1" flat @click="option_dialog_true">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'optionModal',
  props: ['l_option'],
  data: () => ({
    row: '1',
    dialog: true,
  }),
  mounted() {
    console.log(this.l_option)
  },
  methods: {
    option_dialog_true() {
      this.$store.commit('option_dialog', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detail_title {
  font-size: 20px;
}
.select_option_list {
  padding: 0 16px;
}
.v-input__control {
  height: 50px;
}
.add_option_ex, .select_option_ex {
  padding: 0 16px;
  height: 65px;
  overflow: hidden;
}
.ex_line_height {
  line-height: 68px;
  margin-bottom: 8px;
}
.modal_title {
  padding: 16px 16px 0 16px;
  font-size: 24px;
}
.padding_option {
  padding: 0 20px;
}
.right * {
  text-align: right!important;
}
.option_title {
  font-size: 18px;
  font-weight: bold;
}
</style>
