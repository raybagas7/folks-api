"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const ClientError_1 = require("./ClientError");
class NotFoundError extends ClientError_1.ClientError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
