//ส่วนที่ตาดว้าจะมี error
try {
    let i = 10;
    console.log(i / 0);
} catch (e) { //error แล้วทำอะไร 
    console.log(e); //e = error
}