import  axios from 'axios';

const url = "http://localhost:3000/";
// axios.defaults.withCredentials = true

class indexServis {

    constructor(){

    }

    async getRoot () {
        try{
            const res = await axios.get(url);
            const data = res.data;
            return data;
        }
        catch(err){
            reject(err);
        }

    }


}

export default new indexServis();