'use strict';


/**
 * AppController
 *
 * NodeJS version ES6
 * @category Assessment
 * 
 * @module
 * @author   Marcelo Rusconi <mgrusconi@gmail.com>
 *
 */


const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const config = require('../../../config/');

const request = Promise.promisifyAll(require('request'));

class AppController{
  
  /**
   * Método que permite al usuario identificarse.
   * Method that allows the user to identify.
   *
   * @param \ req, res, next
   * @return \Json
   */
  login(req, res, next) {
    const key = config.security.private_key;
    const createToken = (user) => {
      let token = jwt.sign(user, key, {
        expiresIn: 60 * 60 * 5
      });
      return token;
    };
    
    request.getAsync({
      url: config.resources.users, 
      method: 'GET'
    }).then((doc)=>{
      let rs = JSON.parse(doc.body);
      let authUser = rs.clients.filter((user)=>{
        if(user.email == req.body.email){
          return user;
        }
      });

      if(authUser.length > 0){
        return res.status(200).json({'user_token': createToken(authUser[0])});
      }else{
        return res.status(404).json({'message': 'User not Found'});
      }
    }).catch(err => next(err));
  }

  /**
   * Método que permite obtener un usuario segun su id o nombre.
   * Method that allows to obtain a user according to his id or name.
   *
   * @param \ req, res, next
   * @return \Json
   */
  getUser(req, res, next) {
    request.getAsync({
      url: config.resources.users, 
      method: 'GET'
    }).then((doc)=>{
      let rs = JSON.parse(doc.body);
      let authUser = rs.clients.filter((user)=>{
        if(user[req.params.type] == req.params.value){
          return user;
        }
      });

      if(authUser.length > 0){
        return res.status(200).json({'user': authUser[0]});
      }else{
        return res.status(404).json({'message': 'User not Found'});
      }
    }).catch(err => next(err));
  }

  /**
   * Método que permite obtener un listado de pólizas segun el nombre de un usuario.
   * Method that allows to obtain a list of policies according to the name of a user.
   *
   * @param \ req, res, next
   * @return \Json
   */
  getPoliciesByUser(req, res, next) {
    request.getAsync({
      url: config.resources.users, 
      method: 'GET'
    }).then((doc)=>{
      let rs = JSON.parse(doc.body);
      let authUser = rs.clients.filter((user)=>{
        if(user.name == req.params.name){
          return user;
        }
      });
      if(authUser.length > 0){
        request.getAsync({
          url: config.resources.policies, 
          method: 'GET'
        }).then((doc)=>{
          let rs = JSON.parse(doc.body);
          let policies = rs.policies.filter((policy)=>{
            if(policy.clientId == authUser[0].id){
              return policy;
            }
          });
          if(policies.length > 0){
            return res.status(200).json({'policies': policies});
          }else{
            return res.status(404).json({'message': 'Policies not Found'});
          }
        }).catch(err => next(err));
      }else{
        return res.status(404).json({'message': 'User not Found'});
      }
    }).catch(err => next(err));   
  }

  /**
   * Método que permite obtener un usuario segun el id de una poliza.
   * Method that allows to obtain a user a user according to the id of a policy.
   *
   * @param \ req, res, next
   * @return \Json
   */
  getUserByPolicy(req, res, next) {
    request.getAsync({
      url: config.resources.policies, 
      method: 'GET'
    }).then((doc)=>{
      let rs = JSON.parse(doc.body);
      let policies = rs.policies.filter((policy)=>{
        if(policy.id == req.params.id){
          return policy;
        }
      });
      if(policies.length > 0){
        request.getAsync({
          url: config.resources.users, 
          method: 'GET'
        }).then((doc)=>{
          let rs = JSON.parse(doc.body);
          let users = rs.clients.filter((user)=>{
            if(user.id == policies[0].clientId){
              return user;
            }
          });
          if(users.length > 0){
            return res.status(200).json({'user': users[0]});
          }else{
            return res.status(404).json({'message': 'User not Found'});
          }
        }).catch(err => next(err));
      }else{
        return res.status(404).json({'message': 'Policy not Found'});
      }
    }).catch(err => next(err));   
  }
}

module.exports = new AppController;