const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *    - welcome
 *    summary: welcoming a user
 *    description: A welcome message desplayed
 *    responses:
 *      '200':
 *        description: A welcome message desplayed succesffuly.
 *       
*/

router.get('/',(req,res)=>{
    res.json({"message":"welcome"})
})

module.exports = router;