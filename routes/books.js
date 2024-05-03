const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { route } = require("./books");

const { UserModel, BookModel } = require("../models");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, updateBookById, addNewBook } = require("../controllers/book-controller");

const router = express.Router();

//router.get("/", (req, res) => {
//  res.status(200).json({ success: true, data: books });
//});

router.get("/", getAllBooks)

router.get("/:id",getSingleBookById)

router.get("/issued/by-user", getAllIssuedBooks);

router.post('/', addNewBook);

router.put("/:id", updateBookById );


router.get('/subscription-details/:id', (req, res)=>{
    const {id} = req.params;
    const user = users.find((each)=> each.id === id);

    if(!user)
    return res.status(404).json({
success: false,
message: "user not found"})

const getDateInDays = (data = "") => {
    let date;
    if(data === ""){
        date = new Date();
    }else{
        date = new Date(data)
    }
    let days = Math.floor(data / (1000 * 60 * 60 * 24));
    return days

};
const subscriptionType = (data) => {
    if(user.subscriptionType === "Basic"){
        date = date + 90;
    }else if(user.subscriptionType === "Standard"){
        date = date + 180;
    }else if(user.subscriptionType === "Premium"){
        date = date + 365;
    }
    return date;
};

let returnDate = getDateInDays(user.returnDate);
let current = getDateInDays();
let subscriptionDate = getDateInDays(user.subscriptionDate);
let subscriptionExpiration = subcriptionType(subscriptionDate);

const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
    fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
}

return res.status(200).json({
    success: true,
    message: data
})
})

module.exports = router;
