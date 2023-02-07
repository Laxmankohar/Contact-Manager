const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")



// @desc Get all contacts
// @route Get/api/contacts
// @acess public

const getContacts = asyncHandler(async(req, res) =>{
    const contacts = await Contact.find();
    res.status(200).json(contacts)
})


// @desc Get particular contacts
// @route Get/api/contacts/id
// @acess public
const getContact = asyncHandler(async(req, res) =>{
    res.status(200).json({message:`Get contact for ${req.params.id}`})
})

// @desc Create contacts
// @route post/api/contacts
// @acess public
const createContact = asyncHandler(async(req, res) =>{
    console.log("The request body is: ",req.body);

    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandotry")
    }
    res.status(201).json({message:"Create a contact"})
})



// @desc update contacts
// @route put/api/contacts/id
// @acess public
const updateContact =asyncHandler(async (req, res)=>{
    res.status(200).json({message:` id ${req.params.id} is updated sucessfully`})
})

// @desc delete contacts
// @route DELETE/api/contacts/id
// @acess public
const deleteContact =asyncHandler(async(req, res) =>{
    res.status(200).json({message:` Id ${req.params.id} is deleted successfully`})
})

module.exports = {
    getContacts, getContact,createContact, updateContact, deleteContact

}