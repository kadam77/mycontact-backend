const express = require('express');
const {getContacts,getContact,
updateContact,deleteContact,
createContact} = require('../controllers/contactcontrollers');
const vaildateToken = require('../middleware/validationTokenHandler');


const router = express.Router();

router.use(vaildateToken);
router.route('/').get(getContacts).post(createContact);

router.route('/:id').put(updateContact).delete(deleteContact).get(getContact);




module.exports = router;