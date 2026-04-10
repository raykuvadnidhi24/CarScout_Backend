const router = require("express").Router();
const contactController = require("../controller/ContactController");

// 👉 Send message
router.post("/contact", contactController.createContact);

// 👉 Get all messages (optional admin)
router.get("/contacts", contactController.getContacts);

module.exports = router;