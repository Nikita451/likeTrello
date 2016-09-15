import { Boad, List, Card, Label, Todolist, Task, Comment, FileCom} from '../models';
import async from 'async';

class RemoveModel {
    static removeLabel( id, callback ) {
        Label.findById(id,  (err, label) => {
            if (err) {
                callback(err);
            } else {
                label.remove( (err, oldLabel) => {
                    callback(err, oldLabel);
                });
            }
        });
    }

    static removeTask(id, callback) {
        Task.findById(id,  (err, task) => {
            if (err) {
              callback(err);
            } else {
            task.remove( (err, oldTask) => {
                callback(err, oldTask);
            });
            }
        });
    }

    static removeComment(id, callback) {
        Comment.findById(id,  (err, comment) => {
            if (err) {
                callback(err);
            } else {
                comment.remove( (err, oldComment) => {
                    callback(err, oldComment);
                });
            }
        });
    }

    static removeTodolist(id, callback) {
        Task.find({todolist: id}, (err, tasks) => {
          if (err) {
            callback(err);
          } else {
            let calls = [];
            for (let i=0; i < tasks.length; i++ ) {
                calls.push( RemoveModel.removeTask.bind(null, tasks[i]._id ) );
            }
            async.parallel(calls, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    Todolist.findById(id, (err, todolist) => {
                        if (err) {
                            callback(err);
                        } else {
                            todolist.remove( (err, oldTodolist) => {
                              callback(null, oldTodolist);
                            });
                        }
                    });
                }
            });
          }
        });
    }

    static removeCard(id, callback) {
      async.parallel([
        (callback) => {
          RemoveModel._removeTodolistsFromCard(id, callback);
        },
        (callback) => {
          RemoveModel._removeLabelsFromCard(id, callback);
        },
        (callback) => {
          RemoveModel._removeCommentsFromCard(id, callback);
        }
      ], (err, result) => {
        if (err) {
          callback(err);
        } else {
          Card.findById(id, (err, card) => {
            if (err) {
                callback(err);
            } else {
                card.remove( (err, oldCard) => {
                  callback(err, oldCard);
                });
            }
          });
        }
      });
    }

    static removeList(id, callback) {
      Card.find( {list: id}, (err, cards) => {
        if (err) {
            callback(err);
        } else {
            let calls = [];
            for (let i=0; i < cards.length; i++) {
                calls.push( RemoveModel.removeCard.bind(null, cards[i]._id) );
            }
            async.parallel(calls, (err, result) => {
              if (err) {
                  callback(err);
              } else {
                  List.findById(id, (err, list) => {
                    if (err) {
                      callback(err);
                    } else {
                      list.remove( (err, oldList) => {
                        callback(err, oldList);
                      });
                    }
                  });
              }
            });
        }
      });
    }
    

    static removeBoad(id, callback) {
      List.find( {boad: id}, (err, lists) => {
        if (err) {
          callback(err);
        } else {
          let calls = [];
          for (let i=0; i < lists.length; i++) {
              calls.push( RemoveModel.removeList.bind(null, lists[i]._id) );
          }
          async.parallel(calls, (err, result) => {
            if (err) {
                callback(err);
            } else {
                Boad.findById(id, (err, boad) => {
                  if (err) {
                    callback(err);
                  } else {
                    boad.remove( (err, oldBoad) => {
                      callback(err, oldBoad);
                    });
                  }
                });
            }
          });
        }
      });
    }

  static _removeLabelsFromCard(id, callback) {
    Label.find( {card: id}, (err, labels) => {
        let calls = [];
        for (let i=0; i < labels.length; i++) {
            calls.push( RemoveModel.removeLabel.bind(null, labels[i]._id) );
        }
        async.parallel(calls, (err, result) => {
            callback(err, result);
        });
    });
  }

  static _removeTodolistsFromCard(id, callback) {
    Todolist.find( {card: id}, (err, todolists) => {
        let calls = [];
        for (let i=0; i < todolists.length; i++) {
            calls.push( RemoveModel.removeTodolist.bind(null, todolists[i]._id) );
        }
        async.parallel(calls, (err, result) => {
            callback(err, result);
        });
    });
  }

  static _removeCommentsFromCard(id, callback) {
    Comment.find( {card: id}, (err, comments) => {
        let calls = [];
        for (let i=0; i < comments.length; i++) {
            calls.push( RemoveModel.removeComment.bind(null, comments[i]._id ) );
        }
        async.parallel(calls, (err, result) => {
            callback(err, result);
        });
    });
  }
}

export default RemoveModel;