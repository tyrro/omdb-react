import requests

API_KEY = '71a8f47a'
API_URL = 'http://www.omdbapi.com/?apiKey=' + API_KEY

def call_api(query):
    return requests.get(API_URL + query)

def search_by_imdb_id(imdb_id, sanitize: False):
    query = '&i=' + imdb_id
    response = call_api(query).json()
    if not sanitize:
        return response

    return {
        'Title'   : response.get('Title'),
        'Year'    : response.get('Year'),
        'imdbID'  : response.get('imdbID'),
        'Type'    : response.get('Type'),
        'Poster'  : response.get('Poster'),
        'favorite': True
    }

def sanitized_response(query, current_user):
    response = call_api(query).json()
    if (response['Response'] == 'False'):
        return []
    else:
        return assign_favorite_flag(response, current_user)

def assign_favorite_flag(response, current_user):
    search_response = response.get('Search') or [response]

    fav_movies = current_user.favorite_movies.copy()
    for i in range(len(fav_movies)):
        fav_movies[i] = fav_movies[i].imdb_id

    for i in range(len(search_response)):
        search_response[i]['favorite'] = search_response[i]['imdbID'] in fav_movies

    return search_response
