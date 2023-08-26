# Social Network API

## Description
This application serves as the back-end of a social networking API. It allows for users to be created and modified. Users can be linked as friends and create thoughts which can be modified as well. These thoughts can also have reactions from other users.

[Walktrough Video](https://drive.google.com/file/d/1a5jJU084AiR7eVWEFiYvIkolWC2XDBae/view?usp=sharing)
## Built With
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/about)
* [Express](https://expressjs.com/en/guide/routing.html)
* [MongoDB](https://www.mongodb.com/docs/)
* [Mongoose](https://mongoosejs.com/docs/)

## Installation

To install necessary dependancies, run the following command: 

```
npm i
```
## Usage
The user must download the repository from Github and install its dependencies. The user can then run ```npm start``` to start the API. The user can then follow the conventions laid out in the controllers files to perform the CRUD operations.

## Learning Points
* Using MongoDB instead of SQL
* Using Mongoose to model MongoDB objects
* Separating the controller and route 


## Important Code
```js
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    }]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);
```
This code shows the construction of the user schema

## Author Info

### Timothy Su

* [LinkedIn](https://www.linkedin.com/in/timothysu1/)
* [Github](https://github.com/timothysu1)

## License

Please refer to license in the repo. 


## Contributions
Mongoose Docs: https://mongoosejs.com/docs/