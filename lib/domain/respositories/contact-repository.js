"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepositoryImpl = void 0;
class ContactRepositoryImpl {
    constructor(contactDataSource) {
        this.contactDataSource = contactDataSource;
        this.contactDataSource = contactDataSource;
    }
    createContact(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contactDataSource.create(contact);
            return result;
        });
    }
    getContacts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.contactDataSource.getAll();
            return result;
        });
    }
}
exports.ContactRepositoryImpl = ContactRepositoryImpl;
