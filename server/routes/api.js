var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Marker = mongoose.model('Marker');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/markers', isAuthenticated);

//api for all markers
router.route('/markers')
	
	//create a new marker
	.post(function(req, res){
		
		var marker = new Marker();
				marker.title = req.body.title;
        marker.text = req.body.text;
        marker.created_by = req.body.created_by;
        marker.save(function(err, marker) {
            if (err){
                return res.send(500, err);
            }
            return res.json(marker);
        });
	})
	// get all markers
	.get(function(req, res){
		Marker.find(function(err, markers){
			if(err){
			    return res.send(500, err);
			}
			return res.send(200,markers);
    });
	})

//api for a specfic marker
router.route('/markers/:id')
	
	//create
	.put(function(req,res){
		return res.send({message:'TODO modify an existing marker by using param ' + req.param.id});
	})

	//updates specified marker
	.put(function(req, res){
		Marker.findById(req.params.id, function(err, marker){
			if(err)
				res.send(err);

			marker.created_by = req.body.created_by;
			marker.text = req.body.text;

			marker.save(function(err, marker){
				if(err)
					res.send(err);

				res.json(marker);
			});
		});
	})

	//deletes the marker
	.delete(function(req, res) {
		Marker.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

module.exports = router;