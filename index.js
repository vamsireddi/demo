const express = require("express");
const app = express();

app.use(express.json());


const FULL_NAME = "jahnavi";
const DOB = "24/09/2004"; 
const EMAIL = "jahnavi@gmail.com";
const ROLL_NUMBER = "126";


app.post("/bfhl", (req, res) => {
  try {
 
    const data = req.body && req.body.data ? req.body.data : [];

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sum = 0;
    let alphaConcat = "";

    data.forEach((item) => {
      if (/^\d+$/.test(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        
        alphabets.push(item.toUpperCase());
        alphaConcat += item;
      } else {

        specialChars.push(item);
      }
    });

    
    let reversed = alphaConcat.split("").reverse().join("");
    let altCaps = "";
    let upper = true;
    for (let c of reversed) {
      if (/[a-zA-Z]/.test(c)) {
        altCaps += upper ? c.toUpperCase() : c.toLowerCase();
        upper = !upper;
      } else {
        altCaps += c;
      }
    }

    res.json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: altCaps,
    });
  } catch (err) {
    res.json({ is_success: false, error: err.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
