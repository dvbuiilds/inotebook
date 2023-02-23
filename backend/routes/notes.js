const express = require("express");
const router = express.Router();

router.get('/', (req, res)=>{
    // obj = {
    //     name: "Hello",
    //     age: 55
    // };
    res.json([]);
});

module.exports = router;