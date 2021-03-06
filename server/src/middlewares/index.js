const handleRequest = async (req, res, next) => {
    let correlationId = req.headers["x-correlation-id"];
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers["x-correlation-id"] = correlationId;
    }

    res.set("x-correlation-id", correlationId);
    // logger.info(`${req.method} ${req.url}`, { correlationId });
    return next();
};

const handleValidation = (validate) => {
    return (req, res, next) => {
        const result = validate(req.body);
        const isValid = result.error == null;
        if (isValid) {
            return next();
        }

        const { details } = result.error;
        const messages = details.map((e) => e.message);
        const msg = messages.join(",");
        throw new BadRequest(msg);
    };
};
module.exports = { handleRequest, handleValidation };
