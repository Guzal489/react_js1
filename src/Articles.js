import articles1 from './articles1';
import articles2 from './articles2';
import articles3 from './articles3';
import './index.css';
import React, { Component } from "react";

class Articles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            urls: [],
            isLoading: true,
            isJson: false
        };
    }

    postQuery(url){
        return fetch(url, { method: "GET", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }, }).then((response) => { 
            const contentType = response.headers.get("content-type"); 
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    this.setState({ isJson: true });
                    return response.json() 
                } else { 
                    return response.text() 
                }
            });
    }
    
    componentDidMount() {
        const fetchUrls = async () => {
            await this.postQuery('http://wordpress/wp-json/wp/v2/posts/').then(response => {
                let array = [];
                if(this.state.isJson && response instanceof Array && response.length > 0){
                    for(var i = 0; i < response.length; i++){
                        var url = [response[i].title.rendered, "/#/articlecomponent/"+response[i].id]
                        array.push(url);
                    }
                }
                this.setState({ urls: array });
                this.setState({ isLoading: false });
            })
        };
        fetchUrls();
    }
    
    render() {
        return (
            <div className="articles">
                {
                    this.state.urls.length > 0 ? this.state.urls.map((result, i) => ( <a key={i} href={result[1]}>{result[0]}</a> )) : this.state.isLoading ? <span>Загрузка новостей...</span> : <span>Новостей нет.</span>
                }
            </div>
        );
  }
}

export default Articles;
