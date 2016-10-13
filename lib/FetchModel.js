import { Boad, List, Card, Label, Todolist, Task, Comment, FileCom} from '../models';
import async from 'async';

class FetchModel {
  static bindCards( lists, callback ) {
    let calls = [];
    for (let i=0; i < lists.length; i++) {
      calls.push( FetchModel._bindCards.bind( null, lists[i] ) );
    }
    
    async.parallel( calls, (err, result) => {
      callback(err, lists);
    });
  }

  static _bindCards(list, callback) {
      Card.find( { list: list._id }).lean().exec( (err, cards) => {
          if (err) {
              callback(err);
          } else {
              FetchModel._fillCards(cards, (err, result) => {
                  if (err) {
                    callback(err);
                  } else {
                    list.cards = cards;
                    callback(null, list);
                  }
              });
          }
      });
  }

  static _fillCards(cards, callback) {
    let calls = [];
    for (let i=0; i < cards.length; i++) {
        calls.push( FetchModel._fillCard.bind( null, cards[i] ) );
    }
    async.parallel(calls, (err, result) => {
        callback(err, cards);
    });
  }

  static _fillCard(card, callback) {
    async.parallel([
      (callback) => {
        FetchModel._getComments(card, callback);
      },
      (callback) => {
        FetchModel._getLabels(card, callback);
      },
      (callback) => {
        FetchModel._getTodolists(card, callback);
      }], (err, result) => {
         callback(err, card);
      });
  }

  static _getLabels(card, callback) {
    Label.find( {card: card._id}).lean().exec( (err, labels) => {
      if (err) {
          callback(err);
      } else {
          card.labels = labels;
          callback(null, card);
      }
    });
  }

  static _getComments(card, callback) {
      Comment.find({ card: card._id }).lean().exec( (err, comments) => {
        if (err) {
            callback(err);
        } else {
            card.comments = comments;
            callback(null, comments);
        }
      });
  }
  
  static _getTodolists(card, callback) {
    Todolist.find( {card: card._id }).lean().exec( (err, todolists) => {
      let calls = [];
      for (let i=0; i < todolists.length; i++) {
        calls.push( FetchModel._getTasks.bind(null, todolists[i] ) );
      }  
      async.parallel(calls, (err, result) => {
        if (err) {
            callback(err);
        } else {
            card.todolists = todolists;
            callback(null, card);
        }
      });
    });
  }

  static _getTasks(  todolist, callback) {
      Task.find( { todolist: todolist._id }).lean().exec( (err, tasks) => {
          todolist.tasks = tasks;
          callback(err, todolist);
      });
  }

  // lists, cards, labels, comments, todolists, tasks.
  static getAllWithoutNested( callback ) {
      let data = {};
      async.parallel( [
        (callback) => {
          List.find({}).lean().exec( (err, lists) => {
            data.lists = lists;
            callback(err, lists);
          });
        },
        (callback) => {
          Card.find({}).lean().exec( (err, cards) => {
            data.cards = cards;
            callback(err, cards);
          });
        },
        (callback) => {
          Label.find({}).lean().exec( (err, labels) => {
            data.labels = labels;
            callback(err, labels);
          });
        },
        (callback) => {
          Comment.find({}).lean().exec( (err, comments) => {
            data.comments = comments;
            callback(err, comments);
          });
        },
        (callback) => {
          Todolist.find({}).lean().exec( (err, todolists) => {
            data.todolists = todolists;
            callback(err, todolists);
          });
        },
        (callback) => {
          Task.find({}).lean().exec( (err, tasks) => {
            data.tasks = tasks;
            callback(err, tasks);
          });
        },
      ], (err, result) => {
          callback(err, data);
      });
  }

}

export default FetchModel;