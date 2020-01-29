<template>


    <div>


        <div class="modal-dialog" role="document">
            <div class="modal-content">

                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">Novi oglas</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">

                    <div class="md-form mb-4">
                        <i class="fas fa-envelope prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" for="imeOglasa" >Ime oglasa</label>
                        <input type="text" id="imeOglasa" class="form-control validate" placeholder="Ime oglasa" v-model="imeOglasa">
                    </div>


                    <b-dropdown id="preostaloVreme"
                                name="preostaloVreme"
                                v-model="preostaloVreme"
                                :text="textZaVreme"

                                class="m-md-2" >

                        <b-dropdown-item v-for="option in this.optionsZaTrajanje"
                                         :key="option.value"
                                         :value="option.value"
                                         @click="preostaloVreme = option.value , textZaVreme = option.text">
                            {{option.text}}
                        </b-dropdown-item>
                    </b-dropdown>

                    <b-dropdown id="kategorija"
                                name="kategorija"
                                v-model="kategorija"
                                :text="textZaKategoriju"
                                variant="primary"
                                class="m-md-2" >

                        <b-dropdown-item v-for="option in this.optionsZaKategoriju"
                                         :key="option.value"
                                         :value="option.value"
                                         @click="kategorija = option.value ,textZaKategoriju = option.text">
                            {{option.text}}
                        </b-dropdown-item>
                    </b-dropdown>



                    <!--                    <div class="md-form mb-4">-->
<!--                        <i class="fas fa-lock prefix grey-text"></i>-->
<!--                        <label data-error="wrong" data-success="right" ></label>-->
<!--                        <b-dropdown id="preostaloVreme" text="Trajanje oglasa" class="m-md-2" v-model="preostaloVreme">-->
<!--                            <b-dropdown-item>Jedan dan</b-dropdown-item>-->
<!--                            <b-dropdown-item>Dva dana</b-dropdown-item>-->
<!--                            <b-dropdown-item>Tri dana</b-dropdown-item>-->
<!--                        </b-dropdown>-->
<!--                    </div>-->




                    <div class="md-form mb-4 ">
                        <i class="fas fa-lock prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" for="cena">Cena proizvoda</label>
                        <div class="input-group mb-3">

                            <input type="number" pattern="[0-9]+"  id="cena" class=" form-control validate " placeholder="Cena" v-model="cena" min="0">
                            <div class="input-group-append">
                                <span class="input-group-text ">€</span>
                            </div>
                        </div>
                    </div>

                    <div class="md-form mb-4">
                        <i class="fas fa-lock prefix grey-text"></i>
                        <label data-error="wrong" data-success="right" for="opis">Opis oglasa</label>
                        <textarea class="form-control" id="opis" rows="3" placeholder="Opis vaseg oglasa" v-model="opis"></textarea>
                    </div>

<!--                    <div class="md-form mb-4">-->
<!--                        <i class="fas fa-lock prefix grey-text"></i>-->
<!--                        <label data-error="wrong" data-success="right" ></label>-->
<!--                        <b-dropdown id="kategorija" text="Kategorija za oglas" class="m-md-2" v-model="kategorija">-->
<!--                            <b-dropdown-item>Odeca</b-dropdown-item>-->
<!--                            <b-dropdown-item>Aksesoari</b-dropdown-item>-->
<!--                            <b-dropdown-item>Mobilni telefoni</b-dropdown-item>-->
<!--                            <b-dropdown-item>Tehnika</b-dropdown-item>-->
<!--                            <b-dropdown-item>Auto i moto</b-dropdown-item>-->
<!--                            <b-dropdown-item>Knjige</b-dropdown-item>-->
<!--                            <b-dropdown-item>Umetnost</b-dropdown-item>-->
<!--                        </b-dropdown>-->
<!--                    </div>-->



<!--                    <form id="imgur">-->
<!--                        <input type="file" class="imgur" accept="image/*" data-max-size="5000" v-on:change="slika"/>-->
<!--                    </form>-->



                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-default" id="registerDugme" v-on:click="konzola()" >Napravi oglas</button>
                </div>
            </div>
        </div>
    </div>



</template>

<script>
    import oglasiServis from "../../axiosRoutes/oglasiServis";

    export default {
        name: "noviOglas",

        data() {
            return {
                textZaKategoriju: 'Kategorija',

                textZaVreme: 'Trajanje oglasa?',

                imeOglasa: '',

                slika: '',

                preostaloVreme: '',

                cena: '',

                prodavac: '',

                opis: '',

                kategorija: '',

                optionsZaTrajanje: [
                    {
                        "value": "1",
                        "text": "Jedan dan"
                    },
                    {
                        "value": "2",
                        "text": "Dva dana"
                    },
                    {
                        "value": "3",
                        "text": "Tri dana"
                    }
                ],

                optionsZaKategoriju: [
                    {
                        "value" : "Umetnost",
                        "text" : "Umetnost"
                    },
                    {
                        "value" : "Aksesoari",
                        "text" : "Aksesoari"
                    },
                    {
                        "value" : "Mobilni telefoni",
                        "text" : "Mobilni telefoni"
                    },
                    {

                        "value" : "Tehnika",
                        "text" : "Tehnika"
                    },
                    {
                        "value" : "Auto i Moto",
                        "text" : "Auto i Moto"
                    },
                    {
                        "value" : "Knjige",
                        "text" : "Knjige"
                    },
                    {
                        "value" : "Odeca",
                        "text" : "Odeca"
                    }
                ]

            }

        },

        methods: {

            konzola: function(){
                //console.log('cena = #' +this.cena + '# ime oglasa = #' +this.imeOglasa +'# presotalo vreme = #' +this.preostaloVreme+'# opis =  #' +this.opis+'# kategorija =  #' +this.kategorija+'# slike =  #' + this.slika);


                if(this.imeOglasa.length < 2) {
                    document.getElementById("imeOglasa").classList.add('is-invalid');
                    return;
                }else{
                    document.getElementById("imeOglasa").classList.remove('is-invalid');

                }
                if(this.cena.length < 1 ){
                    document.getElementById("cena").classList.add('is-invalid');

                    return;
                }else{
                    document.getElementById("cena").classList.remove('is-invalid');

                }
                if(this.kategorija === ''){
                    document.getElementById("kategorija").classList.add('is-invalid');

                    return;
                }else{
                    document.getElementById("kategorija").classList.remove('is-invalid');

                }
                if(this.preostaloVreme === '') {
                    document.getElementById("preostaloVreme").classList.add('is-invalid');

                    return;
                }else{
                    document.getElementById("preostaloVreme").classList.remove('is-invalid');

                }
                if(this.opis.length <3){
                    document.getElementById("opis").classList.add('is-invalid');
                    return;
                }else{
                    document.getElementById("opis").classList.remove('is-invalid');

                }


                oglasiServis.postOglas(this.imeOglasa, parseInt(this.preostaloVreme) *86400, this.cena, 1, this.opis, this.kategorija  )
                this.$router.go('/')

            },

            uploadToImgur: function () {

                $('input[type=file]').on("change", function () {

                    var $files = $(this).get(0).files;

                    if ($files.length) {

                        // Reject big files
                        if ($files[0].size > $(this).data("max-size") * 1024) {
                            console.log("Please select a smaller file");
                            return false;
                        }

                        // Begin file upload
                        console.log("Uploading file to Imgur..");

                        // Replace ctrlq with your own API key
                        var apiUrl = 'https://api.imgur.com/3/image';
                        var apiKey = 'ctrlq';

                        var settings = {
                            async: false,
                            crossDomain: true,
                            processData: false,
                            contentType: false,
                            type: 'POST',
                            url: apiUrl,
                            headers: {
                                Authorization: 'f344e3fbb5ef93c ' + 'e1016826715684e18c6833697f4748a45aed2bef',
                                Accept: 'application/json'
                            },
                            mimeType: 'multipart/form-data'
                        };

                        var formData = new FormData();
                        formData.append("image", $files[0]);
                        settings.data = formData;

                        // Response contains stringified JSON
                        // Image URL available at response.data.link
                            console.log(response);


                    }
                });


            }
        }
    }

</script>

<style scoped>

    #imgur{
        display: flex;
        justify-content: center;
        margin-left: 50px;
    }

    label{
        display: flex;
        justify-content: center;
    }

    .btn{
        border-radius: 10px;

        /*padding: 10px;*/
        color: white;
        background-color: #ffb23e;
        border: 20px #FF0000;
        margin-right: 10px;
        margin-left: 20px ;


    }

    b-dropdown{
        background-color: #ffb23e;
        color: #ffb23e;
        border-color: #ffb23e;
        border-radius: 20px;
    }
    #kategorija{
        float: right;
    }


    /*[id^="defaultForm-"]{*/
    /*    margin-left: 15px;*/
    /*}*/
</style>