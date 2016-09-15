import express from 'express';
import RespDef from '../lib/DefaultResponse.js';
import RemoveModel from '../lib/RemoveModel.js';
import {Comment, FileCom} from '../models';

let router = express.Router();

router.post( "/", (req, res, next) => {
  const { text, card } = req.body;
  let comment = new Comment({
      text: text,
      card: card,
  });
  comment.save( (err, newComment) => {
    if (err) {
      RespDef.sendError(res, 'Error save data');
    } else {
      RespDef.sendData(res, newComment );
    }
  });
});

router.put("/:id", (req, res, next) =>  {
  const {id} = req.params;
  const {text} = req.body;
  Comment.findById(id, (err, comment) => {
    if (err) {
      RespDef.sendError(res, 'Error fetch data');
    } else {
      comment.text = text;
      comment.save( (err, upComment) => {
        if (err) {
          RespDef.sendError(res, 'Error save data');
        } else {
          RespDef.sendData(res, upComment);
        }
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const {id} = req.params;
  RemoveModel.removeComment(id, (err, comment) => {
    if (err) {
      RespDef.sendError(res, 'error remove model');
    } else {
      RespDef.sendData(res, comment);
    }
  });
});

export default router;