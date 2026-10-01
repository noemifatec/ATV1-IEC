import { Request, Response, NextFunction } from 'express';
import { Transaction, ITransactionCreationAttributes } from '../models/Transaction';
import { AppError } from '../errors/AppError';

export class TransactionController {
  // GET /transactions (200 OK)
  public getAll = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const transactions = await Transaction.findAll({
        order: [['date', 'DESC']]
      });
      res.status(200).json(transactions);
    } catch (error) {
      next(error);
    }
  };

  // GET /transactions/:id (200 OK)
  public getById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);

      if (!transaction) {
        throw new AppError('Lançamento financeiro não encontrado', 404);
      }

      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  };

  // POST /transactions (201 Created)
  public create = async (
    req: Request<{}, {}, ITransactionCreationAttributes>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { description, amount, type, category, date } = req.body;

      if (!description || amount === undefined || !type || !category) {
        throw new AppError('Campos obrigatórios: description, amount, type e category');
      }

      if (type !== 'INCOME' && type !== 'EXPENSE') {
        throw new AppError('O tipo deve ser INCOME ou EXPENSE');
      }

      const transaction = await Transaction.create({
        description,
        amount,
        type,
        category,
        date: date || new Date()
      });

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  };

  // PUT /transactions/:id (200 OK)
  public update = async (
    req: Request<{ id: string }, {}, Partial<ITransactionCreationAttributes>>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);

      if (!transaction) {
        throw new AppError('Lançamento financeiro não encontrado', 404);
      }

      const { description, amount, type, category, date } = req.body;

      if (type && type !== 'INCOME' && type !== 'EXPENSE') {
        throw new AppError('O tipo deve ser INCOME ou EXPENSE');
      }

      await transaction.update({
        description: description ?? transaction.description,
        amount: amount ?? transaction.amount,
        type: type ?? transaction.type,
        category: category ?? transaction.category,
        date: date ?? transaction.date
      });

      res.status(200).json(transaction);
    } catch (error) {
      next(error);
    }
  };

  // DELETE /transactions/:id (204 No Content)
  public delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);

      if (!transaction) {
        throw new AppError('Lançamento financeiro não encontrado', 404);
      }

      await transaction.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}