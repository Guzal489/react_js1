import React, { Component } from "react";

class Article extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			created: "",
			modified: "",
			author: "",
			authorId: 0,
			content: "",
			authorImage: "",
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
		var id = this.props.match.params.id;
		const fetchUrls = async () => {
			await this.postQuery('http://wordpress/wp-json/wp/v2/posts/'+id).then(response => {
				if(this.state.isJson){
					this.setState({ authorId: response.author });
					this.setState({ created: response.date });
					this.setState({ modified: response.modified });
					this.setState({ content: response.content.rendered });
					this.setState({ title: response.title.rendered });
				}
			})
		};
		fetchUrls();
	}
	render() {
    return (
        <div className="article">
			<div className="article_header">
				<div className="article_header_left">
					<div className="author">
						<div className="author_image"><img src={this.state.authorImage} /></div>
						{ this.state.author == "" ? <span>Загрузка автора</span> : <span>Автор <b>{this.state.author}</b></span> }
					</div>
				</div>
				<div className="article_header_center">
					{ this.state.title == "" ? <span>Загрузка названия статьи</span> : <span>{ this.state.title }</span> }
				</div>
				<div className="article_header_right">
				    { this.state.created == "" ? <span>Загрузка даты создания</span> : <span className="created">Создано {this.state.created}</span> }
					{ this.state.modified == "" ? <span>Загрузка даты последнего изменения...</span> : <span className="modifed">Изменено {this.state.modified}</span> }
				</div>
			</div>
			{ this.state.content == "" ? <div className="article_content"><span>Загрузка контента</span></div> : <div className="article_content" dangerouslySetInnerHTML={{__html: this.state.content}}></div> }
			<div className="article_footer">
				<button onClick={event =>  window.location.href='/#/articles'}>К списку статей</button>
			</div>
        </div>
    );
  }
}

export default Article;