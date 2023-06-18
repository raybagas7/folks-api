"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactPayloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createContactPayloadSchema = joi_1.default.object({
    id: joi_1.default.string(),
    surname: joi_1.default.string().required(),
    firstName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
});
