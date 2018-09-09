<template>
  <div class="proudct_container">
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        label="상품 이름"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="desc"
        :error-messages="descErrors"
        :counter="20"
        label="상품 설명"
        required
        @input="$v.desc.$touch()"
        @blur="$v.desc.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="price"
        :error-messages="priceErrors"
        :counter="10"
        label="가격"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        item-text="title"
        item-value="no"
        label="옵션을 선택하세요 옵션이 없다면 추가하세요"
        @change="pushOption"
      ></v-select>
      
      <v-list
          v-for="item in optionArr"
          :key="item.title"
          >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}
                <v-icon class="right" @click="popOption(item.no)">clear</v-icon>
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

      <div class="top_margin">
        <v-btn @click="optionClick">옵션 등록 / 수정</v-btn>
      </div>

      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<div class="img_div">
            <img :src="imageUrl" height="150" v-if="imageUrl"/>
            <v-icon @click="clearImg" v-if="imageUrl" class="clear_icon">clear</v-icon>
          </div>
					<v-text-field label="이미지 업로드" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
					<input
						type="file"
						style="display: none"
						ref="image"
						accept="image/*"
						@change="onFilePicked"
					>
				</v-flex>
        <v-switch :label="`품절 : ${sold_yn.toString()}`" v-model="sold_yn"></v-switch>

      <v-btn @click="submit">상품등록/수정</v-btn>
      <v-btn v-show="this.no == 0" @click="clear">clear</v-btn>
      <option-modal v-if="option_dialog" :l_option="l_option"/>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import optionModal from '../components/optionModal'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      desc: { required,  maxLength: maxLength(20) },
      price: { required, maxLength: maxLength(20) }
    },
    components: {
      optionModal
    },

    data: () => ({
      no: '',
      name: '',
      desc: '',
      price: '',
      select: null,
      items: [],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      inputFileValue: '',
      optionArr: [],
      optionSubmit: '',
      sold_yn: '',
      original_name: '',
    }),
    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('상품 이름이 너무 깁니다')
        !this.$v.name.required && errors.push('상품 이름을 입력하세요')
        return errors
      },
      descErrors () {
        const errors = []
        if (!this.$v.desc.$dirty) return errors
        !this.$v.desc.maxLength && errors.push('상품 설명이 너무 깁니다')
        !this.$v.desc.required && errors.push('상품 설명을 입력하세요')
        return errors
      },
      priceErrors () {
        const errors = []
        if (!this.$v.price.$dirty) return errors
        !this.$v.price.maxLength && errors.push('상품 가격이 너무 깁니다')
        !this.$v.price.required && errors.push('상품 가격을 입력하세요')
        return errors
      },
      option_dialog () {
        return this.$store.getters.option_dialog;
      },
      l_option() {
        return this.$store.getters.l_option;
      },
    },
    mounted() {
      this.$store.commit('add_product_btn', false)
      if(this.$route.params.no != 0) {
        let params = {
          no: this.$route.params.no
        }
        this.$store.dispatch('product_detail', params)
        .then((res) => {
          console.log(res)
          this.no = res.no
          this.name = res.name
          this.desc = res.desc
          this.price = res.price
          this.optionArr = res.options
          this.imageName = res.img_name
          this.imageUrl = res.img_url
          if (res.sold_yn == 'Y')
            this.sold_yn = true
          else
            this.sold_yn = false
          this.original_name = res.img_name
        })
      }
      this.$store.dispatch('l_option', '')
      .then((res) => {
        this.items = this.l_option
      })
    },
    methods: {
      clear () {
        this.$v.$reset()
        this.name = ''
        this.desc = ''
        this.select = null
        this.$refs.image.value = null
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
        this.optionArr = []
        this.optionSubmit = ''
        this.sold_yn = ''
        this.original_name = ''

        this.$store.dispatch('l_option', '')
        .then((res) => {
          this.items = this.l_option
        })
      },
      pickFile () {
        this.$refs.image.click ()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },
      clearImg() {
        this.$refs.image.value = null
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      },
      submit() {
        if (this.name == '') {
          alert('상품 이름을 입력하세요')
        }
        else if (this.desc == '') {
          alert('상품 설명을 입력하세요')
        }
        else if (this.price == '') {
          alert('상품 가격을 입력하세요')
        }
        else if (this.imageFile.size > 1000000) {
          alert('이미지 사이즈가 큽니다. 1M 이하로 업로드하세요')
        }
        else if (this.$route.params.no != '0' && this.imageName == '') {
          alert('이미지를 선택해주세요.')
        }
        else {
          this.optionSubmit = ''
          for (let i = 0; i < this.optionArr.length; i++) {
            this.optionSubmit += this.optionArr[i].no +','
          }
          let params = {
            imageName: this.imageName,
            imageUrl: this.imageUrl,
            imageFile: this.imageFile,
            name: this.name,
            desc: this.desc,
            price: this.price,
            option: this.optionSubmit,
            no: this.$route.params.no,
            sold_yn: this.sold_yn == true ? 'Y' : 'N',
            original_name: this.original_name
          }
          console.log(params)

          var formData = new FormData();

          formData.append('file', this.imageFile);
          formData.append('imageName', this.imageName);
          formData.append('imageUrl', this.imageUrl);
          formData.append('name', this.name);
          formData.append('desc', this.desc);
          formData.append('price', this.price);
          formData.append('option', this.optionSubmit)
          formData.append('no', this.$route.params.no)
          formData.append('sold_yn', this.sold_yn == true ? 'Y' : 'N')
          formData.append('original_name', this.original_name)


          this.$store.commit('progress', true)
          this.$store.dispatch('add_update_product', formData)
          .then((res) => {
            console.log(res)
            this.$store.commit('progress', false)
            this.$router.push('/productList')
          })

        }
        
      },
      pushOption(no) {
        if (this.select != '') {
          let index = this.items.map(function (arr) { return arr.no; }).indexOf(no)
          if (this.optionArr.map(function (arr) { return arr.no; }).indexOf(this.items[index].no) == -1 )
            this.optionArr.push(this.items[index])
        }
        this.$nextTick(() => {
          this.select = '';
        })
      },
      popOption(no) {
        let index = this.optionArr.map(function (arr) { return arr.no; }).indexOf(no)
        this.optionArr.splice(index, 1)
        this.select = '';
      },
      optionClick() {
        this.$store.commit('option_dialog', true)
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.img_div {
  position: relative;
  display: inline-block;
}
.proudct_container {
  padding: 20px;
}
.clear_icon {
  position:absolute;
  right: 0;
  font-size: 30px;
  color: red;
  font-weight: bold;
  z-index: 2;
}
.left {
  float: left;
}
.right {
  float: right;
}
.right * {
  text-align: right!important;
}
.padding_option {
  padding: 0 20px;
}
.top_margin {
  margin-top: 20px;
}

</style>