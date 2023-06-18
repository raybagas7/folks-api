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
const mongodb_1 = require("mongodb");
const contact_router_1 = __importDefault(require("./presentation/routers/contact-router"));
const get_all_contacts_1 = require("./domain/use-cases/get-all-contacts");
const contact_repository_1 = require("./domain/respositories/contact-repository");
const mongodb_contact_data_source_1 = require("./data/data-sources/mongodb/mongodb-contact-data-source");
const create_contact_1 = require("./domain/use-cases/create-contact");
const server_1 = __importDefault(require("./server"));
const ClientError_1 = require("./exceptions/ClientError");
//localhost:27017/folks
(() => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient('mongodb://127.0.0.1:27017/folks');
    yield client.connect();
    const db = client.db('FOLKS_DB');
    const contactDatabase = {
        find: (query) => db.collection('contacts').find(query).toArray(),
        insertOne: (doc) => db.collection('contacts').insertOne(doc),
    };
    const conctactMiddleWare = (0, contact_router_1.default)(new get_all_contacts_1.GetAllContacts(new contact_repository_1.ContactRepositoryImpl(new mongodb_contact_data_source_1.MongoDBContactDataSource(contactDatabase))), new create_contact_1.CreateContact(new contact_repository_1.ContactRepositoryImpl(new mongodb_contact_data_source_1.MongoDBContactDataSource(contactDatabase))));
    server_1.default.use('/contact', conctactMiddleWare);
    server_1.default.use((err, req, res, next) => {
        console.log(err);
        if (err instanceof ClientError_1.ClientError) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            res.status(500).send('Something happened to our server');
        }
    });
    server_1.default.listen(4000, () => console.log('Running on server'));
}))();
