const express = require('express');
const User = require('../models/item');

const userRouter = express.Router();



// itemRouter.get('/items', callbackFunction)


userRouter
  .route('/users')
  .post(function (request, response) {

    console.log('POST /users');

    const user = new User(request.body);

    user.save();

    response.status(201).send(user);
  })
  .get(function (request, response) {

    console.log('GET /users');

    User.find(function (error, users) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(users);

      response.json(users);
    });
  });

userRouter
  .route('/users/:userId')
  .get(function (request, response) {

    console.log('GET /users/:userId');

    let userId = request.params.userId;

    User.findOne({ id: userId }, function (error, user) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(user);

      response.json(user);

    });
  })
  .put(function (request, response) {

    console.log('PUT /users/:userId');

    let userId = request.params.userId;

    User.findOne({ id: userId }, function (error, user) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (user) {
        user.name = request.body.name;
        user.description = request.body.description;
        
        user.save();

        response.json(user);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /users/:userId');

    let userId = request.params.userId;

    User.findOne({ id: userId }, function (error, user) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (user) {

        for (let property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof user[property] !== 'undefined') {
              user[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   user.name = request.body.name;
        // }

        // if (request.body.description) {
        //   user.description = request.body.description;
        // }


        user.save();

        response.json(user);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /users/:userId');

    let userId = request.params.userId;

    User.findOne({ id: userId }, function (error, user) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (user) {
        user.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'User with id ' + userId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'User with id ' + userId + ' was not found.'
        });
      }
    });
  });

module.exports = userRouter;