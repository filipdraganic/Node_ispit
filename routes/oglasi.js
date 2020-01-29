const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

//get all
router.get('/', async (req,res) => {

    console.log(req.session.email)

    console.log("POSTOJI SESIJA I ONA JE = " + req.session.email)
    try {
        let rovovi = []


        let db = new sqlite3.Database("../Django/db.sqlite3", (err) => {
            if (err) {
                console.error(err.message)
                db.close()

                return res.status(500).json({message: "Yikes"});

            } else
                console.log("Uspesno konektovano za bazu ORDER BY created_at DESC")

            db.all(`SELECT * FROM oglas_oglas ORDER BY datumPostavljanja DESC`, (err, row) => {
                if (err) {

                    console.error(err.message);
                    db.close()

                    return res.status(500).json({message: "Yikes"});

                } else{
                    console.log("saljem rovove svega")
                    db.close()

                    return res.status(200).json(row)

                }
            });


        })

    } catch (err) {

        return res.status(500).json({message: "Yikes"});

    }




});

//get one
router.get('/:id', async (req,res)=>{
    try{

        let db = new sqlite3.Database("../Django/db.sqlite3", (err) =>{
            if(err){
                console.error(err.message)
            }
            else
                console.log("Uspesno konektovano za bazu")
            let rovovi = []

            db.get(`SELECT * FROM oglas_oglas WHERE id= '`+ req.params.id+"'", (err, row) => {
                if (err) {

                    console.error(err.message);
                }
                console.log(row.id + "\t" + row.ime);

                res.status(200).json(row)

            });


            db.close()
        })

    }
    catch(err){
        res.status(500).json({message:err.message});
    }

});


//napravi novog
router.post('/',async(req,res) =>{
    // const oglas = new oglasModel({
    //     ime: req.body.ime,
    //     slika: req.body.slika,
    //     preostaloVreme: req.body.preostaloVreme,
    //     cena: req.body.cena,
    //     prodavac: req.body.prodavac,
    //     idProdavca: req.body.idProdavca,
    //     opis: req.body.opis,
    //     kategorija: req.body.kategorija,
    // });
    let sess = req.session;
    if(sess.email) {
        try {

            let db = new sqlite3.Database("../Django/db.sqlite3", (err) => {
                if (err) {
                    console.error(err.message)
                    db.close()
                    return res.status(404)
                } else{
                    console.log("Uspesno konektovano za bazu")
                    let rovovi = []

                    db.run('INSERT INTO oglas_oglas(cena, ime, brojPregleda, kategorija, datumPostavljanja, prodavac_id, preostaloVreme, opis) VALUES(?,?,?,?,?,?,?,?)',
                        req.body.cena, req.body.ime, 0, req.body.kategorija, Date.now(), req.body.idProdavca, req.body.preostaloVreme, req.body.opis, (err) => {
                            if (err) {

                                console.error(err.message);
                            }
                            db.close()
                            return res.status(200).send("Uspeh")


                        });



                }
            })
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
    else{
        return res.status(404)
    }
});

//updateuj jednog
router.patch('/:id', async (req,res) => {


    let id = req.params.id;
    let cena = req.body.cena;

    let sess = req.session;
        try {

            let db = new sqlite3.Database("../Django/db.sqlite3", (err) => {
                if (err) {
                    console.error(err.message)
                } else
                    console.log("Uspesno konektovano za bazu")

                if (req.body.poruka === "brojpregleda") {

                    db.run("UPDATE oglas_oglas SET brojPregleda = brojPregleda + 1 WHERE id = '" + id + "'", (err) => {
                        if (err) {

                            console.error(err.message);
                        }
                        else
                            return res.status(200).send("Uspeh")


                    });

                } else if (req.body.poruka === "licitacija") {
                    if(sess.email) {

                        let licitacija = req.body.licitacija;
                        console.log("id = " + id + " cena = " + cena);

                        db.run("UPDATE oglas_licitacija SET cena = ' + cena + ' WHERE id = '" + id + "'", (err) => {
                            if (err) {

                                console.error(err.message);
                            }
                            else
                                return res.status(200).send("Uspeh")


                        });
                    }
                }

                db.close()
            })

        } catch (err) {
            res.status(500).json({message: err.message});
        }

});


//obrisi jednog
router.delete('/:id', async (req,res) => {
    let id = req.params.id;

    let sess = req.session;
    if(sess.email) {
        try {

            let db = new sqlite3.Database("../Django/db.sqlite3", (err) => {
                if (err) {
                    console.error(err.message)
                } else
                    console.log("Uspesno konektovano za bazu")
                let rovovi = []

                db.run('DELETE * FROM oglas_oglas WHERE id = ' + id, (err) => {
                    if (err) {

                        console.error(err.message);
                    }

                    res.status(200).send("Uspeh")


                });


                db.close()
            })

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

});
// router.delete('/', async (req,res) => {
//     try{
//
//
//             oglasModel.remove({__v:0}, function(err){
//                 if(err){
//                     res.status(500).send({message:err.message});
//
//                 }
//                 else{
//                     res.status(200).send("obrisan")
//                 }
//             });
//
//
//     }
//     catch(err){
//         res.status(500).json({message:err.message});
//     }
//
//
// });




module.exports = router;
