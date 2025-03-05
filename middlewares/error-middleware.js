// so phle jaha bbi error me res.status direct send krre the ab vha next(error) call krege tb vo yha aayega or ab hum yha se errors handle krege



const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Backend Error"
  const extraDetails = err.extraDetails || "Error from BAckend"


  return res.status(status).json({message, extraDetails})
}

module.exports = errorMiddleware