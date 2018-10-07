import React from 'react';
import ReactDOM from 'react-dom';
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
    const selectedAuthor_ = sample(authors);
    const answer_ = sample(shuffle(selectedAuthor_.books));
    const allBooks_ = authors
                        .filter(author => {return selectedAuthor_ !== author})
                        .reduce(function(p, c, i){
                            return p.concat(c.books); }, []
                        );
    const fourRandomBooks_ = shuffle(allBooks_).slice(0,3);
    fourRandomBooks_.push(answer_);
        
    
    const allBooks = authors.reduce(function(p, c, i){
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);




    return {
        books: fourRandomBooks_,
        author: selectedAuthor_
    }
}

const state = {
    turnData: getTurnData(authors)
}

ReactDOM.render(<AuthorQuiz {...state} />, document.getElementById('root'));
registerServiceWorker();
