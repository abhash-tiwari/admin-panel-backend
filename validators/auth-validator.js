const {z} = require('zod')

//creating an object schema

const signUpSchema =z.object({
    username: z
    .string({required_error: "Name is Required"}).trim()
    .min(3, {message: "Name must be at least 3 chars"})
    .max(20,{message: "Name cannot be over 20 chars"}),
    email: z
    .string({required_error: "EMail is Required"}).trim()
    .email({message: "Invalid email"})
    .min(3, {message: "Name must be at least 3 chars"})
    .max(20,{message: "Name cannot be over 20 chars"}),
    phone: z
    .string({required_error: "Name is Required"}).trim()
    .min(10, {message: "Name must be at least 10 chars"})
    .max(20,{message: "Name cannot be over 20 chars"}),
    password: z
    .string({required_error: "Name is Required"})
    .min(7, {message: "Name must be at least 3 chars"})
    .max(200,{message: "Name cannot be over 20 chars"}),
}) 

const signInSchema = z.object({
    email: z
    .string({required_error: "EMail is Required"}).trim()
    .email({message: "Invalid email"})
    .min(3, {message: "Name must be at least 3 chars"})
    .max(20,{message: "Name cannot be over 20 chars"}),
    password: z
    .string({required_error: "Password is Required"})
    .min(7, {message: "Name must be at least 3 chars"})
    .max(200,{message: "Name cannot be over 20 chars"}),
}) 

module.exports = {signUpSchema, signInSchema}