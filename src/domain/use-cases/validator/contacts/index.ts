import { InvariantError } from '../../../../exceptions/InvariantError';
import { createContactPayloadSchema } from './schema';

export const ContactsValidator = {
  validateCreateNewContactPayload: (payload: object) => {
    const validationResult = createContactPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
