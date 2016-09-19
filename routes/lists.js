import express from 'express';
import { List, Card } from '../models';
import RespDef from '../lib/DefaultResponse.js';
import RemoveModel from '../lib/RemoveModel.js';
import FetchModel from '../lib/FetchModel.js';
import mongoose from 'mongoose';

let router = express.Router();

router.get("/:id_boad", (req, res, next) => {
  
  let {id_boad} = req.params;
  List.find({boad:  id_boad }).lean().exec( (err, lists) => {
    if (err) {
      RespDef.sendError(res, "error fetch data");
    } else {
      FetchModel.bindCards(lists, (err, result) => {
        if (err) {
          RespDef.sendError(res, 'error fetch data');
        } else {
          RespDef.sendData(res, lists);
        }
      });
       
    }
  });
});

router.post("/", (req, res, next) => {
  const {name, boad} = req.body;
  let list = new List({
  	name: name,
    boad: boad,
    date_create: Date()
  });
  
  list.save( (err, newList) => {
  	if (err) {
      RespDef.sendError( res,  'error save data' );
  	} else {
  	  RespDef.sendData( res, newList );	
  	}
  });
});

router.put("/:id", (req, res, next) => {
  const { name} = req.body;
  const { id } = req.params;
  List.findById( id, (err, list) => {
    if (err) {
    	sendError( res, 'error fetch data' );
    } else {
      list.name = name;
	    list.save( (err, newList) => {
	      if (err) {
	      	RespDef.sendError( res, 'error save data' );
	      } else {
	        RespDef.sendData( res, newList );	
	      }
	    });	
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  RemoveModel.removeList(id, (err, list) => {
    if (err) {
      RespDef.sendError(res, 'error remove data');
    } else {
      RespDef.sendData(res, list);
    }
  });
});

export default router;