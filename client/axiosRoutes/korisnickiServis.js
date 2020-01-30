import  axios from 'axios';

const url = "http://localhost:3000/korisnici/";
axios.defaults.withCredentials = true

class korisckiServis {

    constructor(){

    }

    async getKorisnik () {


            try{
                const res = await axios.get(url);
                const data = res.data;
                return data;
            }
            catch(err){
                reject(err);
            }

    }

    async postKorisnik(ime,prezime,email,password,adresa,grad,username){
        let response;

        console.log("username i password " + password + '  ' + username);
        try {
            response = await axios.post(url+'registracija', {
                ime,prezime,email,password,adresa,grad,username
            })
                .then((response)=>{
                    console.log("error");
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.headers);
                    console.log(response.config);
                },(error) =>{
                    console.log("error = ");
                    console.log(error.data);
                    console.log(error.status);
                    console.log(error.statusText);
                    console.log(error.headers);
                    console.log(error.config);
                });
            return 1;

        }
        catch (e) {
            console.log(error.message);
            console.log(e.message);


        }
    }

    async loginKorisnik(email, password){


        return axios.post(url+'login', {
            email,password
        },{
            withCredentials:true
        });

    }

    async logoutKorisnik(){
        let error;

        return axios.get(url+'session/logout',{
            withCredentials:true
        })
    }

    async getSession(){
        console.log("Pozivam proveru sesija")
        return axios.get(url+'session/getSession',{
            withCredentials:true
        })
    }

    deleteKorisnik(id){
        return axios.delete(`${url}${id}`);
    }



}

export default new korisckiServis();