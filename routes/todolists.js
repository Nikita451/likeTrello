import express from 'express';
import RespDef from '../lib/DefaultResponse.js';
import {Todolist} from '../models';
import RemoveModel from '../lib/RemoveModel';

let router = express.Router();

router.post( "/", (req, res, next) => {
  const { name, card } = req.body;
  let todolist = new Todolist({
      name: name,
      card: card
  });
  todolist.save( (err, newTodolist) => {
    if (err) {
      RespDef.sendError(res, 'Error save data');
    } else {
      RespDef.sendData(res, newTodolist );
    }
  });
});

router.put("/:id", (req, res, next) =>  {
  const {id} = req.params;
  const {name} = req.body;
  Todolist.findById(id, (err, todolist) => {
    if (err) {
      RespDef.sendError(res, 'Error fetch data');
    } else {
      todolist.name = name;
      todolist.save( (err, upTodolist) => {
        if (err) {
          RespDef.sendError(res, 'Error save data');
        } else {
          RespDef.sendData(res, upTodolist);
        }
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const {id} = req.params;
  RemoveModel.removeTodolist(id, (err, todolist) => {
    if (err) {
      RespDef.sendError(res, 'error remove data');
    } else {
      RespDef.sendData(res, todolist);
    }
  });
});

export default router;