const {Router} = require("express");

const router = Router();

const {
    createUser,
    readUser,
    updateUser,
    deleteUser,
} = require('../controllers/user.controller');

// ===== HTTP =====//
router.get("/:id", readUser);

router.post("/", createUser);

router.put ("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;