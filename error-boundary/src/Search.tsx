import React, { Component, ChangeEvent, FormEvent } from 'react';

interface SearchProps {
    initialValue: string;
    onSearch: (term: string) => void;
}

interface SearchState {
    searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            searchTerm: props.initialValue || '',
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: event.target.value });
    };

    handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onSearch(this.state.searchTerm);
    };

    render() {
        return (
            <div className="search">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                        placeholder="Search Pokémon..."
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;
