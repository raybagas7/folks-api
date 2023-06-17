import { MongoClient } from 'mongodb';
import { DatabaseWraper } from './data/interfaces/data-sources/database-wrapper';
import ContactsRouter from './presentation/routers/contact-router';
import { GetAllContacts } from './domain/use-cases/get-all-contacts';
import { ContactRepositoryImpl } from './domain/respositories/contact-repository';
import { MongoDBContactDataSource } from './data/data-sources/mongodb/mongodb-contact-data-source';
import { CreateContact } from './domain/use-cases/create-contact';
import server from './server';
//localhost:27017/folks
(async () => {
  const client: MongoClient = new MongoClient(
    'mongodb://127.0.0.1:27017/folks'
  );
  await client.connect();
  const db = client.db('FOLKS_DB');

  const contactDatabase: DatabaseWraper = {
    find: (query) => db.collection('contacts').find(query).toArray(),
    insertOne: (doc) => db.collection('contacts').insertOne(doc),
  };

  const conctactMiddleWare = ContactsRouter(
    new GetAllContacts(
      new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))
    ),
    new CreateContact(
      new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))
    )
  );

  server.use('/contact', conctactMiddleWare);
  server.listen(4000, () => console.log('Running on server'));
})();
