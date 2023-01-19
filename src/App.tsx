import {useEffect, useState} from 'react';
import './App.css';

/** interfaces / types */
export interface Weather {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

function App() {
    const [cardList, setCardList] = useState<Weather[]>([]);
    const [searchCity, setSearchCity] = useState<string>('Americana');
    const [searchBtnDisabled, setSearchBtnDisabled] = useState<boolean>(true);
    const [clearBtnDisabled, setClearBtnDisabled] = useState<boolean>(true);

    useEffect(() => {
        // código a ser executado no inicio do componente
    }, []);

    /** weather api methods */
    const getWeatherData = (city: string): Promise<Weather> => {
        const apiKey = '2b8a3c1f6eaff1eef2b91e2de29086e5';
        return new Promise((resolve, reject) => {
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.cod === '404') throw new Error(data);

                    resolve(data);
                })
                .catch(reject);
        });
    };

    const handleSearchChange = (event: any) => {
        const value = event.target.value.trim();
        setSearchCity(value);
        const disableSearchButton = !value;
        setSearchBtnDisabled(disableSearchButton);
    };

    const removeCard = (index: number) => {
        const cardListWithoutRemovedCard = cardList.filter((el, i) => i !== index);
        setCardList(cardListWithoutRemovedCard);
    };

    const clearHandler = (): void => {
        setCardList([]);
        setClearBtnDisabled(true);
    };

    const searchHandler = (): void => {
        const city = searchCity.trim();
        if (!city) {
            return;
        }

        getWeatherData(city)
            .then((data: Weather) => {
                setCardList((state) => [...state, data]);
                setClearBtnDisabled(false);
            })
            .catch(() => alert('Cidade não encontrada, tente novamente'));
    };

    return (

        <div className="App" style={{display:'flex', flexDirection:'column'}}>
            <div id="add-sense">
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2203898998088816"
                        crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                     style={{display: "block", backgroundColor: "grey"}}
                     data-ad-client="ca-pub-2203898998088816"
                     data-ad-slot="3688204235"
                     data-ad-format="auto"
                     data-adtest="on"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>
            <h1>Seu Clima Tempo</h1>
            <h2>Sua pesquisa simples da previsao do tempo</h2>
            <div className="row">
                <div className="col s12" style={{alignItems:'center'}}>
                    Digite sua cidade para saber a previsão do tempo:
                    <div className="input-field inline">
                        <input
                            id="city"
                            type="text"
                            className="validate"
                            style={{width: '25rem', height: '2rem', borderRadius: '5px', margin:'12px'}}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button
                        disabled={searchBtnDisabled}
                        id="search"
                        style={{margin:'1rem'}}
                        className="waves-effect waves-light btn"
                        onClick={searchHandler}
                    >
                        Search
                    </button>
                    <button
                        disabled={clearBtnDisabled}
                        id="clear"
                        className="waves-effect waves-light btn"
                        onClick={clearHandler}
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="row">
                {
                    cardList.length > 0 && (
                        <div className="col s12 m6" id="result">
                            {
                                cardList.map((card, index) => (
                                    <div className="card blue-grey darken-1" key={index}>
                                        <div className="card-content white-text">
                                            <span className="card-title">Cidade: {card.name}</span>
                                            <p>
                                                Temperatura: {card.main.temp}º
                                                <img
                                                    src={`https://openweathermap.org/img/wn/${card.weather[0].icon}.png`}
                                                />
                                            </p>
                                            <p>{card.weather[0].description}</p>
                                        </div>
                                        <div className="card-action">
                                            <a href="#" onClick={() => removeCard(index)}>
                                                Remove card
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div>
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2203898998088816"
                        crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                     style={{display:"block",    backgroundColor: "grey"}}
                     data-ad-client="ca-pub-2203898998088816"
                     data-ad-slot="5927354761"
                     data-ad-format="auto"
                     data-adtest="on"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
            </div>

        </div>
    )

}

export default App;
