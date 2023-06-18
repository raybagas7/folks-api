"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const ClientError_1 = require("./ClientError");
class AuthenticationError extends ClientError_1.ClientError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
