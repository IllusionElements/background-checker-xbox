import { Template } from 'meteor/templating';

var blClans = ['XGN', 'KSI', 'TSB', 'ESB', 'GRM'];
var hide = 0;
const errors = new Map();
errors.set(1007, "Invalid Gamertag/Gamertag doesn't exist!");
errors.set(1029, 'The friends list is blocked');
const createMessageElement = ({ className, props }) =>
	`<h3 class='text-${className.textName}'>${props.msg}</h3>`;
const buildError = ({ code }) =>
	createMessageElement({
		className: {
			textName: 'warning',
		},
		props: {
			msg: errors.get(code),
		},
	});
const friendsList = (() => {
	function isOpen({ data, searchText }) {
		Session.set('checkVal', 1);
		Session.set('tags', data);
		Session.set('name', searchText);
	}

	function isBlocked({ data: { code }, searchText }) {
		Session.set(error, `ERROR 1029: ${errors.get(code)}`);
		Session.set('checkVal', 0);
		Session.set(
			'gamertag',
			createMessageElement({
				className: {
					textName: 'danger',
				},
				props: {
					msg: `${searchText} has their friends list blocked`,
				},
			})
		);
	}

	return { isOpen, isBlocked };
})();

const profileState = (() => ({
	invalidGamertag(data) {
		Session.set('checkVal', 0);
		Session.set('gamertag', buildError(data));
	},
}))();

const setSessionState = (function() {
	return {
		friendsList,
		profileState,
	};
})();
// Search  Events
Template.search.events({
	'submit #search': function(e) {
		e.preventDefault();
		let searchText = event.target.gt_name.value; //grabs the text from the search box and puts it as the search text var
		Meteor.call('searchFriends', searchText, (err, friends) => {
			//call the xbox-live api by passing searchText as the search parameter
			var data = friends.data;
			Session.set('hideVal', 1);
			if (err) {
				Session.set('error', error);
			} else if (data.code && data.code === 1029) {
				//api response is different if it cannot retrieve friends; code 1029: is for blocked friends list
				setSessionState.friendsList.isBlocked({ data, searchText });
			} else if (data.code && data.code === 1007) {
				//data.code: 1007 references a invalid gamertag.
				setSessionState.profileState.invalidGamertag(data);
			} else {
				//using the lookup gamertag and loading it onto session variables as last of the if loop
				setSessionState.friendsList.isOpen({ data, searchText });
			}
		});
	},
});

Template.registerHelper('keys', function iterate(results) {
	const check = Session.get('check');
	return check === 0
		? []
		: Object.keys(results).map(name => ({
				name: results[name].Gamertag,
			}));
});

Template.friends.helpers({
	check_if_eql_one() {
		return Session.get('hideVal');
	},
	getCheck() {
		return Session.get('checkVal');
	},
	'friends.tags'() {
		return Session.get('tags');
	},
	'friends.gamertag'() {
		return Session.get('gamertag');
	},
});

Template.tags.helpers({
	gamertag() {
		return Session.get('name');
	},
});

Template.layout.helpers({
	check_if_init() {
		return Session.get('hideVal') == 1;
	},
});

Template.profile.helpers({
	profile() {
		return Session.get('profile');
	},
});
