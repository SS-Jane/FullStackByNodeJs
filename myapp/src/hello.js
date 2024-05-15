// const { useEffect, useState } = require("react");
import axios from "axios";
import "./hello.css"
import MyComponent from "./components/MyComponent"
const { useState } = require("react")
const dayjs = require("dayjs")

function Hello() {
    // const [product, setProduct] = useState(["SuperJane!!", "carol", "staberry", "coconut", "mango"]);
    // const [name, setName] = useState("");

    // const showName = () => {
    //     console.log(name);
    // }
//select option
    // const [value, setValue] = useState("100");
//checkbox
    // const [value, setValue] = useState();

// useEffect
    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     console.log("start page");
    // }, [items]);

    // const newItem = () => {
    //     setItems([1,3,5,7,9]);
    // }

// multi input
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");

    // const handleSignIn = () => {
    //     console.log(name, email);
    // 

// Input odject
    const [user, setUser] = useState({});

    const handleSignIn = () => {
        console.log(user);
    }
// numberFormat
    const [income, setIncome] = useState(10000);
//DateTimeFormat
    const [payDate, setPayDate] = useState(new Date());
// API axios GET method
    const getMethod = async () => {
        try {
            await axios.get('http://localhost:3001/book/orderBy');
        } catch (e) {
            console.log(e);
        }
    } 
// API axios POST method
    const postMethod = async () => {
        try {
            await axios.post('http://localhost:3001/book/search', {
                keyword: "J"
            });
        } catch (e) {
            console.log(e);
        }
    }
    return <>
        {/* {product.length > 0 ? <div>Have data!!</div> : <div>No data</div>} */}
        {/* {product.map(item =>
            <div>{item}</div>
        )} */}

        {/* <input onChange={e => setName(e.target.value)} />
        <button onClick={showName}>
            Show Name
        </button> */}
{/* select option */}
        {/* <select onChange={e => setValue(e.target.value)}>
            <option value="100">JAVA</option>
            <option value="200">PHP</option>
            <option value="300">Node.JS</option>
        </select>
        <div>{value}</div> */}
{/* checkbox */}
        {/* <input type="checkbox" onClick={e => setValue(e.target.checked)} /> Agree
        {value ? <div>checked</div> : <div>unchecked</div>} */}

        <div className="bg-danger text-white p-4 h4"><i className="fa fa-home"></i> Hello SuperJane by react</div>
        <MyComponent name="AAAAA" />
{/* Multi input */}
        <div className="container p-5">
            <div>
                <div>Name</div>
                <input className="form-control" onChange={e => setUser({ ...user, name: e.target.value })} />
            </div>
            <div className="mt-3">
                <div>Email</div>
                <input className="form-control" onChange={e => setUser({ ...user, email: e.target.value })} />
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSignIn}>
                <i className="fa fa-check me-2"></i>Sign In
            </button>
        </div>
{/* numberFormat */}
        <div>
            {income.toLocaleString("th-TH")}
        </div>
{/* DateTimeFormate */}
        <div>
            {dayjs(payDate).format("DD/MM/YYYYY")}
        </div>
{/* API axios GET Method */}
        <div>
            <button className="btn btn-primary" onClick={getMethod}>
                Call API GET Method
            </button>
        </div>
{/* API axios POST Method */}
        <div>
            <button className="btn btn-primary" onClick={postMethod}>
                Call API Post Method
            </button>
        </div>
    </>
}

export default Hello;