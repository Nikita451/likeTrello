import express from 'express';
import RespDef from "../../lib/DefaultResponse.js";

let router = express.Router();

router.post("/", (req, res, next) => {
  if (!req.body || !req.body.name) {
    RespDef.sendIncorrect(res, "Incorrect request.");
  } else {
  	next();
  }
});

router.put('/:id', (req, res, next) => {
  if (!req.body || !req.body.name || !req.params || !req.params.id) {
    RespDef.sendIncorrect(res, "Incorrect request.");
  } else {
  	next();
  }
});

router.delete('/:id', (req, res, next) => {
  if (!req.params || !req.params.id) {
    RespDef.sendIncorrect(res, "Incorrect request.");
  } else {
  	next();
  }
});

export default router;