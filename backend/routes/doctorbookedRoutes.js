const express = require("express");
const router = express.Router();
const doctorbookedSchema = require("../models/doctorbooked");

router.post("/doctorbooked", (req, res, next) => {
    doctorbookedSchema.create(req.body).then(result => {
      res.json(result)
  }) .catch(
    err => {
        return next(err)
    }
)
});

router.get("/",(req,res,next) =>{
    doctorbookedSchema.find().then((data) =>{
        return res.json(data)
    }).catch((err) =>{
        return next(err)
    })

})

router.delete("/delete-doctorbooked/:id",async (req, res, next) => {
    const doctorBookedId = req.params.id;
    try {
        const deletedDoctorBooked = await doctorbookedSchema.findByIdAndDelete(doctorBookedId);
        if (!deletedDoctorBooked) {
          return res.status(404).json({ message: 'DoctorBooked not found' });
        }
        res.status(204).end(); // No content for successful deletion
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
  });


  router.put('/update-doctorbooked/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    console.log(id)
    doctorbookedSchema.findByIdAndUpdate(id, update)
      .then(result => {
        if (!result) {
          return res.status(404).json({ error: 'Document not found' });
        }
        res.status(204).send();
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      });
  });

module.exports = router
