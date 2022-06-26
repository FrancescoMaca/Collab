exports.handleInvalidBody = () => {
    return function (error, req, res, next) {
        if (error.status === 400) {

            // res.status(400).send(error.message)
            
            res.status(400).json({
                code: 400,
                message: error.message
            });
        };
    };
};