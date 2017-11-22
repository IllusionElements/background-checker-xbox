Router.configure({
	layoutTemplate: 'layout'

});

Router.map(function(){
	this.route('/', function(){
		this.render('search')
	});
});

Router.map(function(){
	this.route('/friends', function(){
		this.render('searchLayout')
	});
});