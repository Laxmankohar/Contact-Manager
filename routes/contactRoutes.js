const express = require("express")
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// get all the contacts
// router.route("/").get(getContacts)

// get a specific contact

// router.route("/:id").get(getContact)

// create a contact using post

// router.route("/").post(createContact)

// update a contact

// router.route("/:id").put(updateContact)

// delete a contact

// router.route("/:id").delete(deleteContact)




// Above code can be written in two lines as get all contact and create contact  all are on  same route  so we can combine it in one line

router.use(validateToken)
router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)



module.exports = router 