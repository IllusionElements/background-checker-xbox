import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const Meteo = {};

Meteo.settings = {
  "public": {},
  "private": {
    "masterKey": {
     "apiKey":  "",
  }
  }
  
}


class XboxAPI {
  constructor() {
    const { apiKey } = Meteo.settings.private.masterKey;
    this.apiKey = apiKey;
    this.methods = {
      profile: {
        gamercard() {
          return { type: 'GET', endpoint: `/gamercard` };
        },
        friends({ gamertag }) {
          return { type: 'GET', endpoint: `/friends` };

        },        
      },
      search: {
        gamercard({ gamertag }) {
          return { type: 'GET', endpoint: `/${gamertag}/gamercard` };
        },
        friends({ gamertag }) {
          return { type: 'GET', endpoint: `/${gamertag}/friends` };

        },
      },

    };
  }

  buildRequestArguments(type,options) {
    const payload = {};
    if (type === 'GET') {
      payload["X-AUTH"] = `${this.apiKey}` || {};
    } else {
      console.log("err");
    }
    
    
      
    return payload;
  }
  
 


  request(action, params) {
    const type = action.type;
    const url = `https://xboxapi.com/v2${action.endpoint}`;
    const args = {headers: this.buildRequestArguments(type, params)};
    console.log([type, url, args])
    const request = HTTP.call(type, url, args);
    return request;
  }

		

  action(action, method, params) {
    const methodToCall = this.methods[action][method](params);
    return this.request(methodToCall, params);
  }

  search(method, params) {
    return this.action('search', method, params);
  }

  profile(method, params) {
    return this.action('profile', method, params);
  }
}

export const Xbox = new XboxAPI();

