$(function(){
	var nextPageToken = '';
	var prevPageToken = '';
	var getData = function(search, page){
		$('input#search-field').val('');
		$('div.results-text').show();
		$('span.search-terms').text(search);
		params = {
			part: 'snippet',
			q: search,
			key: 'AIzaSyAysGOyXaQjk2UruWvaSdYjmn3FmH-4h-M',
			maxResults: '8',
			pageToken: ''
		};
		params.pageToken = page;
		url = 'https://www.googleapis.com/youtube/v3/search'
		$.getJSON(url, params, function(data){
			nextPageToken = data.nextPageToken;
			prevPageToken = data.prevPageToken
			showResults(data.items);
			showMore(data);
		})
	}

	var buildCard = function(id, index, value) {
		$('div.card').show();
		var params = {
			description: value.snippet.description,
			thumb: value.snippet.thumbnails.default.url,
		}
		$('div.vid-' + index + '> .card').append(
					'<a href="https://www.youtube.com/channel/' + id + '"><div><img src="' + params.thumb + '"></div><div><p>' + (params.description == "" ? 'No description' : params.description) + '</p></div></a>');
	}

	var showResults = function(results){
		$.each(results, function(index, value){
			if(value.id.videoId == null) {
				buildCard(value.id.channelId, index, value);
			} else {
				buildCard(value.id.videoId, index, value);
			}
		})
	}

	var showMore = function(results){
		console.log(true)
		$('div.more-results').show();
		$('div.more-results span').text('')
		if(results.nextPageToken == null && results.prevPageToken == null) {
			$('div.more-results h3').text('No More Results')
		} else if (results.prevPageToken == null) {
			$('div.more-results h3').text('More Results');
			$('span.next').text('Next')
		} else if (results.nextPageToken == null) {
			$('div.more-results h3').text('More Results');
			$('span.previous').text('Prev')
		} else {
			$('div.more-results h3').text('More Results');
			$('span.next').text(' Next')
			$('span.previous').text('Prev \\')
		}
	}

	$('input').keyup(function(event){
		if(event.which == 13) {
			$('div.card').children().remove();
			getData($('input#search-field').val());
		}
	})

	$('span').on('click', function(event){
		if($(this).hasClass('previous')){
			$('div.card').children().remove();
			getData($('span.search-terms').text(), prevPageToken);
		} else if($(this).hasClass('next')){
			$('div.card').children().remove();
			getData($('span.search-terms').text(), nextPageToken);
		}
	})
})