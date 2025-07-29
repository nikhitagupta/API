const express = require('express');
const bodyParser = require('body-parser');
const serverless = require("serverless-http");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/',(req, res) =>{
    return res.status(200).json({ is_success: true, message: "Invalid input. Expected array." });
})
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input. Expected array." });
        }
        const full_name = 'nikhita_gupta';
        const dob = '13032004';

        const response = {
            is_success: true,
            user_id: `${full_name}_${dob}`,
            email: 'nikhita613.be22@chitkara.edu.in',
            roll_number: '2210990613',
            odd_numbers: [],
            even_numbers: [],
            alphabets: [],
            special_characters: [],
            sum: "0",
            concat_string: ""
        };

        let alphaConcat = '';
        let sum = 0;

        data.forEach(item => {
            const str = item.toString();

            if (/^[a-zA-Z]+$/.test(str)) {
                response.alphabets.push(str.toUpperCase());
                alphaConcat += str;
            } else if (/^\d+$/.test(str)) {
                const num = parseInt(str);
                sum += num;
                if (num % 2 === 0) {
                    response.even_numbers.push(str);
                } else {
                    response.odd_numbers.push(str);
                }
            } else {
                response.special_characters.push(str);
            }
        });

        response.sum = sum.toString();

        // Alternating caps reverse
        const reversed = alphaConcat.split('').reverse();
        response.concat_string = reversed.map((char, index) =>
            index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        ).join('');

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ is_success: false, error: error.message });
    }
});
module.exports = app;
module.exports.handler = serverless(app);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
