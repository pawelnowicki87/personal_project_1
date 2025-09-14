import express from "express";
import jwt from 'jsonwebtoken';
const app = express()
const port = 3000
const secret = "labaSecretCode";

app.use(express.json());

function signToken(id) {
    const token = jwt.sign({ id }, secret);
    
    return token;
};

function veryfyToken(token) {
    try {
        const actualToken = token.split(" ")[1];
        const decodedToken = jwt.verify(actualToken, secret)
        
        return  decodedToken.id;
    }
    catch {
        console.log('Opps, token cannot be verify');
    }
};

app.post('/auth', (req, res) => {
    if(!req.body.id) return res.status(401).json({ message: "unauthoried"});
    const id = req.body.id;
    const token = signToken(id);

    res.status(200).json({ token })
})

app.get('/', (req, res) => {
    const token = req.headers.authorization;

    if (!token) { 
        return res.status(401).json({message: "invalid token"})
    }

    let id;

    try {
        id = veryfyToken(token)
    }
    catch {
        return res.status(401).json({message: "invalid token from catch '/'"})
    }

    if (id !== 20) return res.status(401).json({message: "id from token is invalid "})


  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`The app is listening on port: ${port}`)
})