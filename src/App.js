import React, { Component } from 'react'

import { Cards, Chart, Country } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from'./images/corona.png';

class App extends React.Component{

    /* In order to display the data from ComponentDidMount to Cards We need to use state*/

    state = {
        data:{}, // Initially this data is empty until it is populated by the request inside ComponentDidMount
        country:'',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();

        this.setState({data:fetchedData});
        
    }

    handleCountryChange = async (country)=>{

         //fetch data
        const fetchedData = await fetchData(country);

        //set the state
        this.setState({ data: fetchedData, country: country});
    }

    render(){

        const { data , country} = this.state;
        return(

            <div className={styles.container}>
                
                <img src={coronaImage} className={styles.image} alt="COVID-19"/>
                               
                <Cards className={styles.cards} data = {data}/>
                <Country handleCountryChange={this.handleCountryChange}/>
                <Chart data = {data} country = {country}/>
            </div>
        );
    }
}

export default App;