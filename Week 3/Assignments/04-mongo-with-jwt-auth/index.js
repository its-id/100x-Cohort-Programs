const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");

const PORT = 3000;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

//using a global catch all middleware to handle errors
app.use((err, req, res, next) => {
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
