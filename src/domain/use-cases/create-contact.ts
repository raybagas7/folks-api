import { Contact } from '../entities/contact';
import { ContactRepository } from '../interfaces/repositories/contact-repository';
import { CreateContactUseCase } from '../interfaces/use-cases/contact/create-contact';
import { ContactsValidator } from './validator/contacts';

export class CreateContact implements CreateContactUseCase {
  constructor(public contactRepository: ContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(contact: Contact): Promise<boolean> {
    ContactsValidator.validateCreateNewContactPayload(contact);
    const result = await this.contactRepository.createContact(contact);
    return result;
  }
}
