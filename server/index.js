const express = require('express');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
require('dotenv').config({ override: true });


const jwtkey = process.env.SECRET_KEY;

require('./db');  // IMPORTANT: connect to MongoDB once

const User = require('./users');
const Product = require('./product');

const app = express();

app.use(cors());
app.use(express.json());

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    let newUser = new User({ email, firstname, lastname, password });
    await newUser.save();

    newUser = newUser.toObject();
    delete newUser.password;

    Jwt.sign({ newUser }, jwtkey, { expiresIn: "1hr" }, (err, token) => {
      res.send({ newUser, auth: token });
    });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      const user = await User.findOne(req.body).select("-password");
      if (user) {
        Jwt.sign({ user }, jwtkey, { expiresIn: "1hr" }, (err, token) => {
          res.send({ user, auth: token });
        });
      } else {
        res.send({ result: "No User Found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
});

// ADD PRODUCT
app.post('/AddProduct', verifyToken, async (req, resp) => {
  try {
    let newProduct = new Product(req.body);
    await newProduct.save();
    resp.json(newProduct);
  } catch (err) {
    console.log(err);
  }
});

// GET PRODUCTS
app.get('/products', verifyToken, async (req, resp) => {
  const products = await Product.find();
  if (products.length === 0) {
    resp.send("No Product Found");
  } else {
    resp.send(products);
  }
});

// DELETE PRODUCT
app.delete('/products/:id', verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// GET SINGLE PRODUCT
app.get('/product/:id', verifyToken, async (req, resp) => {
  const result = await Product.findOne({ _id: req.params.id });
  resp.send(result || { result: "No Record Found" });
});

// UPDATE PRODUCT
app.put('/product/:id', verifyToken, async (req, resp) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

// SEARCH
app.get('/search/:key', verifyToken, async (req, resp) => {
  const result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } }
    ]
  });
  resp.send(result);
});

// TOKEN MIDDLEWARE
function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtkey, (err) => {
      if (err) {
        res.send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.send({ result: "please add token with header" });
  }
}

app.listen(5000, () => console.log(`Server running on port 5000`));
