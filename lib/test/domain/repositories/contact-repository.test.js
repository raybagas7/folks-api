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
const contact_repository_1 = require("../../../domain/respositories/contact-repository");
class MockContactDataSource {
    create(contact) {
        throw new Error('Method not implemented');
    }
    getAll() {
        throw new Error('Method not implemented');
    }
}
describe('Contact Repository', () => {
    let mockContactDataSource;
    let contactRepository;
    beforeEach(() => {
        jest.clearAllMocks();
        mockContactDataSource = new MockContactDataSource();
        contactRepository = new contact_repository_1.ContactRepositoryImpl(mockContactDataSource);
    });
    describe('getAllContacts', () => {
        test('should return contacts data', () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = [
                {
                    id: '1',
                    surname: 'Bagas',
                    firstName: 'Ray',
                    email: 'ray@gmail.com',
                },
            ];
            jest
                .spyOn(mockContactDataSource, 'getAll')
                .mockImplementation(() => Promise.resolve(ExpectedData));
            const result = yield contactRepository.getContacts();
            expect(result).toBe(ExpectedData);
        }));
    });
    describe('createContact', () => {
        test('should return true', () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = {
                id: '1',
                surname: 'Bagas',
                firstName: 'Ray',
                email: 'ray@gmail.com',
            };
            jest
                .spyOn(mockContactDataSource, 'create')
                .mockImplementation(() => Promise.resolve(true));
            const result = yield contactRepository.createContact(InputData);
            expect(result).toBe(true);
        }));
    });
});
