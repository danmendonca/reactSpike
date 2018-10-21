import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import './index.css';
import './bootstrap.min.css'
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import {shuffle, sample} from 'underscore';

const authors = [
    {
        name: "Mark Twain",
        imageUrl: "images/authors/marktwain.jpg",
        imageSource: "Wikimedia Commons",
        books: [
            "The adventures of Huckleberry Finn",
            "Life on the Mississipi",
            "Roughing"
        ]
    },
    {
        name: "J.K. Rowling",
        imageUrl: "images/authors/jkrowling.jpg",
        imageSource: "Wikimedia Commons",
        books: [
            "Harry Potter and the sorcerers stone"
        ]
    },
    {
        name: "J.R.R. Tolkien",
        imageUrl: "images/authors/jrrtolkien.jpg",
        imageSource: "Wikimedia Commons",
        books: [
            "The Hobbit",
            "The Lord of the Rings",
            "The Chronicles of Narnia"
        ]
    }
]

function getTurnData(){
    const selectedAuthor = sample(authors);
    const answer = sample(shuffle(selectedAuthor.books));
    const allBooks = authors
                        .filter(author => {return selectedAuthor !== author})
                        .reduce(function(p, c, i){
                            return p.concat(c.books); }, []
                        );
    const fourRandomBooks = shuffle(allBooks).slice(0,3);
    fourRandomBooks.push(answer);

    return {
        books: fourRandomBooks,
        author: selectedAuthor
    }
}

const state = {
    turnData: getTurnData(authors),
    highlight: ''
}

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function App(){
    return ( <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} /> );
}

function FutureForm({match}) {
    return <div>
        <h1>Future Form</h1>
        <p>{JSON.stringify(match)}</p>
    </div>;
}

function render(){
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/add" component={FutureForm} />
        </React.Fragment>
    </BrowserRouter>, 
    document.getElementById('root'));
}

render();
registerServiceWorker();
