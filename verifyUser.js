/*This function is designed to check if the user exist in the
 DataBase. Especially when the user tries to log in.*/
module.exports = {

	verifyUser : function(req, res, pool, callback){

		var userName = req.body.username;
		var userPassword = req.body.password;


		console.log("This function verifyUser", userName, "  ", userPassword);
		// The result that is going to be send if the user exists
		var result = null;

		// Query to verify if the user exists on the database
		// according to the username and the password.
		const queryFindUser = {
		  // give the query a unique name
		  name: 'fetch-user',
		  text: 'SELECT exists(SELECT 1 FROM users WHERE user_name = $1 AND password = $2 LIMIT 1)',
		  values: [userName, userPassword]
		}


		// Find if the user is in the database. Otherwise 
		// insert the new user.
		pool.query(queryFindUser, (err, res, result) => {

			console.log("This is the query verify", res);

		  if (err) {
		    console.log(err.stack, "This is an error")
		  } else if(res.rows[0].exists == false){

		    // Assign false if the user doesn't exist. 
		    result = res.rows[0].exists;

		  } else if(res.rows[0].exists == true){

		    // Assign true if the user exist.
		     result = res.rows[0].exists; 
		  }

		  // Use the callback to get the value of the result.
		  callback(result);
		})
	}
};