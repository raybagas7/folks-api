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
const create_contact_1 = require("../../../../domain/use-cases/create-contact");
describe('Create Contact Use Case', () => {
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
    test('should return true', () => __awaiter(void 0, void 0, void 0, function* () {
        const InputData = {
            id: '1',
            surname: 'Bagas',
            firstName: 'Ray',
            email: 'ray@gmail.com',
        };
        jest
            .spyOn(mockContactRepository, 'createContact')
            .mockImplementation(() => Promise.resolve(true));
        const createContactUseCase = new create_contact_1.CreateContact(mockContactRepository);
        const result = yield createContactUseCase.execute(InputData);
        expect(result).toBe(true);
    }));
});
