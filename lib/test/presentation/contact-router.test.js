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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const contact_router_1 = __importDefault(require("../../presentation/routers/contact-router"));
const server_1 = __importDefault(require("../../server"));
class MockGetAllContactsUseCase {
    execute() {
        throw new Error('Method not implemented');
    }
}
class MockCreateContactUseCase {
    execute(contact) {
        throw new Error('Method not implemented');
    }
}
describe('Contact Router', () => {
    let mockCreateContactUseCase;
    let mockGetAllContactsUseCase;
    beforeAll(() => {
        mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
        mockCreateContactUseCase = new MockCreateContactUseCase();
        server_1.default.use('/contact', (0, contact_router_1.default)(mockGetAllContactsUseCase, mockCreateContactUseCase));
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('GET /contact', () => {
        test('should return 200 with data', () => __awaiter(void 0, void 0, void 0, function* () {
            const ExpectedData = [
                { id: '1', surname: 'Bagas', firstName: 'Ray', email: 'ray@gmail.com' },
            ];
            jest
                .spyOn(mockGetAllContactsUseCase, 'execute')
                .mockImplementation(() => Promise.resolve(ExpectedData));
            const response = yield (0, supertest_1.default)(server_1.default).get('/contact');
            expect(response.status).toBe(200);
            expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
            expect(response.body).toStrictEqual(ExpectedData);
        }));
        test('GET /contact returns 500 on use case error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest
                .spyOn(mockGetAllContactsUseCase, 'execute')
                .mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).get('/contact');
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({
                message: 'Error fetching contacts data',
            });
        }));
    });
    describe('POST /contact', () => {
        test('POST /contact', () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = {
                id: '1',
                surname: 'Bagas',
                firstName: 'Ray',
                email: 'ray@gmail.com',
            };
            jest
                .spyOn(mockCreateContactUseCase, 'execute')
                .mockImplementation(() => Promise.resolve(true));
            const response = yield (0, supertest_1.default)(server_1.default).post('/contact').send(InputData);
            expect(response.status).toBe(201);
        }));
        test('POST /contact returns 500 on use case error', () => __awaiter(void 0, void 0, void 0, function* () {
            const InputData = {
                id: '1',
                surname: 'Bagas',
                firstName: 'Ray',
                email: 'ray@gmail.com',
            };
            jest
                .spyOn(mockCreateContactUseCase, 'execute')
                .mockImplementation(() => Promise.reject(Error()));
            const response = yield (0, supertest_1.default)(server_1.default).post('/contact').send(InputData);
            expect(response.status).toBe(500);
        }));
    });
});
