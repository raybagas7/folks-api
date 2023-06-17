import { MongoDBContactDataSource } from '../../../data/data-sources/mongodb/mongodb-contact-data-source';
import { DatabaseWraper } from '../../../data/interfaces/data-sources/database-wrapper';

describe('MongoDB DataSource', () => {
  let mockDatabase: DatabaseWraper;

  beforeAll(async () => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
    };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll', async () => {
    const db = new MongoDBContactDataSource(mockDatabase);
    jest.spyOn(mockDatabase, 'find').mockImplementation(() =>
      Promise.resolve([
        {
          _id: '1',
          surname: 'Bagas',
          firstName: 'Ray',
          email: 'ray@gmail.com',
        },
      ])
    );

    const result = await db.getAll();
    expect(mockDatabase.find).toHaveBeenCalledWith({});
    expect(result).toStrictEqual([
      {
        id: '1',
        surname: 'Bagas',
        firstName: 'Ray',
        email: 'ray@gmail.com',
      },
    ]);
  });

  test('create', async () => {
    const db = new MongoDBContactDataSource(mockDatabase);
    jest
      .spyOn(mockDatabase, 'insertOne')
      .mockImplementation(() => Promise.resolve({ insertedId: '789' }));
    const result = await db.create({
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
  });
});
