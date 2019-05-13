var jwt = require('jsonwebtoken');
var config = require("./config");

exports.VERIFYAUTH = function(req,res,next){
   
    if(!req.headers.authorization)
        return res.status(403).json({ 
                success: false, 
                code : 'MISSING_AUTHORIZATION_HEADER',
                message: 'Le header \'authorization\' est manquant'
            }); 
    
    var token = req.headers.authorization.split(' ')[1];
    
    // s'il y a un token on va le traiter
    // token="toto";
    if (token && token != 'null') {

        // verifies secret and checks exp
        jwt.verify(token, config.JWTKEY, function(err, decoded) {      
          if (err) {
            return res.status(403).json({
                success: true,
                code : 'INCORRECT_TOKEN',
                message: 'Token incorrect !'
            })
          } else {
            req.decoded = decoded;    
            return next();
          }
        });

    } 
    //si pas de token interdiction
    else {
        return res.status(403).json({ 
            success: false, 
            code : 'AUTHENTIFICATION_REQUIRED',
            message: 'Vous devez être authentifié pour accéder à cette ressource !' 
        });
    }
};
