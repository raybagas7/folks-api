import { ContactDataSource } from '../../../data/interfaces/data-sources/contact-data-source';
import { Contact } from '../../../domain/entities/contact';
import { ContactRepository } from '../../../domain/interfaces/repositories/contact-repository';
import { ContactRepositoryImpl } from '../../../domain/respositories/contact-repository';

class MockContactDataSource implements ContactDataSource {
  create(contact: Contact): Promise<boolean> {
    throw new Error('Method not implemented');
  }
  getAll(): Promise<Contact[]> {
    throw new Error('Method not implemented');
  }
}

describe('Contact Repository', () => {
  let mockContactDataSource: ContactDataSource;
  let contactRepository: ContactRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactDataSource = new MockContactDataSource();
    contactRepository = new ContactRepositoryImpl(mockContactDataSource);
  });

  describe('getAllContacts', () => {
    test('should return contacts data', async () => {
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
      const result = await contactRepository.getContacts();
      expect(result).toBe(ExpectedData);
    });
  });

  describe('createContact', () => {
    test('should return true', async () => {
      const InputData = {
        id: '1',
        surname: 'Bagas',
        firstName: 'Ray',
        email: 'ray@gmail.com',
      };
      jest
        .spyOn(mockContactDataSource, 'create')
        .mockImplementation(() => Promise.resolve(true));
      const result = await contactRepository.createContact(InputData);
      expect(result).toBe(true);
    });
  });
});
