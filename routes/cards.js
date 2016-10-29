import express from 'express';
import RespDef from '../lib/DefaultResponse.js';
import { Card } from '../models';
import RemoveModel from '../lib/RemoveModel.js';

let router = express.Router();

router.post('/', (req, res, next) => {
  let card = new Card({
  	name: req.body.name,
  	description: req.body.description,
    list: req.body.list,
    date_create: Date()
  });
  
  card.save( (err, newCard) => {
  	if (err) {
      RespDef.sendError( res,  'error save data' );
  	} else {
  	  RespDef.sendData( res, newCard );
  	}
  });
});

router.put('/:id', (req, res, next) => {
  const { name, description} = req.body;
  const { id } = req.params;
  Card.findById( id, (err, card) => {
    if (err) {
    	sendError( res, 'error fetch data' );
    } else {
      card.name = (name)? name : card.name;
      card.description = (description)?  description : card.description;
	    card.save( (err, newCard) => {
	      if (err) {
	      	RespDef.sendError( res, 'error save data' );
	      } else {
	        RespDef.sendData( res, newCard );	
	      }
	    });	
    }
  });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  RemoveModel.removeCard(id, (err, card) => {
    if (err) {
      RespDef.sendError(res, "error remove model");
    } else {
      RespDef.sendData(res, card);
    }
  })
});

export default router;