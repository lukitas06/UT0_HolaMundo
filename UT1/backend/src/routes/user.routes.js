const {Router} = require("express");

const router = Router();

// ===== HTTP =====//
router.get("/:name/:id", (req,res) => { 
    const {name,id} = req.params;
    res.send(`${name}: ${id}`);
});

router.post("/", (req,res) => { 
    res.send("Peticion POST");
});

router.put ("/", (req,res) => { 
    res.send("Peticion PUT");
});

router.delete("/", (req,res) => { 
    res.send("Peticion DELETE");
});

module.exports = router;