import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    // для более чистого кода присвоил часть ссылки переменной
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=1d308d1bbc779800b5c09e8defb48565';
    const _baseOffset = 210;

    // функция возвращает массив из персонажей 
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    // функция возвращает одного персонажа по уникальному id
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // функция возвращает свойства каждого элемента из массива 
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return { loading, error, clearError, getAllCharacters, getCharacter }
}

export default useMarvelService;