import express from 'express';
import { Request, Response } from 'express';
import { CreateContactUseCase } from '../../domain/use-cases/contact/create-contact';
import { GetAllContactsUseCase } from '../../domain/use-cases/contact/get-all-contacts';

export default function ContactsRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContactsUseCase.execute();
      res.send(contacts);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching contacts data' });
    }
  });

  router.post('/', async (req: Request, res: Response) => {
    try {
      await createContactUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: 'Created' });
    } catch (err) {
      res.status(500).send({ message: 'Error saving contact data' });
    }
  });

  return router;
}
