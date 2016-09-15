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
}

export default FetchModel;