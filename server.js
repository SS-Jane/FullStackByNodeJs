//use watch for re-compile
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//API add data to table
const { PrismaClient } = require ("@prisma/client");
// const { log, error } = require("console");

const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

console.log("Server runing");

app.get("/", (req, res) => {
    res.send("Hello by express\n");
});

app.get("/hello/:name/:age", (req, res) =>{
    const name = req.params.name;
    const age = req.params.age;

    // res.send("Hello Mr." + name + " age = " + age);
    res.send(`name = ${name} age = ${age}`);
});

app.post("/hello", (req, res) => {
    res.send(req.body);
});

app.put("/myPut", (req, res) => {
    res.send(req.body);
});

app.put("/updateCustomer/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;

    // res.send(`id = ${id} data = ${data}`);
    res.send({ id: id, data: data });
});

app.delete("/myDelete/:id", (req, res) => {
    const id = req.params.id;
    res.send(`id = ${id}`);
});

app.get("/book/list", async (req, res) => {
    const data = await prisma.book.findMany();
    res.send({ data: data});
});

app.post("/book/create", async (req, res) => {
    const data = req.body;
    const result = await prisma.book.create({ data : data });
   

    res.send({ result: result });
});

app.post("/book/createManual", async (req, res) => {
    const result = await prisma.book.create({ 
        data : {
            isbn : "3333",
            name : "BBB",
            price : 3000
            }
        });
   

    res.send({ result: result });
});

app.put("/book/update/:id", async (req, res) => {
    try {
        await prisma.book.update({
            data: {
                isbn : "50550",
                name : "Jane5 update",
                price : 95599
            },
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send({ meessage: "success"})
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.delete("/book/remove/:id", async (req, res) => {
    try {
        await prisma.book.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        res.send({ message: "success"})
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})


app.post("/book/search", async (req, res) => {
    try {
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where: {
                name: {
                    contains : keyword
                }
            }
        })

        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.post("/book/startsWith", async (req, res) => {
    try {
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where: {
                name: {
                    startsWith: keyword
                }
            }
        })
        res.send({ results: data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.post("/book/endsWith", async (req, res) => {
    try {
        const keyword = req.body.keyword;
        const data = await prisma.book.findMany({
            where: {
                name: {
                    endsWith: keyword
                }
            }
        })
        res.send({ results: data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/orderBy", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            orderBy: {
                price: "desc"
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})
// find more then == gt
app.get("/book/gt", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                price: {
                    gt: 2000 // price > gt
                }
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})
// find less than == lt
app.get("/book/lt", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                price : {
                    lt : 5000 // price < 5000
                }
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/notNull", async (req, res) =>{
    try {
        const data = await prisma.book.findMany({
            where: {
                detail: {
                    not : null
                }
            }
        })
        res.send({ resulits : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/isNull", async (req, res) =>{
    try {
        const data = await prisma.book.findMany({
            where: {
                detail: null
            }
        })
        res.send({ resulits : data })
    } catch (e) {
        console.log(e);
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/between", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                price: {
                    gte : 900 //price >= 900
                },
                price: {
                    lte : 5000 // <= 5000
                },
            },
            orderBy: {
                price: "asc"
            }
        })
        res.send({ results : data })
    } catch (e) {
        console.log(e);
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/sum", async (req, res) => {
    try {
        const data = await prisma.book.aggregate({
            _sum: {
                price: true
            }
        })
        res.send({ results : data})
    } catch (e) {
        res.status(500).send({ error : e.message})
    }
})


// return await prisma.journalTransactions.findMany({
//     where: {
//         date: {
//             lte : new Date("2022-01-30"),
//             gel : new Date("2022-01-15"),
//         },
//     },
// });

app.listen(3001);