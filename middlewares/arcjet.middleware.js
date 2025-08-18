import aj from "../config/arcjet.js";


const arcjetmiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {requested: 1});
    if (decision.isDenied()){
        console.warn("Arcjet blocked a request:", decision.reason);
        if(decision.reason.isRateLimit()){
            return res.status(429).json({
                message: "Too many requests. Please try again later.",
            });
        }
        if(decision.reason.isBot()){
            return res.status(403).json({
                message: "Access denied for bots.",
            });
        }
    }
    next();
  } catch (error) {
    console.error("Arcjet middleware Catched error:", error);
    return res.status(500).send("Internal server error");
  }
}
export default arcjetmiddleware;