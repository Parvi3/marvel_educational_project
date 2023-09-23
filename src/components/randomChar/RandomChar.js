import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../service/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // для создания нового запроса
    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
    }, [])

    // функция для отмены спиннера при загрузке персонажа
    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    // функция для показа спиннера во время загрузки персонажа
    const onCharLoading = () => {
        setLoading(false);
    }

    // функция срабатывает при ошибке
    const onError = () => {
        setLoading(false);
        setError(true);
    }

    // функция случайным образом выдает id и передает дальше по цепочке
    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
        // this.marvelService.getAllCharacters().then(res => console.log(res))
        // this.marvelService.getCharacter(id).then(res => { this.setState(res) })
    }

    const spinner = loading ? <Spinner /> : null; // если загрузка еще идет, то показывает спиннер
    const errorMessage = error ? <ErrorMessage /> : null; // показывает гифку, если error правда
    const content = !(loading || error) ? <View char={char} /> : null; // показывает контент если всё верно

    return (
        <div className="randomchar">

            {spinner}
            {errorMessage}
            {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}


// для более чистого кода и читаемости блок с описанием персонажа был вынесен
const View = ({ char }) => {

    const { thumbnail, name, description, homepage, wiki } = char;

    // данный участок кода нужен когда нет у персонажа фотки, чтобы в дефольтной фотке текст выровнять 
    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;