import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		var url = 'https://itunes.apple.com';
		var query = this.controllerFor('itunes').get('actions.results');
		var search = this.controllerFor('itunes').get('actions.url');
		var type = this.controllerFor('itunes').get('actions.type');
		var albumSongs = this.controllerFor('itunes').get('actions.albumSongList');
		
		var resultHash = Ember.RSVP.hash({
			ajax: $.ajax({
							method: 'GET',
							dataType: 'jsonp',
							url: url + search + query,
							success: function(data){
								return data;
							},
							error: function(request, textStatus, errorThrown){
								console.log(errorThrown);
							}
						}),
			type: type,
			albumSongs: albumSongs
		});
		return resultHash
	}
	
});
