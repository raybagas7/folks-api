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
const mongodb_contact_data_source_1 = require("../../../data/data-sources/mongodb/mongodb-contact-data-source");
describe('MongoDB DataSource', () => {
    let mockDatabase;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn(),
        };
    }));
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('getAll', () => __awaiter(void 0, void 0, void 0, function* () {
        const db = new mongodb_contact_data_source_1.MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, 'find').mockImplementation(() => Promise.resolve([
            {
                _id: '1',
                surname: 'Bagas',
                firstName: 'Ray',
                email: 'ray@gmail.com',
            },
        ]));
        const result = yield db.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({});
        expect(result).toStrictEqual([
            {
                id: '1',
                surname: 'Bagas',
                firstName: 'Ray',
                email: 'ray@gmail.com',
            },
        ]);
    }));
    test('create', () => __awaiter(void 0, void 0, void 0, function* () {
        const db = new mongodb_contact_data_source_1.MongoDBContactDataSource(mockDatabase);
        jest
            .spyOn(mockDatabase, 'insertOne')
            .mockImplementation(() => Promise.resolve({ insertedId: '789' }));
        const result = yield db.create({
            id: '1',
            surname: 'Bagas',
            firstName: 'Ray',
            email: 'ray@gmail.com',
        });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({
            id: '1',
            surname: 'Bagas',
            firstName: 'Ray',
            email: 'ray@gmail.com',
        });
        expect(result).toStrictEqual(true);
    }));
});
