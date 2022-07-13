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

employeeRouter.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const employee = await collections.employees.findOne(query);

    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
  }
});
