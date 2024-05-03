const express = require("express");
const {users} = require("./data/users.json");

const dotenv = require('dotenv');
const DbConnection = require("./databaseConnection");

const userRouter = require("./routes/users")
const booksRouter = require("./routes/books");

dotenv.config();

const bookManSys = express();

DbConnection();

const PORT = 8082;

bookManSys.use(express.json());

bookManSys.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running"
  });
});

bookManSys.use("/users", userRouter)
bookManSys.use("/books", booksRouter)

bookManSys.get("/users", (req,res)=>{
    res.status(200).json({
        success: true,
        data: users
    });
});

bookManSys.get(`/users/:id`, (req, res)=>{
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }
    return res.status(200).json({
        success: true,
        data: user
    });
});

bookManSys.post('/users', (req, res)=>{
    const {id, name, surname, email, subcriptionType, subscriptionDate} = req.body;
    
    const user = users.find((each) => each.id === id);

    if(user){
        return res.status(404).json({
            success: false,
            message: "User with the given id exists"
        })
    }
    users.push({
        id, name, surname, email, subcriptionType, subscriptionDate
    })
    return res.status(201).json({
        success: true,
        data: users
    })

})

bookManSys.put(`/users/:id`, (req,res)=> {
    const {id} = req.params;
    const {data} = req.body;

    const user = users.find((each) => each.id === id);

    if(!user)
    return res.status(404).json({
        success: false,
        message: "User with given id does not exits"})

    const updatedUser = users.map((each)=>{
        if(each.id === id){
            return {...each,
                ...data}}
            return each;
        });
        return res.status(200).json({
            success:true,
            data: updatedUser
        });
    });    


bookManSys.delete('/users/:id',(req, res)=>{
    const {id} = req.params;
    const user = users.find((each) => each.id === id);

    if (!user)
    return res.status(404).json({
success: false,
message: "User with given id does not exist" })

const index = users.indexOf(user);
users.splice(index, 1);

return res.status(200).json({success: true, data: users})
});

 


bookManSys.get("*", (req, res) => {
  res.status(200).json({
    message: "This route does not exist"
  });
});

bookManSys.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
