const Joi = require('@hapi/joi');

const express = require('express');
const router = express.Router();
const path = require('path');

const sqlite3 = require('sqlite3').verbose();
let bcrypt = require('bcryptjs');
let salt = "$2a$10$3h5B2fngn0x5tKUz4hCg7."

// sqlite3.OPEN_READONLY: open the database for read-only.
// sqlite3.OPEN_READWRITE : open the database for reading and writting.

//get all

router.get('/', async (req,res) => {
    try{
        // noinspection ES6AwaitOutsideAsyncFunction
        // const korisnici = await korisnikModel.find();


        let db = new sqlite3.Database("../Django/db.sqlite3", (err) =>{
            if(err){
                console.log("OVDE1")

                console.error(err.message)

            }
            else
                console.log("Uspesno konektovano za bazu")
                let rovovi = []

                    db.all(`SELECT * FROM korisnik_korisnik`, (err, row) => {
                        if (err) {
                            console.log("OVDE11111")
                            console.error(err.message);
                        }
                        console.log(row.id + "\t" + row.ime);

                        res.status(200).json({message:row})

                    });


            db.close()
        })



       // res.json(korisnici);
        //console.log(korisnici);
    }catch(err) {
        res.status(500).json({message:"Yikes"});

    }
});

// get one
router.get('/:id', async (req,res)=>{


    let db = new sqlite3.Database('../Django/db.sqlite3', (err) =>{
        if(err){
            console.error(err.message)

        }
        else {
            db.get("SELECT * FROM korisnik_korisnik where id='"+req.params.id +"'", (err, row) =>{
                if(err) {
                    console.error(err.message);
                    res.status(202).send(true);

                    return 0;
                }else{
                    console.log(row)
                    if(row === undefined ){

                        res.status(404).send("Ne postoji trazeni korisnik")
                    }
                    else
                        res.status(200).send(row)
                }
            })


            console.log("Uspesno konektovano za bazu")

        }
    })

    db.close()
});



//napravi novog
router.post('/registracija',async(req,res) =>{


    const schema = Joi.object().keys({
        ime: Joi.string().min(3).max(30).required(),

        prezime: Joi.string().min(3).max(30).required(),

        email: Joi.string().email({ tlds:{ allow:
            ['com','net','rs','co.yu'] }}).required(),

        adresa: Joi.string().min(3).max(30).required(),

        grad: Joi.string().min(3).max(30).required(),

        username: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),

        password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),

    });

    const {error, value} =  schema.validate({ ime: req.body.ime, prezime: req.body.prezime, email: req.body.email,
                        adresa: req.body.adresa, grad: req.body.grad, username: req.body.username,
                        password: req.body.password})

    if(error != null){
        console.log("error nije null : " + error);

        res.status(400).json({message: error });
        return;
    }

    let ime = req.body.ime
    let prezime = req.body.prezime
    let email = req.body.email
    let adresa = req.body.adresa
    let grad = req.body.grad
    let username = req.body.username
    let password=  req.body.password
    let hash = bcrypt.hashSync(password, 10);

    password = hash

    let values = [ime, prezime, email, adresa, grad, username, password]
    console.log(values)

    let db = new sqlite3.Database('../Django/db.sqlite3', (err) =>{
        if(err){
            console.error(err.message)

        }
        else {

            db.get("SELECT * FROM korisnik_korisnik WHERE email = '"+req.body.email+"'", (err, row) =>{
                if(err) {
                    console.error(err.message)
                    return 0;
                }else{
                    console.log("row je = " +row)
                    if(row === undefined){
                        db.run('INSERT INTO auth_user(password,is_superuser,username,first_name,email,is_staff,is_active, date_joined, last_name) VALUES(?,?,?,?,?,?,?,?,?)',
                                                        password, 0, username, ime, email, 1, 1, Date.now(),prezime, (err) => {

                            if (err) {
                                console.error(err.message)
                                console.error("nije uspelo")
                            } else {
                                console.log("Uspelo")
                            }

                        })


                        db.run('INSERT INTO korisnik_korisnik(ime,prezime,email,adresa,grad,username,password) VALUES(?,?,?,?,?,?,?)', values[0], values[1], values[2], values[3], values[4], values[5], values[6], (err) => {

                            if (err) {
                                console.error(err.message)
                                console.error("nije uspelo")
                                res.status(400).send({message: "nije uspelo dodavanje korisnika"})
                            } else {
                                console.log("Uspelo")
                                res.status(201).send({message: "uspelo dodavanje korisnika"})
                            }

                        })
                    }
                    else{
                        res.status(409).send({message:"Korisnik sa tim emajlom vec posotji"})
                    }
                    console.log("Uspesno konektovano za bazu")

                }
            })



        }
    })

    db.close()



});



router.post('/login', async (req,res) =>{

    let db = new sqlite3.Database('../Django/db.sqlite3', (err) =>{
        if(err){
            console.error(err.message)

        }
        else {
            db.get("SELECT * FROM korisnik_korisnik where email='"+ req.body.email+"'", (err, row) =>{
                if(err) {
                    console.error(err.message);

                    return res.status(500);

                } else if (row === undefined){
                    console.log("Nije pronasao nikog");

                    return res.status(203)
                }
                else{

                   // console.log("row je = " + row);


                    let sifra = row.password;
                    //console.log(sifra);

                    bcrypt.compare(req.body.password,sifra, function(err, resa) {
                        console.log("REZULATA COMAPRE  = " + resa)
                        if(resa){
                            console.log("///////////////////////////////")
                            console.log("Ne postoji sesija")

                            console.log("Pravim sesiju")
                            req.session.email = req.body.email;
                            console.log("Napravljena sesija valjda")
                            console.log("Refresovati stranicu za probu")
                            console.log("Ulogovan korisnik");
                            console.log("OVO JE SESSION.EMAIL = " + req.session.email);
                            db.close()
                            let id = row.id
                            console.log("///////////////////////////////")
                            return res.status(200).send({ulogovan:true, id:id});

                        }
                        else{

                            db.close()

                            console.log("los pass")
                            return res.status(203);


                        }
                    });


                }
            });


            console.log("Uspesno konektovano za bazu")

        }
    });

    db.close()


});

router.get('/session/getSession',async (req,res) => {

    console.error("provera sesija ovo je session.email = " + req.session.email)


    if(req.session.email) {
        console.log("postoji sesija");
        return res.status(200).send(true)

    }else {
        console.log("Ne postoji sesija");
        return res.status(203).send(false)
    }
});

router.get('/session/Session',async (req,res) => {

    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})

router.get('/session/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            return res.status(201)
        }
        else
            return res.status(200).redirect('/')
    });

});


//obrisi jednog
router.delete('/:id', async (req,res) => {
    let db = new sqlite3.Database('../Django/db.sqlite3', (err) =>{
        if(err){
            console.error(err.message)

        }
        else {
            db.run("DELETE * FROM korisnik_korisnik where id='"+ req.params.id+"'", (err, row) =>{

                if(err){
                    console.log("Error se desio")
                    res.status(500).send(true)
                }else{
                    console.log("Trebalo bi da se desilo brisanje");

                }


            })


            console.log("Uspesno konektovano za bazu")

        }
    })

    db.close()
});


//Obrisi sve ... Nemoj koristiti ovo
// router.delete('/', async (req,res) => {
//     try{
//         const korisnik = await korisnikModel.findOne().where('__v').equals(0);
//         if(korisnik == null){
//             res.status(200).json({message:'Nema trazenog korisnika'});
//         }
//         else{
//             korisnikModel.find(korisnik).remove();
//             korisnikModel.remove({__v:0}, function(err){
//                 if(err){
//                     res.status(500).send({message:err.message});
//
//                 }
//                 else{
//                     res.status(200).send("obrisan")
//                 }
//             });
//
//         }
//
//     }
//     catch(err){
//         res.status(500).json({message:err.message});
//     }
// });




module.exports = router;
