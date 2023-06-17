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
const get_all_contacts_1 = require("../../../../domain/use-cases/get-all-contacts");
describe('Get All Contacts Use Case', () => {
    class MockContactRepository {
        createContact(contact) {
            throw new Error('Method not implemented');
        }
        getContacts() {
            throw new Error('Method not implemented');
        }
    }
    let mockContactRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository();
    });
    test('should return data', () => __awaiter(void 0, void 0, void 0, function* () {
        const ExpectedResult = [
            { id: '1', surname: 'Bagas', firstName: 'Ray', email: 'ray@gmail.com' },
        ];
        jest
            .spyOn(mockContactRepository, 'getContacts')
            .mockImplementation(() => Promise.resolve(ExpectedResult));
        const getAllContactsUse = new get_all_contacts_1.GetAllContacts(mockContactRepository);
        const result = yield getAllContactsUse.execute();
        expect(result).toStrictEqual(ExpectedResult);
    }));
});
