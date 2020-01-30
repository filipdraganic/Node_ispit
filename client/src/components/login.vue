<template>
    <div class="modal fade" id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" >
    <div class="modal-dialog" role="document" ref="loginID" >
        <div class="modal-content">

            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">
                <div class="md-form mb-5">
                    <i class="fas fa-envelope prefix grey-text"></i>
                    <label data-error="wrong" data-success="right" for="email" >Your email</label>

                    <input type="email" id="email" class="form-control validate" placeholder="Email" v-model="email">
                </div>

                <div class="md-form mb-4">
                    <i class="fas fa-lock prefix grey-text"></i>
                    <label data-error="wrong" data-success="right" for="pass">Your password</label>
                    <input type="password" id="pass" class="form-control validate" placeholder="Password" v-model="password">
                </div>



            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button class="btn btn-default" id="loginDugme" v-on:click="login()" >Login</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import korisnickiServis from "../../axiosRoutes/korisnickiServis";

    import $ from 'jquery'

    export default {
        name: "login",

        data(){
            return {
                email:'test@gmail.com',
                password:'testtest00',
                ulogovan:"false",
            }
        },




        methods:{
            fetchEmail(){
                return this.email;
            },



            //TODO: https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router
            // ovo je sajt za login
            //https://blog.sqreen.com/authentication-best-practices-vue/
            // Ako ne probaj ovo izgleda okej
            login: async function(){
                let promenjiva;


                promenjiva = await korisnickiServis.loginKorisnik(this.email,this.password);

                if(promenjiva.status === 200){
                    this.ulogovan = true;
                    console.log("Nije error =")
                    console.log(promenjiva.data);
                    $('.modal').modal('hide');

					console.log("ovo je id nakon logina" + promenjiva.data.id)
                    this.$store.commit('setID', promenjiva.data.id)
					console.log("id = " + this.$store.getters.getId)
					this.$router.go()

				}
                else{
                    this.ulogovan = false;
                    console.log("error = ");
                    if(promenjiva.status ===203)
                    document.getElementById("pass").classList.add('is-invalid');
                    if(promenjiva.status === 202)
                    document.getElementById("email").classList.add('is-invalid');



                }


               },



            },
        mounted() {
            $(".modal").on("hidden.bs.modal", function(){

            });
        }
    }


function getDefaultData(){
    return {
        email:' ',
        password:'',
        ulogovan:"false",
    }
}

</script>

<style scoped>
    button{
        border-radius: 10px;

        /*padding: 10px;*/
        color: white;
        background-color: #ffb23e;
        border: 20px #FF0000;
        margin-right: 10px;
        margin-left: 20px ;

    }
</style>