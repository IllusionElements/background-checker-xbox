import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

var blClans = ['XGN', 'KSI', 'TSB', 'ESB', 'GRM'];
var blk = "<h3 class='text-danger'>The friends list is blocked</h3>";
var inv = "<h3 class='text-warning'>Invalid Gamertag/Gamertag doesn't exist</h3>";
var check; 
var hide = 0;
const fetch = Meteor.call;

// Search  Events

Template.search.events({
	'submit #search': function(f) {
		f.preventDefault();
		let searchText = event.target.gt_name.value;
		hide = 1;
		Session.set('hideVal', hide);
		fetch('getProfile',searchText,(err, resp) => {
			const data = resp.data;
			if(err){
				console.log(err);
			} else if(data.hasOwnProperty("code")){
				
				Session.set('fail', inv);
			} else {
				const profile = {
					'name': data.gamertag,
					'location': data.location,
					'gamerscore': data.gamerscore,
					'bio': data.bio,
					'tier': data.tier,
					'imgURL': data.avatarBodyImagePath,
				};
				Session.set('profile', profile);
				console.log(profile.name);
			}
		});
	}
})


// Template.search.events({
// 	'submit #search': function(e){
// 		e.preventDefault();
// 		let searchText = event.target.gt_name.value; //grabs the text from the search box and puts it as the search text var
// 		let blkd = "<h3 class='text-danger'>"+searchText + " has their friends list blocked</h3>"
// 		Meteor.call('searchFriends', searchText, (err, friends) => { //call the xbox-live api by passing searchText as the search parameter
// 			var data = friends.data;
// 			hide = 1;
// 			Session.set('hideVal',hide);
// 			if(err){
// 				console.log(err+"help");
// 			} else if(data.hasOwnProperty("code") && data.code == 1029){ //api response is different if it cannot retrieve friends; code 1029: is for blocked friends list
// 				check = 0;
// 				console.log("Err: "+data.code + " blocked");
// 				Session.set('checkVal', check);
// 				Session.set('gamertag', blkd); 
				
// 			} else if(data.hasOwnProperty("code") && data.code == 1007){ //data.code: 1007 references a invalid gamertag.
// 				check = 0;
// 				console.log("invalid gt");
// 				Session.set('checkVal', check);
// 				Session.set('gamertag', "<h3 class='text-warning'>Invalid Gamertag/Gamertag doesn't exist</h3>");
// 			} else { //using the lookup gamertag and loading it onto session variables as last of the if loop
// 				check = 1;
// 				console.log(data[0]);
// 				Session.set('checkVal', check);
// 				Session.set('tags', data);
// 				Session.set('name', searchText);
// 			}
// 		})
// 	}
// })



Template.registerHelper('keys', function iterate(h){ 
	var result = [];
	if(check !==0){	
		for (var key in h){
			if(h.hasOwnProperty(key)){
				result.push({name:h[key].Gamertag});
			}
		
		}
	} 
	console.log(result);
  return result;
});

Template.friends.helpers({
	check_if_eql_one: function() {
		const val = Session.get('hideVal'); 
		console.log(val);
		return val;
	},
	
	friend: function() {
		if(check !== 0) {
			console.log(check);
			return Session.get('tags');
			
		} else {
			console.log(check);
			return Session.get('gamertag');
		}
		
	}
	
})

Template.tags.helpers({
	gamertag: function(){
		return Session.get('name');
	}
	
});

Template.layout.helpers({
	check_if_init: function(){
		const value = Session.get('hideVal'); 
		console.log(value);
		return value == 1;
	}
})

Template.profile.helpers({ profile: function(){
	return Session.get('profile');
}});