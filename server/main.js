
import {Xbox} from '../server/xboxAPI.js';
Meteor.methods({
	'getProfile'(searchText){
		console.log( Xbox.search('gamercard', {gamertag: searchText}));
		return Xbox.search('gamercard', {gamertag: searchText})
	},
	'searchFriends'(searchText){
		return Xbox.search('friends',{gamertag: searchText})
	},
	'myProfile'(){
		return Xbox.profile('gamercard',{});
	},
	'myFriends'(){
		return Xbox.friends('gamercard',{});
	}
});
