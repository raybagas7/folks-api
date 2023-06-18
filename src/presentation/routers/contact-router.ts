import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { CreateContactUseCase } from '../../domain/interfaces/use-cases/contact/create-contact';
import { GetAllContactsUseCase } from '../../domain/interfaces/use-cases/contact/get-all-contacts';

export default function ContactsRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase
) {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contacts = await getAllContactsUseCase.execute();
      res.send(contacts);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createContactUseCase.execute(req.body);
      res.statusCode = 201;
      res.json({ message: 'Created' });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
