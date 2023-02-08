const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route Get/api/contacts
// @acess private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

// @desc Get particular contacts
// @route Get/api/contacts/id
// @acess private
const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if(!contact){   // if id not found throw an error
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc Create contacts
// @route post/api/contacts
// @acess private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandotry");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id  
  })


  res.status(201).json(contact);
});

// @desc update contacts
// @route put/api/contacts/id
// @acess private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id ){
      res.status(403);
      throw new Error("User donot have permission to create other user contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

  res
    .status(200)
    .json(updatedContact);
});

// @desc delete contacts
// @route DELETE/api/contacts/id
// @acess private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)

    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id ){
      res.status(403);
      throw new Error("User donot have permission to create other user contacts")
    }

    await Contact.deleteOne({_id:req.params.id});
  res
    .status(200)
    .json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
