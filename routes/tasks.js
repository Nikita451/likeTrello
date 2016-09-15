import express from 'express';
import { Task } from '../models';
import RespDef from '../lib/DefaultResponse.js';
import RemoveModel from '../lib/RemoveModel.js';

let router = express.Router();

router.post( "/", (req, res, next) => {
  const { name, complete, todolist } = req.body;
  let task = new Task({
      name: name,
      complete: complete,
      todolist: todolist,
  });
  task.save( (err, newTask) => {
    if (err) {
      RespDef.sendError(res, 'Error save data');
    } else {
      RespDef.sendData(res, newTask );
    }
  });
});

router.put("/:id", (req, res, next) =>  {
  const {id} = req.params;
  const {name, complete} = req.body;
  Task.findById(id, (err, task) => {
    if (err) {
      RespDef.sendError(res, 'Error fetch data');
    } else {
      task.name = (name)? name : task.name;
      task.complete = (complete != undefined)? complete: task.complete;
      task.save( (err, upTask) => {
        if (err) {
          RespDef.sendError(res, 'Error save data');
        } else {
          RespDef.sendData(res, upTask);
        }
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const {id} = req.params;
  console.log( id );
  RemoveModel.removeTask(id, (err, task) => {
    if (err) {
      RespDef.sendError(res, "error remove data");
    } else {
      RespDef.sendData(res, task);
    }
  });
});

export default router;