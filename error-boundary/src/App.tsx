import React, { Component } from 'react';
import Search from './Search';
import Results from './Results';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

interface Pokemon {
  name: string;
  url: string;
}

interface AppState {
  searchTerm: string;
  results: Pokemon[];
  loading: boolean;
  error: Error | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const searchTermLS = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: searchTermLS,
      results: [],
      loading: false,
      error: null,
    };
  }

  async componentDidMount() {
    await this.fetchData(this.state.searchTerm);
  }

  fetchData = async (term: string = '', offset: number = 0, limit: number = 20) => {
    this.setState(prevState => ({
      ...prevState,
      loading: true,
      error: null
    }));

    let url = `${POKEMON_API_BASE_URL}?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    let results: Pokemon[] = data.results;

    if (term) {
      results = results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    this.setState(prevState => ({ ...prevState, results }));

    this.setState(prevState => ({ ...prevState, loading: false }));
  };

  handleSearch = async (term: string) => {
    const trimmedTerm = term.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    await this.fetchData(trimmedTerm);
  };



  render() {
    const { searchTerm, results, loading, error } = this.state;

    return (
        <ErrorBoundary>
          <div className="app">
            <Search initialValue={searchTerm} onSearch={this.handleSearch} />
            {loading ? <p>Loading...</p> : <Results items={results} />}
            {error && <p>Error: {error.message}</p>}
            <button onClick={() => {
              this.setState((prevState) => ({ ...prevState, error: new Error('Test error') }));
            }}>Throw Error</button>
          </div>
        </ErrorBoundary>
    );
  }
}


export default App;


