<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
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
                        label="ID" 
                        type="text">
                    </v-text-field>
                    <v-text-field 
                        prepend-icon="lock" 
                        name="password" 
                        color="info"
                        label="Password"
                        id="password" 
                        type="password">
                    </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="info">Login</v-btn>
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
        
    }),
    computed: {
      
    },
    mounted() {

    },
    methods: {
      
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


</style>