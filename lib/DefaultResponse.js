class DefaultResponse {
  
  // error 500
  static sendError(res, message) {
  	res.statusCode = 500;
	  res.statusMessage = message;
	  //res.send( { error: true, message: message } );
	  res.send( { error: true, message: message } );
  }

  // response 200
  static sendData(res, data) {
	  res.statusCode = 200;
	  res.statusMessage = 'ok';
	  res.send(data); //auto Content-type.
	}

	//response 400
	static sendIncorrect(res, data) {
    res.statusCode = 400;
    res.statusMessage = data;
    res.send( data );
	}

}

export default DefaultResponse;