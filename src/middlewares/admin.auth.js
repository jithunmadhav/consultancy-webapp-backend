import jwt from "jsonwebtoken";

const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.headers["adminauthorization"];
    if (!token) {
      return res
        .status(401)
        .send({ status: "failed", message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.ADMIN_TOKEN_KEY);
    if (!decoded) {
      return res
        .status(401)
        .send({ status: "failed", message: "Invalid token" });
    }
    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    res
      .status(404)
      .send({ status: "failed", message: "Invalid token", data: error.message });
  }
};

export default verifyAdmin;
