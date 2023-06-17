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
exports.MongoDBContactDataSource = void 0;
class MongoDBContactDataSource {
    constructor(database) {
        this.database = database;
    }
    create(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.insertOne(contact);
            return result !== null;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.database.find({});
            return result.map((item) => ({
                id: item._id.toString(),
                surname: item.surname,
                firstName: item.firstName,
                email: item.email,
            }));
        });
    }
}
exports.MongoDBContactDataSource = MongoDBContactDataSource;
