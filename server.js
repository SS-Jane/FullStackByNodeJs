//use watch for re-compile
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//API add data to table
const { PrismaClient } = require ("@prisma/client");
// const { log, error } = require("console");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//Enable CORS : npm i cors
const cors = require('cors');
app.use(cors());

    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//middle ware
function checkSignIn(req, res, next) {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = req.headers["authorization"];
        const result = jwt.verify(token, secret);

        if (result != undefined) {
            next();
        }
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
}

const bookController = require("./controllers/BookController");
app.use("/book", bookController);

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.get("/user/info", checkSignIn, (req, res, next) => {
    try {
        res.send("hello back office user info");
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})



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

app.post("/book/createManual/:id", async (req, res) => {
    const result = await prisma.book.create({ 
        data : {
            // isbn : "3333",
            // name : "BBB",
            // price : 3000
            }
        });
   

    res.send({ result: result });
});

app.put("/book/update/:id", async (req, res) => {
    try {
        const data = req.body;
        const result = await prisma.book.update({
            data : {
                date : new Date(data.Date)
            },
            where: {
                id: parseInt(req.params.id) 
            },
        })
        res.send({ meessage: "success" })
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

app.put("/book/updateManual/:id", async (req, res) => {
    try {
        await prisma.book.update({
            data: {
                isbn : "66666",
                name : "Jane10 update",
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

app.delete("/orderDetail/remove/:id", async (req, res) => {
    try {
        await prisma.orderDetail.delete({
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

app.get("/book/max", async (req,res) => {
    try {
        const data = await prisma.book.aggregate({
            _max: {
                price: true
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/min", async (req,res) => {
    try {
        const data = await prisma.book.aggregate({
            _min: {
                price: true
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/avg", async (req,res) => {
    try {
        const data = await prisma.book.aggregate({
            _avg: {
                price: true
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/findYearMonthDay", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                registerDate: new Date("2024-05-09")
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/book/findYearMonth", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            where: {
                registerDate: {
                    gte: new Date("2024-05-05"),
                    lte: new Date("2024-05-11")
                }
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/user/createToken", (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const payload = {
            id: 100,
            name: "SuperJane",
            level: "admin"
        }
        const token = jwt.sign(payload, secret, { expiresIn : "1d" });

        res.send({ token : token });
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/user/verifyToken", (req, res) => {
    try {
        const secret = process.env.TOKEN_SECRET;
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAwLCJuYW1lIjoiU3VwZXJKYW5lIiwibGV2ZWwiOiJhZG1pbiIsImlhdCI6MTcxNjAwMzYwMywiZXhwIjoxNzE2MDkwMDAzfQ.RUcH8WzLGzGr1hMnQtpqeCFtuzpoPLutYlzrMok3rFU";
        const result = jwt.verify(token, secret);

        res.send({ result : result });
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/oneToOne", async (req, res) => {
    try {
        const data = await prisma.orderDetail.findMany({
            include : {
                book : true
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/oneToMany", async (req, res) => {
    try {
        const data = await prisma.book.findMany({
            include : {
                OrderDetail : true
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/multiModel", async (req, res) => {
    try {
        const data = await prisma.customer.findMany({
            include: {
                Order : {
                    include : {
                        OrderDetail : true
                    }
                }
            }
        })
        res.send({ results : data })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.post("/book/testUpload", (req, res) => {
    try {
        const myFile = req.files.myFile;

        myFile.mv("./uploads/" + myFile.name, (err) => {
            if (err) {
                res.status(500).send({ error : err })
            }
            res.send({ message : "success" })
        })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.use("/uploads", express.static("uploads"));

app.get("/readFile", (req, res) => {
    try {
        const fs = require("fs");
        fs.readFile("testRead.txt", (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data)
        })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/writeFile", (req, res) => {
    try {
        const fs = require("fs");
        fs.writeFile("testRead.txt", "hello test write", (err) => {
            if (err) {
                throw err;
            }
        })
        res.send({ message : "success" })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/removeFile", (req, res) => {
    try {
        const fs = require("fs");
        fs.unlinkSync("testRead.txt");
        res.send({ message : "success" })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/fileExists", (req, res) => {
    try {
        const fs = require("fs");
        const found = fs.existsSync("package.json");

        res.send({ found : found })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/createPdf", (req, res) => {
    try {
        const PDFDocument = require("pdfkit");
        const fs = require("fs");
        const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream("testPDFKit.pdf"));

        doc
            .font("./Kanit/Kanit-Medium.ttf")
            .fontSize(25)
            .text("Some text with an embedded font!", 100, 100);
        doc     
            .addPage()
            .fontSize(25)
            .text("Here is some vector graphics...", 100, 100);
        doc     
            .addPage()
            .fontSize(25)
            .text("ธ้ฟไำำหรื ฆฟืเยพฟหระ", 100, 100);
        
        doc.end();
        
        res.send({ message : "success" })
    } catch (e) {
        res.status(500).send({ error : e.message })
    }
})

app.get("/readExcel", async (req, res) => {
    try {
        const excel = require("exceljs");
        const wb = new excel.Workbook();
        await wb.xlsx.readFile("productExport.xlsx");
        const ws = wb.getWorksheet(1);

        for (let i = 1; i < ws.rowCount; i++) {
            const row = ws.getRow(i);
            const barcode = row.getCell(1).value;
            const name = row.getCell(2).value;
            const cost = row.getCell(3).value;
            const sale = row.getCell(4).value;
            const send = row.getCell(5).value;
            const unit = row.getCell(6).value;
            const point = row.getCell(7).value;
            const productTypeId = row.getCell(8).value;

            console.log(barcode, name, cost, sale, send, unit, point, productTypeId);
        }
        res.send({ message : "success" })
    } catch (e) {
        res.status(500).send({ error : e.message })
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