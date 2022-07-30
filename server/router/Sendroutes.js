const express = require('express');
const router = express.Router();




var Sendmsg_C = require('../controller/Sendmsg_C');



// router.get('/test', (req, res) => res.send('book route testing!'));


router.post('/sendsingleemailtocust',Sendmsg_C.sendsingleemailtocust);
router.post('/sendemailtoMulcust',Sendmsg_C.sendemailtoMulcust);
router.post('/sendinsert',Sendmsg_C.sendinsert);
router.post('/sendremainingmail',Sendmsg_C.sendremainingmail);



module.exports = router;