import * as express from 'express';
import * as mongodb from 'mongodb';
import { collections } from './database';

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

employeeRouter.get('/', async (_req, res) => {
  try {
    const employees = await collections.employees.find({}).toArray();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
