"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsValidator = void 0;
const InvariantError_1 = require("../../../../exceptions/InvariantError");
const schema_1 = require("./schema");
exports.ContactsValidator = {
    validateCreateNewContactPayload: (payload) => {
        const validationResult = schema_1.createContactPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError_1.InvariantError(validationResult.error.message);
        }
    },
};
