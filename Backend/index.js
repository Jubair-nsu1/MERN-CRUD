const express = require('express');
const app = express()
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())


const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(403).send({ error: true, message: 'unauthorization author' })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorization err' })
        }
        req.decoded = decoded
        next()
    });

}


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9xgdj4e.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("crudDB");
        const productsCollection = database.collection("products");


        // JWT
        app.post('/jwt', (req, res) => {
            const user = req.body
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
                expiresIn: '1hr'
            })

            res.send({ token })

        })

        //Add a Product
        app.post('/add-product', verifyJWT, async (req, res) => {
            const product = req.body
            console.log(product)
            const result = await productsCollection.insertOne(product)
            res.send(result)

        })

        app.get('/all-products/:email', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email 
            const email = req.params.email
            if (email !== decodedEmail) {
                return res.status(401).send({ error: true, message: 'unauthorization email' })

              }
            const query = { email: email }
            const result = await productsCollection.find(query).sort({ date: -1 }).toArray()
            res.send(result)

        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await productsCollection.findOne(filter)
            res.send(result)

        })

        //Update a specific product
        app.patch('/update/:id',verifyJWT , async (req, res) => {
            const id = req.params.id
            const updatedProduct = req.body
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    product_name: updatedProduct.product_name,
                    category: updatedProduct.category,
                    price: updatedProduct.price,
                    available_since: updatedProduct.available_since,
                    status: updatedProduct.status,
                    date: updatedProduct.date
                }
            }
            const result = await productsCollection.updateOne(filter, updatedDoc)
            res.send(result)
        })

        //Delete a specific product
        app.delete('/product/delete/:id', verifyJWT, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.deleteOne(query)
            res.send(result)
        })

        //Delete All Products
        app.delete('/select-product/delete', async (req, res) => {
            const selectedProducts = req.body
            console.log(selectedProducts)
            const query = { _id: { $in: selectedProducts.map(id => new ObjectId(id)) } }
            // console.log(query)
            const result = await productsCollection.deleteMany(query)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('this server name is Blitz Camp')
})

app.listen(port, () => {
    console.log(`this Server Running On ${port}`)
})

