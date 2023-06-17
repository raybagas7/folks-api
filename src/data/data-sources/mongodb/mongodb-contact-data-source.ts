import { Contact } from '../../../domain/entities/contact';
import { ContactDataSource } from '../../interfaces/data-sources/contact-data-source';
import { DatabaseWraper } from '../../interfaces/data-sources/database-wrapper';

export class MongoDBContactDataSource implements ContactDataSource {
  private database: DatabaseWraper;
  constructor(database: DatabaseWraper) {
    this.database = database;
  }

  async create(contact: Contact): Promise<boolean> {
    const result = await this.database.insertOne(contact);
    return result !== null;
  }

  async getAll(): Promise<Contact[]> {
    const result = await this.database.find({});
    return result.map((item) => ({
      id: item._id.toString(),
      surname: item.surname,
      firstName: item.firstName,
      email: item.email,
    }));
  }
}
