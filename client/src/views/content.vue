<template>

    <div>


<!--        <p class="error" v-if="error">{{error}}</p>-->
        <div class="oglas-container">
            <div class="oglas"
                 v-for="(oglas,index) in oglasi"

                 v-bind:item="oglas"
                 v-bind:index="index"
                 v-bind:key="oglas._id"
                 v-on:click="">   <!-- ovo ide u funkciju koja ce me odvesti na localhost:8080/oglasi/oglas._id i ujedno ce mi vratiti
                                                                    oglas koji  da pokazem u oglasi.vue tako sto cu da uzmem iz parametra linka ID i iz baze cu uzeti sve sto
                                                                         mi treba-->

                <!--                      <div class="modal fade" id="modal" ref="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"-->
                <!--                           aria-hidden="true" v-if="showModal">-->
                <!--                          <oglas v-b-modal></oglas>-->
                <!--                      </div>-->

                <div>
                    <b-modal :id="oglas._id"
                             hide-footer :title="oglas.kategorija +` ` + oglas.ime" >

                        {{ `Prodavac :  ${oglas.prodavac}`}}


                        <br>
                        <br>
                        <p class="opis">{{oglas.opis}}</p>
                        <p class="preostaloVreme">{{`Preostalo vreme ${oglas.preostaloVreme} sekundi :::: broj pregleda
                            ${oglas.brojPregleda}`}}</p>
                        <p class="cena"> {{`Cena = ${oglas.cena}e`}}</p>

                    </b-modal>
                </div>


                {{ `${oglas.id} :::: ${oglas.prodavac}`}}
                {{`${oglas.datumPostavljanja}`}}
                <p class="ime"> {{`${oglas.kategorija} --> ${oglas.ime}`}}</p>
                <br>
                <br>
                <p class="preostaloVreme">{{`Preostalo vreme ${oglas.preostaloVreme} sekundi :::: broj pregleda
                    ${oglas.brojPregleda}`}}</p>
                <p class="cena"> {{`Cena = ${oglas.cena}e`}}</p>

                <!--                         <div >-->
                <!--                             <a id="modalDugme" href="" class="btn btn-default btn-rounded mb-4 " data-toggle="modal" data-target="#modal">Modal</a>-->
                <!--                      </div>-->
                <div class="row">
                    <b-button v-b-modal="oglas.id"> Detaljnije</b-button>
                    <b-button v-on:click="idiNaOglas(oglas.id)"> Idi na oglas</b-button>
                    <!--                            <b-button v-on:click="idiNaOglas(oglas._id)"> Detaljnije</b-button>-->

                </div>
            </div>

        </div>
    </div>






</template>

<script>
    import oglasiServis from "../../axiosRoutes/oglasiServis";
    import oglasiVue from "../components/oglasi"
    export default {
        name: "content",
        data(){
            return{
                oglasi:[],
                text:'',
                showModal:'true',
            }
        },
        components:{
            'oglas': oglasiVue,
        },


        async created(){
			window.scrollTo(0, 0);

			try{
                let obj = await oglasiServis.getOglasi();
                this.oglasi = obj;

                //console.log("objekti su = " + obj);
                //oglasiVue.splitOpis(nesto);
                let i = 0;

                for(i = 0; i < this.oglasi.length; i++){
                    //console.log(this.oglasi[i].opis);
                    //console.log(oglasiServis.splitOpis(this.oglasi[i]));
                    //;

                }

            }
            catch (e) {
                this.error = e.message;
            }
        },
        methods:{
            test : function(){


                console.log("Teeeesttrue")


            },

            idiNaOglas : function (oglasid) {
                console.log(oglasid);
                this.$router.push({name:'oglasi', params: {id: oglasid}})
                //this.$router.push({ path: `/oglasi/${oglasid}` })
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

    .oglas{
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