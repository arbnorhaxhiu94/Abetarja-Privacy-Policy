import axios from "axios";
import { Component } from "react";

class Nationalize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            data: null,
            country_name: ''
        }
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            name: e.target.value
        })
    }

    search = () => {
        fetch(`https://api.nationalize.io/?name=${this.state.name}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            this.setState({
                data: data
            })
        })
        .catch((e) => console.log(e))
    }

    searchCountry = (country_id) => {
        axios.get(`https://restcountries.eu/rest/v2/alpha/${country_id}`)
        .then((response) => {
            console.log(response.data)
            this.setState({
                country_name: response.data?.name
            })
        })
        .catch((e) => console.log(e))
    }

    render() {
        return (
            <div>
                <h1>Find your name nationality</h1>
                <input 
                    id='name'
                    name='text' 
                    value={this.state.name}
                    placeholder='First name' 
                    onChange={(e) => this.onChange(e)} />
                <button onClick={this.search}>
                    Search
                </button>

                {this.state.data && 
                <div style={{width: '100%', alignItems: 'center'}}>
                    <h3>Name: {this.state.data?.name}</h3>
                    <table style={{width: '100%'}}>
                        <thead>
                            <tr>
                                <td>Country Code</td>
                                <td>Probability</td>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.data?.country?.map(country => {
                            return (
                                <tr key={country?.country_id}>
                                    <td>{country?.country_id}</td>
                                    <td>{country?.probability.toString().substring(2,4)}%</td>
                                    <td>
                                        <button onClick={() => this.searchCountry(country?.country_id)}>
                                            Search country name
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) }
                        </tbody>
                    </table>

                    <h3>{this.state.country_name}</h3>
                </div> }
            </div>
        )
    }
}

export default Nationalize;