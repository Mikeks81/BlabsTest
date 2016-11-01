import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		host: 'https://itunes.apple.com',
		results: "pearljam",
		url: "/search?term=",
		type: "search",
		history: [],
		albumSongList: [],
		setQuery: function(type,url,query){
			this.set('actions.type', type);
			this.set('actions.results', query);
			this.set('actions.url',url);
			this.get('target.router').refresh();
			this.setProperties({query: ""});
		},
		searchItunes: function(){
			this.send('setHistory',
					 this.actions.results,
					 this.actions.url,
					 this.actions.type);
			var query = this.query;
			var type = "search";
			var url = "/search?term=";
			this.send('setQuery',type,url,query);
		},
		artistSongs: function(artistId){
			this.send('setHistory',
					 this.actions.results,
					 this.actions.url,
					 this.actions.type);
			var url = "/lookup?id="+artistId+"&entity=song&limit=10&sort=popularity"
			var query = "";
			var type = "songs"
			this.send('setQuery',type,url,query);
		},
		artistSong: function(trackId){
			this.send('setHistory',
					 this.actions.results,
					 this.actions.url,
					 this.actions.type);
			var url = "/lookup?id="+trackId+"&entity=song";
			var query = "";
			var type = "song";
			this.send('setQuery',type,url,query);
		},
		artistAlbums: function(artistId){
		this.send('setHistory',
					 this.actions.results,
					 this.actions.url,
					 this.actions.type);	
			var url = "/lookup?id="+ artistId+"&entity=album&limit=10";
			var query = "";
			var type = "albums";
			this.send('setQuery',type,url,query);
		},
		artistAlbum: function(collectionId){
			this.send('setHistory',
					 this.actions.results,
					 this.actions.url,
					 this.actions.type);
			this.send('albumSongsLookUp', collectionId);
			var url = "/lookup?id="+collectionId+"&entity=album";
			var query = "";
			var type = "album";
			this.send('setQuery',type,url,query);
		},
		setHistory: function(query,url,type){
			// sets the serch and navigation params in 
			// history array. 
			var lastParams = {}
			lastParams.query = query;
			lastParams.url = url;
			lastParams.type = type;
			this.get('actions.history').pushObject(lastParams);
		},
		goBack: function(){
			// gets the last history object in array 
			var lastParams = this.get('actions.history');
			var lastHistoryItem = lastParams[lastParams.length-1];
			this.set('actions.results', lastHistoryItem.query);
			this.set('actions.url', lastHistoryItem.url);
			this.set('actions.type', lastHistoryItem.type);

			this.get('target.router').refresh();
			lastParams.pop();
		},
		albumSongsLookUp: function(collectionId){
			var self = this;
			this.set('actions.albumSongList', []);
			console.log(this.actions.albumSongList);
			$.ajax({
				method: 'GET',
				dataType: 'jsonp',
				url: 'https://itunes.apple.com/lookup?id='+collectionId+'&entity=song',
				success: function(data){
					var songArr = data.results;
					console.log(data.results.length);
					for(var i=0; i < songArr.length; i++){
						self.get('actions.albumSongList').pushObject(songArr[i]);
					}
				},
				error: function(request, textStatus, errorThrown){
					console.log(errorThrown);
				}
			});
		}	
	}
});
