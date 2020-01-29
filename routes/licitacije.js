const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

//get all
router.get('/', async (req,res) => {
    try{

        let db = new sqlite3.Database("../Django/db.sqlite3", (err) =>{
            if(err){
                console.error(err.message)
            }
            else
                console.log("Uspesno konektovano za bazu")
            let rovovi = []
            db.serialize(() => {
                db.each(`SELECT * FROM oglas_licitacija`, (err, row) => {
                    if (err) {

                        console.error(err.message);
                    }
                    console.log(row.id + "\t" + row.ime);


                });
            });
            res.status(200).json({message:rovovi})

            db.close()
        })

    }catch(err) {
        res.status(500).json({message:"Yikes"});

    }


});

//get one
router.get('/:id',async (req,res)=>{
    try{

        let db = new sqlite3.Database("../Django/db.sqlite3", (err) =>{
            if(err){
                console.error(err.message)
            }
            else
                console.log("Uspesno konektovano za bazu")
            let rovovi = []

                db.get(`SELECT * FROM oglas_licitacija WHERE id= '`+ req.params.id+"'", (err, row) => {
                    if (err) {

                        console.error(err.message);
                    }
                    console.log(row.id + "\t" + row.ime);

                    res.status(200).json(row)

                });


            db.close()
        })

    }catch(err) {
        res.status(500).json({message:"Yikes"});

    }


});

//napravi novog
router.post('/',async(req,res) =>{

        try {

            let db = new sqlite3.Database("../Django/db.sqlite3", (err) => {
                if (err) {
                    console.error(err.message)
                    db.close()
                    return res.status(404)
                } else{
                    console.log("Uspesno konektovano za bazu")

                    db.run('INSERT INTO oglas_licitacija(vremeLicitacije, cena, licitacionar_id, oglas_id) VALUES(?,?,?,?)',
                        Date.now(), req.body.cena,1,req.body.oglasID, (err) => {
                            if (err) {

                                console.error(err.message);
                            }
                            else{
                                db.run("UPDATE oglas_oglas SET cena = ' "+ req.body.cena + "' WHERE id = '" + req.body.oglasID  +"'", (err) => {
                                    if (err) {

                                        console.error(err.message);
                                    }else{

                                        db.close();
                                        return res.status(200).send(true)

                                    }

                                });
                            }

                        });



                }
            })
        } catch (err) {

            return res.status(500).json({message: err.message});
        }

});

//updateuj jednog
router.patch('/:id', (req,res) => {


});


//obrisi jednog
router.delete('/:id', (req,res) => {

});




module.exports = router;
