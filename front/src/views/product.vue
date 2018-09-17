<template>
  <div class="proudct_container">
    <form>
      <v-text-field
        v-model="name"
        :error-messages="nameErrors"
        :counter="10"
        color="info"
        label="상품 이름"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="desc"
        :error-messages="descErrors"
        :counter="20"
        color="info"
        label="상품 설명"
        required
        @input="$v.desc.$touch()"
        @blur="$v.desc.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="price"
        :error-messages="priceErrors"
        :counter="10"
        color="info"
        label="가격"
        type="number"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
      ></v-text-field>

      <div>
        옵션 등록 및 수정
      </div>
      <v-form>
        <v-container>
          <v-layout row wrap>

            <v-flex xs4 sm4 md3>
              <v-text-field
               v-model="option_name"
               color="info"
               label="옵션 이름"
               maxlength="10"
              ></v-text-field>
            </v-flex>

            <v-flex xs4 sm4 md3>
              <v-text-field
                v-model="option_price"
                type="number"
                color="info"
                label="옵션 가격"
              ></v-text-field>
            </v-flex>

             <v-flex xs4 sm3 md3>
              <v-btn class="little_top_margin" @click="add_modify_option">등록/수정</v-btn>
            </v-flex>

          </v-layout>
        </v-container>
      </v-form>

      <div>
        옵션 목록
      </div>

      <div class="select_option_list">
        <v-list
        v-for="(item, index) in l_option"
        :key="item.name"
        >
          <v-list-tile :class= "{activeBack : activeTab == item.option_no }">
            <v-list-tile-content @click="optionClick(item, index)" class="left">
              <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content @click="optionClick(item, index)" class="right">
              <v-list-tile-title>{{ formatPrice(item.price) }}원</v-list-tile-title>
            </v-list-tile-content>
            <span class="right margin_left" @click="d_option(item.option_no)">
              <v-icon>clear</v-icon>
            </span>
          </v-list-tile>
            
        </v-list>
      </div>

      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
					<div class="img_div">
            <img :src="imageUrl" height="150" v-if="imageUrl"/>
            <v-icon @click="clearImg" v-if="imageUrl" class="clear_icon">clear</v-icon>
          </div>
					<v-text-field label="이미지 업로드" color="info" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
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
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'


  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      desc: { required,  maxLength: maxLength(20) },
      price: { required, maxLength: maxLength(20) }
    },

    data: () => ({
      no: 0,
      name: '',
      desc: '',
      price: '',
      select: null,
      items: [],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      inputFileValue: '',
      optionSubmit: '',
      sold_yn: '',
      original_name: '',
      l_option: [],
      option_price: '',
      option_name: '',
      o_name: '',
      o_price: '',
      activeTab: '',
      l_o_idx: -1,
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
      product () {
        return this.$store.getters.product;
      }
    },
    mounted() {
      this.$store.commit('add_product_btn', false)
      if (this.product != '') {
        this.l_option = this.product.options
        this.name = this.product.name
        this.desc = this.product.desc
        this.price = this.product.price
        this.sold_yn = this.product.sold_yn == 'Y' ? true : false
        this.imageName = this.product.img_name
        this.imageUrl = this.product.img_url
        this.no = this.product.no
      } 

    },
    methods: {
      clear () {
        this.$v.$reset()
        this.name = ''
        this.desc = ''
        this.$refs.image.value = null
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
        this.sold_yn = ''
        this.original_name = ''
        this.l_option = []
        this.o_name = ''
        this.o_price = ''

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
          console.log(this.l_option.length)
          for (let i = 0; i < this.l_option.length; i++) {
            this.o_name += this.l_option[i].name + ','
            this.o_price += this.l_option[i].price + ','
          }
          let params = {
            imageName: this.imageName,
            imageUrl: this.imageUrl,
            imageFile: this.imageFile,
            name: this.name,
            desc: this.desc,
            price: this.price,
            option: this.optionSubmit,
            no: this.no,
            sold_yn: this.sold_yn == true ? 'Y' : 'N',
            original_name: this.original_name,
            o_name : this.o_name,
            o_price : this.o_price
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
          formData.append('no', this.no)
          formData.append('sold_yn', this.sold_yn == true ? 'Y' : 'N')
          formData.append('original_name', this.original_name)
          formData.append('o_name', this.o_name)
          formData.append('o_price', this.o_price)


          this.$store.commit('progress', true)
          this.$store.dispatch('add_update_product', formData)
          .then((res) => {
            console.log(res)
            this.$store.commit('progress', false)
            this.$router.push('/productList')
          })

        }
        
      },
      add_modify_option() {
        if (this.option_name == '' || this.option_price == '') {
          return
        }
        else {
          let dup = true
          if (this.l_option.length > 0) {
            for( let i = 0; i < this.l_option.length ; i++) {
              if (this.l_option[i].name == this.option_name) {
                dup = false
                break;
              }
            }
          }
          if (dup) {
            if(this.l_o_idx == -1) {
              let o_p
              if (parseInt(this.option_price) <= 1000000)
                  o_p = this.option_price
              else 
                o_p = 1000000
              this.l_option.push({
                name: this.option_name,
                price: o_p
              })
            }
            else {
              this.l_option[this.l_o_idx].name = this.option_name
              if (parseInt(this.option_price) <= 1000000)
                this.l_option[this.l_o_idx].price = this.option_price
              else 
                this.l_option[this.l_o_idx].price = 1000000
            }
          }
          else {
            alert('옵션 이름이 중복되어 변경 및 추가 할수 없습니다.')
          }
          this.option_name = ''
          this.option_price = ''
          this.l_o_idx = -1;
          this.activeTab = ''
        }
      },
      d_option(no) {
        let d_index = -1
        for(let i = 0; i < this.l_option.length; i++) {
          if (this.l_option[i].option_no == no) {
            d_index = i
            break;
          }
        }
        if (d_index != -1)
          this.l_option.splice(d_index, 1)
      },
      optionClick(item, index) {
        if(item.option_no != this.activeTab) {
          this.activeTab = item.option_no
          this.option_name = item.name
          this.option_price = item.price
          this.l_o_idx = index
        }
        else {
          this.activeTab = ''
          this.option_name = ''
          this.option_price = ''
          this.l_o_idx = -1
        }
      },
      formatPrice(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },

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

.container {
  padding: 0;
  margin: 0;
}

.little_top_margin {
  margin-top: 16px;
}

.margin_left {
  margin-left: 10px;
}

.activeBack {
  background-color: white;
}
.activeBack *{
  color: black;
}

</style>