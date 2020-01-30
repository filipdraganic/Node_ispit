<template>

    <div id="header" class="container-fluid">

        <header class="row">
            <div class="col col-4 "  >


            </div>
            <div class="col col-4" >

                <a v-on:click="goToHome()"><img src="..\assets\headerlogo128.png" id="logo"></a>


            </div>

<!--                <div class="col col-3" ></div>-->

            <keep-alive>
                <div class="row"  id="headerdugmici">
                    <div class="col col-" >

                    </div>

                    <div class="text-center col col-3">
                        <a id="loginModalDugme" href="" class="btn btn-default btn-rounded mb-4 " data-toggle="modal" data-target="#modalLoginForm" >Login</a>
                    </div>
                    <div class="text-center col col-3">
                        <a id="registerModalDugme" href="" class="btn btn-default btn-rounded mb-4 " data-toggle="modal" data-target="#modalRegisterForm">Register</a>
                    </div>

                </div>

            </keep-alive>


        </header>


        <div>

                <login ></login>


                <register></register>

        </div>


    </div>
</template>

<script>
    import image from "../assets/headerlogo128.png"
    import login from "../components/login"
    import register from "../components/register"
    import korisnickiServis from "../../axiosRoutes/korisnickiServis"

    import $ from 'jquery'

    export default {
        name: "header",
        data(){
            return{

                title: 'Limetak',
                subtitl: 'Sajt za licitaciju',

                image:'image',

                loggedin: false,

            }
        },

        components:{
            'login' : login,
            'register' : register,
            'ulogovan' : false
        },

        async created(){


        },

        methods:{


            idiNaNoviOglas: function() {
                console.log("Ovde?");
                this.$router.push({path: 'noviOglas'})

            },

			goToHome: function () {
				this.$router.go()

			}

        },


    }
</script>

<style scoped>

    .btn{
        border-radius: 10px;

        /*padding: 10px;*/
        color: white;
        background-color: #ffb23e;
        border: 20px #FF0000;
        margin-right: 10px;
        margin-left: 20px ;


    }

    #noviOglasDugme{
        min-width: 150px;
        margin-top: 10px;

    }

    #header{

    }
    #dugme{
        border-color: black;
        padding: 10px;

    }

    .img-fluid{
        max-width: 100%;
        height: auto;
    }
    header{
        background-color: #ffffff;
        height: 70px;
        text-align: center;

    }
    .modal.fade{

    }
    .text-center {
        float: right;

    }

    #loginDugme{
        background-color: darkgrey;
        color: #ffffff;

    }

    #logo{
        /*display: block;*/
        /*margin: auto;*/
        margin-top: 10px;
        max-height: 64px;
        transition: transform .2s

    }
    #logo:hover{
        transform: scale(1.2);
        border-radius: 25px;
    }


    #loginModalDugme{
        margin-top: 20px;
    }

    #registerModalDugme{
        margin-top:20px;

    }

</style>