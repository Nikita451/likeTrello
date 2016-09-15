import express from 'express';
import { Boad } from '../models';
import RespDef from "../lib/DefaultResponse.js";
import RemoveModel from '../lib/RemoveModel.js';

let router = express.Router();

router.get('/', (req, res, next)=> {
    Boad
    .find({})
    .sort({date_create: -1})
    .lean()
    .exec((err, boads)=> {
       if (err) {
         RespDef.sendError(res, 'error fetch data');
       } else {
         RespDef.sendData(res, boads); 
       }
    });
});

router.post('/', (req, res, next) => {
  let boad = new Boad({
  	name: req.body.name,
  });
  
  boad.save( (err, newBoad) => {
  	if (err) {
      RespDef.sendError( res,  'error save data' );
  	} else {
      RespDef.sendData( res, newBoad );  
    }
  });
});

router.put("/:id", (req, res, next) => {
  const { name} = req.body;
  const { id } = req.params;
  Boad.findById( id, (err, boad) => {
    if (err) {
      sendError( res, 'error fetch data' );
    } else {
      boad.name = name;
      boad.save( (err, newBoad) => {
        if (err) {
          RespDef.sendError( res, 'error save data' );
        } else {
          RespDef.sendData( res, newBoad );
        }
      });  
    }
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  RemoveModel.removeBoad(id, (err, boad) => {
    if (err) {
      RespDef.sendError(res, 'error remove model');
    } else {
      RespDef.sendData(res, boad);
    }
  });
});

export default router;