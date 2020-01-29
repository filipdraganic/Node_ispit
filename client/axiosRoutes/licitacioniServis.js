import axios from 'axios';


const url = "http://localhost:3000/licitacije/";


class licitacioniServis {

    constructor(){

    }

    async getLicitacije () {


        try{
            const res = await axios.get(url);
            const data = res.data;
            return data;
        }
        catch(err){
            reject(err);
        }

    }

    async postLicitacija(oglasID, idKorisnika, cena){

        return axios.post(url, {
            oglasID, idKorisnika, cena
        },{
            withCredentials:true
        });
    }

    deleteLicitacija(id){
        return axios.delete(`${url}${id}`);
    }

    ispis(){

    }


}

export default new licitacioniServis();