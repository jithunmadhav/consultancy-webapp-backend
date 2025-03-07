import jwt from "jsonwebtoken";
import clientModel from "../models/client.model.js";

const verifyClient = async (req, res, next) => {
  try {
    // Extract token from headers
    const token =
      req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ status: "failed", message: "Token is missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.CLIENT_TOKEN_KEY);
    if (!decoded) {
      return res.status(401).json({ status: "failed", message: "Invalid token" });
    }

    req.clientId = decoded.clientId;

    // Fetch the client from the database
    const client = await clientModel.findOne({ where: { clientId: req.clientId } });
    if (!client) {
      return res.status(404).json({ status: "failed", message: "Client does not exist" });
    }

    // Check if the client is banned
    if (client.banned === "YES") {
      return res.status(403).json({ status: "failed", message: "Client is banned" });
    }

    // Proceed to next middleware
    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      message: "Authentication failed",
    });
  }
};

export default verifyClient;
