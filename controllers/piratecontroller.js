//import the Mongo db models
const error = require('mongoose/lib/error');
let Pirate = require('../models/pirate')


//method for creating pirate
let createPirate = (req,res)=>{

    const body = req.body;
    if(!body){
        res.status(400).json({
            success:false,
            message: 'the body is empty'
        })
    }
   pirate = new Pirate(body)

   if(!pirate){
      res.status(400).json({
        success: false,
        message: 'no pirate'
      })
   }

   pirate.save().then(()=>{
    return res.status(201).json({
        success: true,
        id: pirate.id,
        message:'pirate created'
    })
 
   }).catch(error=>{
     return res.status(400).json({
        success: false,
        message: error.message
     })
     
   })

}

//method for retrieving pirate
let getOnePirate = async (req,res)=>{
    await Pirate.findOne({_id: req.params.id},(err, pirate)=>{
      if(err){
        return res.status(400).json({
          success:false,
          err: error
        })
      }
      if(!pirate){
        return res.status(400).json({
          success:false,
          message: 'pirate not found'
        })
      }
      return res.status(200).json({success: true, data: pirate })

    }).catch(error=>{
       return res.status(400).json({
         success: false,
         message: 'error in fishing pirate :('
       })
    })


}

//method for updating pirate
let updatePirate = async (req, res) => {
  const body = req.body

  console.log(body)

  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a body to update',
      })
  }

  Pirate.findOne({ _id: req.params.id }, (err, pirate) => {
      if (err) {
          return res.status(404).json({
              err,
              message: 'pirate not found!',
          })
      }
     
      pirate.pirate_name = body.pirate_name
      pirate.pirate_position = body.pirate_position
      pirate.pirate_image = body.pirate_image
      pirate.pirate_attributes = body.pirate_attributes
      pirate.pirate_catch_phrase = body.pirate_catch_phrase
      
      pirate
          .save()
          .then(() => {
            console.log("updated")
              return res.status(200).json({
                  success: true,
                  id: pirate._id,
                  message: 'pirate updated!',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  error,
                  message: 'pirate not updated!',
              })
          })
  })
}

//method for deleting pirate
let deletePirate = async (req, res) => {
   await Pirate.findOneAndDelete({ _id: req.params.id }, (err, pirate) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!pirate) {
          return res
              .status(404)
              .json({ success: false, error: 'pirate not found'})
      }

      return res.status(200).json({ success: true, data: pirate, message:'pirate deleted' })
  }).catch(err => console.log(err))

}
//method for retrieving all the pirates
let getPirates = async(req,res) => {
  await Pirate.find({},(error, pirates)=>{
    if (error) {
      return res.status(400).json({ success: false, error: err })
  }
  if (!pirates.length) {
      return res
          .status(404)
          .json({ success: false, error: 'pirate'})
  }
  return res.status(200).json({ success: true, data: pirates })
}).catch(err => console.log(err))
}

///check captain existence - for the frontend dropdown
let captainExistence =async(req,res) => {
  console.log(req.body)

  await Pirate.find({ pirate_position: req.body.position  },(error, pirates)=>{
    if (error) {
      return res.status(400).json({ success: false, error: err })
  }
  if (!pirates.length) {
    return res.status(200).json({ success: true, data: pirates })
  }
  return res.status(200).json({ success: true, data: pirates })
}).catch(err => console.log(err))
}

//exporting the methods
module.exports ={createPirate,getOnePirate,updatePirate,deletePirate,getPirates,captainExistence}