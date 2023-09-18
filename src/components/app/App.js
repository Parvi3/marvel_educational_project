import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        {/* В этот компонент приходит Id персонажа и передается в state: selectedChar */}
                        <ErrorBoundary>
                            <CharList propOnCharSelected={this.onCharSelected} />
                        </ErrorBoundary>
                        {/* В этот компонент уже передается пришедший Id в state из onCharSelected  из компонента CharList */}
                        {/* <CharInfo propCharId={this.state.selectedChar} /> */}
                        <ErrorBoundary>
                            <CharInfo propCharId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;