"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvariantError = void 0;
const ClientError_1 = require("./ClientError");
class InvariantError extends ClientError_1.ClientError {
    constructor(message) {
        super(message);
        this.name = 'InvariantError';
    }
}
exports.InvariantError = InvariantError;
