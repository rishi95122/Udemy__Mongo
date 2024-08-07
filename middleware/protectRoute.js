
import jwt from "jsonwebtoken";

 const protectRoute = async (req, res, next) => {
	console.log("pro")
	try {
		const token = req.cookies.access_token;
		console.log(token)
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

		const decoded = jwt.verify(token,"jwtkey");

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}
		req.username = decoded;
		next();
	} catch (err) {
		console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
export default protectRoute