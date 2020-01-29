import axios from 'axios';

const url = "http://localhost:3000/oglasi/";
axios.defaults.withCredentials = true
class oglasiServis{

    constructor(){

    }

    async getOglasi(){
        //console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");

        try {

            const res = await axios.get(url,{
                withCredentials:true
            });

            return res.data;

        }
        catch(err){
            reject(err);

        }

        // axios.defaults.withCredentials = true;
        // axios(url, {
        //     method: 'GET',
        //     withCredentials: true
        // }).then(res => {
        //     console.log(res);
        //     return res.data
        // }).catch(err => {
        //     console.log(err.response);
        // })




    }

    patchOglas(id){
        let poruka = "brojpregleda" ;
        return axios.patch(url+id, {
            poruka
        });
    }

    async getOglas(id){
        try {
            const res = await axios.get(url+id);
            return res.data;
        }
        catch(err){
            reject(err);
        }
    }

    async postOglas(ime, preostaloVreme, cena, prodvac, opis, kategorija ){

        try{
            return await axios.post(url, {
                ime, preostaloVreme, cena, prodvac, opis, kategorija
            })
        }catch (e) {
            console.log(e);

        }
    }

    async deleteOglas(id){
        return axios.delete(`${url}${id}`)
    }

    splitOpis(oglas){

        let brojSpaceova = 0;
        let brojSlova = 0;
        for(let slovo in oglas.opis) {
            brojSlova++;
            //console.log(oglas.opis[slovo])
            if(oglas.opis[slovo] === " "){
                brojSpaceova++;
            }
            if(brojSpaceova === 15){
                break;
            }

        }

        oglas.lessOpis = oglas.opis.substring(0, brojSlova);
        oglas.moreOpis = oglas.opis.substring(brojSlova, oglas.opis.length);

        return "Nemoguce";

    }

}

export default new oglasiServis()