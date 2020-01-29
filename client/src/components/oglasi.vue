<template>
    <div class="container" id="oglas"  >

        <!--        <div class="modal fade" id="modal" ref="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"-->
        <!--             aria-hidden="true" v-if="showModal">-->
        <!--            <oglas></oglas>-->
        <!--        </div>-->

    <div  id="sadrzajOglasa">


        {{ `${ovajOglas.id} :::: ${ovajOglas.prodavac}`}}

        <p id="ime"> {{`${ovajOglas.kategorija} > ${ovajOglas.ime}`}}</p>
        <br>
        <br>
        <p id="opis">{{ovajOglas.opis}}</p>
        <p id="preostaloVreme">{{`Preostalo vreme ${ovajOglas.preostaloVreme} sekundi :::: broj pregleda
            ${ovajOglas.brojPregleda}`}}</p>
        <p id="cena"> {{`Cena = ${ovajOglas.cena}e`}}</p>
        <div class="row">
            <!--                            <button type="button" > <b>LICITIRAJ.BA</b></button>-->
            <div class="col col-4"></div>
            <div class="input-group col ">
                <input type="number" class="form-control" id="licitacionaCena" :value="saberi(ovajOglas.cena)" aria-label="Ponuda???" aria-describedby="basic-addon2" :min="saberi(ovajOglas.cena)">
                <span class="input-group-text">€</span>
                <div class="input-group-append" v-if="this.ulogovan">
                    <button type="button" v-on:click="licitiraj(ovajOglas.id, ovajOglas.cena)"> <b>LICITIRAJ.BA</b></button>
                </div>
            </div>
            <div class="col col-3"></div>
        </div>
    </div>

    </div>




</template>

<script>
    import oglasiServis from "../../axiosRoutes/oglasiServis";
    import licitacioniServis from "../../axiosRoutes/licitacioniServis";
    import $ from "jquery";
	import korisnickiServis from "../../axiosRoutes/korisnickiServis";

    export default {
        name: "oglasi",
        data(){
            return{
            	ulogovan :{
            		type:String
                },
                _id:{
                    type: String
                },
                prodavac: {
                    type: String
                },
                preostaloVreme: {
                    type: Number
                },
                cena: {
                    type: Number
                },
                slikaLink: {
                    type: String
                },
                idProdavca:{
                    type:String
                },
                opis:{
                    type:String
                },
                brojPregleda: {
                    type:Number
                },
                idOglasa: {
                    type: String
                },
                kategorija:{
                    type: String
                },
                licitacije: {
                    type: Array
                },

                lessOpis:{
                    type:String
                },

                moreOpis:{
                    type:String
                },

                datumPostavljanja:{
                    type:Date
                },

                ovajOglas:{}

            }
        },
        async created(){
            console.log("Oglas.vue je ispisao ovu poruku");

            /*TODO: Ovde treba da se napravi funkcija koja ce da pri pravljenju ovog elementa da pozove axios funkciju da getuje oglas sa ID iz linka pomocu parametra
            https://medium.com/@saidhayani/understand-routing-in-vue-js-with-examples-6da96979c8e3 Evo link koji sto objasnjava

            Vrv moze samo da se u data stavi promenjiva oglas i onda se gore samo vozi oglas.id oglas.opis oglas.tamo nesto
             */
            try {
                let promenjiva = await oglasiServis.getOglas(this.$route.params.id);
                // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                let nekapromenjiva = await korisnickiServis.getSession();
                this.ulogovan = nekapromenjiva.data;

                this.ovajOglas = promenjiva;
                let drugapromenjiva  = await oglasiServis.patchOglas(this.$route.params.id)

            }catch (e) {

                console.log(e.response + " ovo je iz oglasi.vue")

            }



        },


        methods:{
            splitOpis: function(oglas){



            },
            saberi : function(cena){
                let integer = parseInt(cena);
                integer += 5;
                return integer;

            },

            licitiraj :  async function (id, cenanaOglasu) {
                let cena = document.getElementById('licitacionaCena').value;
                console.log("Oglas id je ====" + id);
                console.log("AAAAAAA");
                let licitacionaCena = parseInt(cena);
                if(licitacionaCena  >= parseInt(cenanaOglasu) + 5){


                    let licitacija = await licitacioniServis.postLicitacija( id,1, licitacionaCena);
					console.log("ovo je licitacija = " + licitacija)
                    console.log("posle licitacije/////////////////////////////////////////////////////////")
                    this.$router.go();



                }

            },


        }
    }
</script>

<style scoped>
    .oglas-container{
        padding: 20px;
        border-radius: 10px;
        max-width: 800px;
        margin: 0 auto;
    }
    p.error {
        border: 1px solid #ff5b5f;

        padding: 10px;
        margin-bottom: 15px;

    }

    #sadrzajOglasa{
        position: relative;

        background-color: #a3d165;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;

        border-radius: 20px;
    }


    button{
        border-radius: 10px;

        /*padding: 10px;*/
        color: white;
        background-color: #ffb23e;
        border: 20px #FF0000;
        margin-right: 10px;
        margin-left: 20px ;

    }

    .licitarDugme{
        text-align: center;
        margin: 0 auto;
        position: relative;
    }


    .cena{
        color: #ffffff;
    }

    p.ime{
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
</style>