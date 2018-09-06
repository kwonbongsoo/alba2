<template>
  <div>
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
        :counter="20"
        label="가격"
        required
        @input="$v.price.$touch()"
        @blur="$v.price.$touch()"
      ></v-text-field>
      <v-select
        v-model="select"
        :items="items"
        :error-messages="selectErrors"
        label="옵션"
        required
        @change="$v.select.$touch()"
        @blur="$v.select.$touch()"
      ></v-select>
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

      <v-btn @click="submit">상품등록/수정</v-btn>
      <v-btn @click="clear">clear</v-btn>
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
      price: { required, maxLength: maxLength(20) },
      select: { required }
    },

    data: () => ({
      name: '',
      desc: '',
      price: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      imageName: '',
      imageUrl: '',
      imageFile: '',
      inputFileValue: ''
    }),
    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('옵션을 입력하세요')
        return errors
      },
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
      }
    },
    mounted() {

      let params = {
        no: this.$route.params.no
      }
      this.$store.dispatch('product_detail', params)
      .then((res) => {
        console.log(res)
      })
    },
    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.desc = ''
        this.select = null
        this.$refs.image.value = null
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
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
        let params = {
          name: this.name,
          desc: this.desc,
          price: this.price
        }
        this.$store.dispatch('add_product', params);
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
.clear_icon {
  position:absolute;
  right: 0;
  font-size: 30px;
  color: red;
  font-weight: bold;
  z-index: 2;
}
</style>