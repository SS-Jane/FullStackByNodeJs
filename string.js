let str = "Java Script Language";
console.log(str);
console.log(str.length);

str = str.replace("Java", "PHP");  //แทนที่ Java-->PHP
console.log(str);

str = str.concat(" 2024");  //เพิ่มข้อความ
str += " 2025";  //เพิ่มข้อความ
console.log(str);
console.log(str.indexOf("Script"));
console.log(str.lastIndexOf("2024"));