const express = require ("express");
const {users} = require("../data/users.json");
const { getAllUsers, getUserById, CreateNewUser, UpdateUserById, deleteUser } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", CreateNewUser);

router.put("/:id", UpdateUserById);

router.delete("/:id", deleteUser);



module.exports = router