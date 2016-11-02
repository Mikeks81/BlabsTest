import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		//base url
		host: 'https://itunes.apple.com',
		//query result
		results: "pearljam",
		//default url extension
		url: "/search?term=",
		// type of query (used for logic for partials on html)
		type: "search",
		//array to be filled with all past actions from template
		history: [],
		//Array of songs for individual album
		albumSongList: [],
		//Sets the above values then refreshes the router with new endpoint results, clears query input 
		setQuery: function(type,url,query){
			this.set('actions.type', type);
			this.set('actions.results', query);
			this.set('actions.url',url);
			this.get('target.router').refresh();
			this.setProperties({query: ""});
		},
		// on input query submit
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
		// sets values for top songs from results
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
		// sets values for individual song result
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
		//sets values for top albums
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
		//sets values for individual album result
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
		// sets the serch and navigation params in history array. 
		setHistory: function(query,url,type){
			var lastParams = {}
			lastParams.query = query;
			lastParams.url = url;
			lastParams.type = type;
			this.get('actions.history').pushObject(lastParams);
		},
		// gets the last history object in array sets the values and removes last item from history array 
		goBack: function(){
			var lastParams = this.get('actions.history');
			var lastHistoryItem = lastParams[lastParams.length-1];
			this.send('setQuery',
								lastHistoryItem.type,
								lastHistoryItem.url,
								lastHistoryItem.query
								);
			lastParams.pop();
		},
		// This probably can live somewhere other than here but as this is my first experience with ember.js I haven't read enough documentation. 
		// Seperate lookup for an albums songs if user chooses to view individual album details
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
					//takes song out from data.results for parsing on the template
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
