<template>
  <div>
    <div v-if="!ulogovan">
      <webapp-header>

      </webapp-header>
    </div>
    <div v-else>

      <header-logged-in>

      </header-logged-in>
    </div>

    <router-view>


    </router-view>




    <webapp-footer>

    </webapp-footer>

  </div>
</template>

<script>

  import myFooter from "./views/myFooter";
  import headerLoggedIn from "./views/headerLoggedIn";
  import korisnickiServis from "../axiosRoutes/korisnickiServis";
  import headerLoggedOut from "./views/headerLoggedOut";
  import indexServis from "../axiosRoutes/indexServis";


  export default {
  name: 'App',
  components: {

    'webapp-footer':myFooter,
    'webapp-header':headerLoggedOut,
    'headerLoggedIn':headerLoggedIn,


  },
  data () {
      return{
        title: 'Titl',
        ulogovan: false
      }
  },
  async created() {
    console.log("Ovo je druga promenjiva")

    let drugapromenjiva = await korisnickiServis.getSession();


    console.log(drugapromenjiva)
    this.ulogovan = drugapromenjiva.data
    console.log("ULOGOVAN " + this.ulogovan)
  },


    methods: {
      greetings: function() {
        return "nestonesto"
      },
      getUlogovan: async function () {

        return this.ulogovan;


      }
    }

};

</script>

<style scoped>




</style>