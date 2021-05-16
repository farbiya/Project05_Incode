// const crypto = require("crypto");

// we store the tokens in-memory for simplicity's sake
// in production we'd make them persistent
const authTokens = {};

const generateAuthToken = () => {
  // todo
};

module.exports = {
  setAuthToken: (userId, res) => {
    // todo
  },

  unsetAuthToken: (req, res) => {
    // todo
  },

  getSessionUser: (req, res, next) => {
    // todo
  },

  requireAuth: (req, res, next) => {
    // todo
  },

  getHashedPassword: (password) => {
    // todo
    return hash;
  },
};
