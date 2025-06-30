const jwt = require("jsonwebtoken");
const UserModel = require("../models/index").users;
const responseUtilities = require("../utilities/responseUtilities");
const responses = new responseUtilities();
const userServices = require("../services/userServices.js");
const { ENUM } = require("sequelize");

const isAuthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Token not present");
    }
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await userServices.findOneUser({
      where: {
        id: parseInt(verifyToken.id),
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(responses.notFound404("User not found", null));
    }

    req.user = user;

    req.userId = verifyToken.id;
    next();
  } catch (error) {
    return res.status(400).send(responses.badRequest400("Incorrect token"));
  }
};

const isAuthenticateWithNext = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization;
    if (!token) {
      return next();
    }
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await userServices.findOneUser({
      where: {
        id: parseInt(verifyToken.id),
      },
    });

    if (!user) {
      return next();
    }

    req.user = user;

    req.userId = verifyToken.id;
    return next();
  } catch (error) {
    console.error(error);
    return next();
  }
};

const isUserSubscriptionActive = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    req.userId = verifyToken.id;

    const user = await UserModel.findOne({
      where: {
        id: verifyToken.id,
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(responses.notFound404("User not found", null));
    }

    if (
      user.is_subscription_active === 0 ||
      user.is_subscription_active === null
    ) {
      return res
        .status(404)
        .send(responses.notFound404("Subscription not active", user));
    }

    if (user.is_subscription_active === 1) {
      return next();
    }
  } catch (error) {
    return res.status(404).send(responses.notFound404("User not found"));
  }
};

const checkSubscription = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      where: {
        id: req.userId,
      },
    });

    if (!user) {
      return res
        .status(404)
        .send(responses.notFound404("User not found", null));
    }

    if (
      user.is_subscription_active === 0 ||
      user.is_subscription_active === null
    ) {
      return res
        .status(404)
        .send(responses.notFound404("Subscription not active", null));
    }
    return next();
  } catch (e) {
    console.error(e);
  }
};

// Middleware to verify token for protected events
const authenticateSocket = async (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await userServices.findOneUser({
      where: {
        id: parseInt(decoded.id),
      },
    });

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;
    next();
  } catch (error) {
    return next(new Error("Invalid token"));
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.user_roles_id)) {
      return next();
    }

    return res
      .status(404)
      .send(responses.forbidden403("Insufficient role", null));
  };
};

const RolesEnum = Object.freeze({
  user: 1,
  builder: 2,
  agent: 3,
  admin: 4,
});

module.exports = {
  RolesEnum,
  checkRole,
  authenticateSocket,
  isAuthenticate,
  isUserSubscriptionActive,
  checkSubscription,
  isAuthenticateWithNext,
};
