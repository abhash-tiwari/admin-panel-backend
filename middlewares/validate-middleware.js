
// its our middleware that checks the defined zod validations are matching with user entered fields or not basically matching 
const validate = (schema) => async (req, res, next) => {
 try {
    const parseBody = await schema.parseAsync(req.body)
    req.body = parseBody
    next()
 } catch (err) {
    console.log(err) // it will return errors array
    const message = err.errors[0].message
    res.status(400).json({msg: message})
 }
}

module.exports = validate