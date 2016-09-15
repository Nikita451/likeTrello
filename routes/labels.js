import express from 'express';
import { Label } from '../models';
import RespDef from '../lib/DefaultResponse.js';
import RemoveModel from '../lib/RemoveModel.js';

//https://code.visualstudio.com/docs/runtimes/nodejs

let router = express.Router();

router.post( "/", (req, res, next) => {
  const { name, color, card } = req.body;
  let label = new Label({
      name: name,
      color: color,
      card: card,
  });
  label.save( (err, newLabel) => {
    if (err) {
      RespDef.sendError(res, 'Error save data');
    } else {
      RespDef.sendData(res, newLabel );
    }
  });
});

router.put("/:id", (req, res, next) =>  {
  const {id} = req.params;
  const {name, color} = req.body;
  Label.findById(id, (err, label) => {
    if (err) {
      RespDef.sendError(res, 'Error fetch data');
    } else {
      label.name = (name)? name : label.name;
      label.color = (color)? color: label.color;
      label.save( (err, upLabel) => {
        if (err) {
          RespDef.sendError(res, 'Error save data');
        } else {
          RespDef.sendData(res, label);
        }
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const {id} = req.params;
  RemoveModel.removeLabel(id, (err, label) => {
    if (err) {
      RespDef.sendError(res, 'error remove model');
    } else {
      RespDef.sendData(res, label);
    }
  });
});

export default router;