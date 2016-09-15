import mongoose from 'mongoose';
let connection = mongoose.connect('mongodb://localhost/pm');

let BoadSchema = new mongoose.Schema({
	name: String,
	date_create: {type: Date, default: Date.now},
});

let ListSchema = new mongoose.Schema({
	name: String,
	date_create: {type: Date, default: Date.now},
	boad: mongoose.Schema.Types.ObjectId
});

let CardSchema = new mongoose.Schema({
	name: String,
	description: String,
	date_create: {type: Date, default: Date.now},
	list: mongoose.Schema.Types.ObjectId,
});

let LabelSchema = new mongoose.Schema({
	name: String,
	color: String,
	date_create: {type: Date, default: Date.now},
	card: mongoose.Schema.Types.ObjectId,
});

let TodolistSchema = new mongoose.Schema({
	name: String,
	date_create: {type: Date, default: Date.now},
	card: mongoose.Schema.Types.ObjectId,
});

let TaskSchema = new mongoose.Schema({
	name: String,
	complete: Boolean,
	date_create: {type: Date, default: Date.now},
	todolist: mongoose.Schema.Types.ObjectId, 
});

let CommentSchema = new mongoose.Schema({
  text: String,
  date_create: {type: Date, default: Date.now},
  card: mongoose.Schema.Types.ObjectId,
});

let FileSchema = new mongoose.Schema({
	name: String,
	path: String,
	comment: mongoose.Schema.Types.ObjectId,
});

export let Boad     = mongoose.model('boad', BoadSchema);
export let List     = mongoose.model('list', ListSchema);
export let Card     = mongoose.model('card', CardSchema);
export let Label    = mongoose.model('label', LabelSchema);
export let Todolist = mongoose.model('todolist', TodolistSchema );
export let Task     = mongoose.model('task', TaskSchema );
export let Comment  = mongoose.model('comment', CommentSchema);
export let FileCom  = mongoose.model('filecom', FileSchema );