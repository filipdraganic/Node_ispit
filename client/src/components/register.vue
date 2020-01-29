<template>

    <div>

        <b-alert
                :show="dismissCountDown"
                dismissible
                fade
                variant="warning"
                @dismissed="dismissCountDown=0"
                @dismiss-count-down="countDownChanged"
        >
            {{this.error}}
        </b-alert>
        <div class="modal fade" id="modalRegisterForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" >
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header text-center">
                        <h4 class="modal-title w-100 font-weight-bold">Register</h4>
                        <button type="button" class="close" data-dismiss="modal" id="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mx-3">

                        <div class="md-form mb-4">
                            <i class="fas fa-envelope prefix grey-text"></i>
                            <label data-error="wrong" data-success="right" for="email">Email adresa</label>
                            <input type="email" id="email" class="form-control validate " placeholder="Email" v-model="email">
                        </div>

                        <div class="row">
                            <div class="md-form mb-4 col-6">
                                <i class="fas fa-lock prefix grey-text"></i>
                                <label data-error="wrong" data-success="right" for="ime">Ime</label>
                                <input type="text" id="ime" class="form-control validate" placeholder="Ime" v-model="ime" onkeypress="return (event.charCode > 64 &&
        event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">
                            </div>

                            <div class="md-form mb-4 col-6">
                                <i class="fas fa-lock prefix grey-text" ></i>
                                <label data-error="wrong" data-success="right" for="prezime">Prezime</label>
                                <input pattern="[a-zA-Z]+" type="text" id="prezime" class="form-control validate" placeholder="Prezime" v-model="prezime" onkeypress="return (event.charCode > 64 &&
        event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">
                            </div>
                        </div>

                        <div class="row">
                            <div class="md-form mb-4 col">
                                <i class="fas fa-lock prefix grey-text"></i>
                                <label data-error="wrong" data-success="right" for="adresa">Adresa</label>
                                <input type="text" id="adresa" class="form-control validate" placeholder="Adresa" v-model="adresa" onkeypress="return (event.charCode > 64 &&
            event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">
                            </div>

                            <div class="md-form mb-4 col-2">
                                <i class="fas fa-lock prefix grey-text"></i>
                                <label data-error="wrong" data-success="right" for="brojAdrese">Broj</label>
                                <input type="text" pattern="[0-9]+" id="brojAdrese" class="form-control validate" placeholder="" v-model="brojAdrese" min="1" >
                            </div>
                        </div>


                        <div class="md-form mb-4">
                            <i class="fas fa-lock prefix grey-text"></i>
                            <label data-error="wrong" data-success="right" for="grad">Grad</label>
                            <input type="text" id="grad" class="form-control validate" placeholder="Grad" v-model="grad" onkeypress="return (event.charCode > 64 &&
        event.charCode < 91) || (event.charCode > 96 && event.charCode < 123)">
                        </div>

                        <div class="md-form mb-4">
                            <i class="fas fa-lock prefix grey-text"></i>
                            <label data-error="wrong" data-success="right" for="username">Username</label>
                            <input type="text" id="username" class="form-control validate" placeholder="Username" v-model="username">
                        </div>

                        <div class="md-form mb-4">
                            <i class="fas fa-lock prefix grey-text"></i>
                            <label data-error="wrong" data-success="right" class="" for="password">Password</label>
                            <input type="password" id="password" class="form-control " v-model="password" placeholder="Password" >
                        </div>




                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button class="btn btn-default" id="registerDugme" v-on:click="konzola" >Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import korisnickiServis from "../../axiosRoutes/korisnickiServis";
    import $ from "jquery";

    export default {
        name: "register",

        data(){
            return{
                dismissSecs: 5,
                dismissCountDown: 0,
                email:null,

                password:null,

                ime:null,

                prezime:null,

                adresa:null,

                brojAdrese:null,

                grad:null,

                username:null,

                error:'',

                prikaziError: false,

                prosloCrvenoPolje:'ime'
            }
        },

        methods:{
            'konzola' : function(){
                this.prikaziError = false;
                this.error = "";
                document.getElementById(this.prosloCrvenoPolje).classList.remove('is-invalid');


                if(this.ime === null){
                    this.error = "Niste uneli ime";
                    this.countDownChanged(3, "ime");
                }
                else if(this.ime.length < 3){
                    this.error = "Ime vam je krace od 3 slova saberite se";
                    this.countDownChanged(3, "ime");
                }
                else if(this.prezime === null){
                    this.error = "Niste uneli prezime";
                   // this.countDownChanged(3, "prezime");
                }
                else if(this.prezime.length < 3){
                    this.error = "Prezime vam je krace od 3 slova saberite se";
                  //  this.countDownChanged(3, "prezime");
                }
                else if(this.password === null){
                    this.error = "Niste uneli password";
                    this.countDownChanged(3, "password");
                }
                else if(this.password.length < 3){
                    this.error = "Password vam je krace od 3 slova saberite se";
                    this.countDownChanged(3, "password");
                }
                else if(this.adresa === null){
                    this.error = "Niste uneli prezime";
                    this.countDownChanged(3, "adresa");
                }
                else if(this.adresa.length < 3){
                    this.error = "Adresa vam je krace od 3 slova saberite se";
                    this.countDownChanged(3, "adresa");
                }
                else if(this.username === null){
                    this.error = "Niste uneli username";
                    this.countDownChanged(3, "username");
                }
                else if(this.username.length < 3){
                    this.error = "Username vam je krace od 3 slova saberite se";
                    this.countDownChanged(3, "username");
                }
                else if(this.grad === null) {
                    this.error = "Niste uneli ime grada";
                    this.countDownChanged(3, "grad");
                }
                else if(this.brojAdrese === null) {
                    this.error = "Niste uneli broj adrese";
                    this.countDownChanged(3, "grad");
                }


                else if(!this.validirajEmail(this.email)){
                    this.error = "Email nije dobro unesen";
                    this.countDownChanged(3, "email");
                }
                else if(this.email === null){
                    this.error = "Niste uneli prezime";
                    this.countDownChanged(3, "email");
                }

                else {
                    //document.getElementById("close").click();
                    this.napraviKorisnika();
                }



                console.log(this.ime,this.prezime,this.email, this.password, this.adresa + " " + this.brojAdrese, this.grad,
                    this.username);


                console.log(this.error);

                // $(document).ready(function(){
                //     $("#add-item-error").modal('show');
                // });


            },
            countDownChanged(dismissCountDown, staDaPocrveni) {
                document.getElementById(staDaPocrveni).classList.add('is-invalid');
                this.prosloCrvenoPolje = staDaPocrveni;

                this.dismissCountDown = dismissCountDown

            },

            validirajEmail :function (mail)
            {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
                {
                    return (true)
                }
                const theOneFunc = delay => {
                    this.prikaziError = false;
                };
                setTimeout(theOneFunc, 4 * 1000, 4);

                return (false)
            },

            napraviKorisnika : async function(){
                try{
                    let promenjiva;
                    promenjiva = await korisnickiServis.postKorisnik(this.ime,this.prezime,this.email, this.password, this.adresa + " " + this.brojAdrese, this.grad,this.username);
                    $('.modal').modal('hide');

                    console.log(promenjiva)
                }catch (e) {

                }


            }
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