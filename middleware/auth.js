//imports
const jwt = require('jsonwebtoken');

//the authentication middleware
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.JWT_SECRET)

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub
        }

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Unauthorized: Token invalid or expired" });
    }
}

module.exports = auth;