// server/utils/auth.js:
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "secret";  // Ensure this is your actual secret key
const expiration = "2h";

// Middleware to extract and verify token from incoming request
const authMiddleWare = function ({ req }) {
  console.log('call auth middleware');
  
  // Initialize token variable
  let token = "";
  
  // Check if authorization header is present and extract token
  if (req.headers.authorization) {
    // Splitting the Bearer keyword from the token
    token = req.headers.authorization.split('Bearer ')[1]?.trim();
  }

  // Log the extracted token for debugging purposes
  console.log('Extracted token:', token);

  // If no token, return the request object as it is
  if (!token) {
    return req;
  }

  // Verify the token using jwt.verify
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    // Assign the decoded data to the request user
    req.user = data;
  } catch (error) {
    console.log("Invalid token", error.message);
    // Optionally handle the invalid token case, e.g., by setting req.user to null
  }

  // Return the request with the (possibly modified) user property
  return req;
};

// Function to sign a token (for signup, login)
const signToken = function ({ email, username, _id, isAdmin }) {
  // Constructing the payload with necessary user details
  const payload = { email, username, _id, isAdmin };
  // Sign the token with the payload, secret, and set an expiration
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

// Exporting the middleware and signToken function for use in the application
module.exports = {
  authMiddleWare,
  signToken,
};