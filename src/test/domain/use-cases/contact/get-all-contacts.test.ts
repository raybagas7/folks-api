import { Contact } from '../../../../domain/entities/contact';
import { ContactRepository } from '../../../../domain/interfaces/repositories/contact-repository';
import { GetAllContacs } from '../../../../domain/use-cases/get-all-contacts';

describe('Get All Contacts Use Case', () => {
  class MockContactRepository implements ContactRepository {
    createContact(contact: Contact): Promise<boolean> {
      throw new Error('Method not implemented');
    }
    getContacts(): Promise<Contact[]> {
      throw new Error('Method not implemented');
    }
  }

  let mockContactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test('should return data', async () => {
    const ExpectedResult = [
      { id: '1', surname: 'Bagas', firstName: 'Ray', email: 'ray@gmail.com' },
    ];

    jest
      .spyOn(mockContactRepository, 'getContacts')
      .mockImplementation(() => Promise.resolve(ExpectedResult));
    const getAllContactsUse = new GetAllContacs(mockContactRepository);
    const result = await getAllContactsUse.execute();
    expect(result).toStrictEqual(ExpectedResult);
  });
});
