$(function(){
	var getData = function(search){
		$('div.results-text').show()
		$('span.search-terms').text(search)
		params = {
			part: 'snippet',
			q: search,
			key: 'AIzaSyAysGOyXaQjk2UruWvaSdYjmn3FmH-4h-M',
			maxResults: '8'
		};
		url = 'https://www.googleapis.com/youtube/v3/search'
		$.getJSON(url, params, function(data){
			showResults(data.items);
		})
	}

	var buildCard = function(id, index, value) {
		$('div.card').show();
		var params = {
			description: value.snippet.description,
			thumb: value.snippet.thumbnails.default.url,
		}
		$('div.vid-' + index + '> .card').append(
					'<a href="https://www.youtube.com/channel/' + id + '"><div><img src="' + params.thumb + '"></div><div>' + (params.description == "" ? 'No description' : params.description) + '</div></a>');
		return
	}

	var showResults = function(results){
		var heightArray = []
		$.each(results, function(index, value){
			if(value.id.videoId == null) {
				buildCard(value.id.channelId, index, value);
			} else {
				buildCard(value.id.videoId, index, value);
			}
		})
		$('div.card').css('height', Math.max.apply(Math, heightArray));
	}

	$('input').keyup(function(event){
		if(event.which == 13) {
			$('div.card').children().remove();
			getData($('input#search-field').val());
		}
	})
})