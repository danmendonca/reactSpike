import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthorQuiz from './AuthorQuiz';

Enzyme.configure({adapter: new Adapter()});

const state = {
  turnData: {
    books: ['The shinning', 'IT', 'David Copperfield', 'Harry Potter and the sorcerers stone'],
    author:{
      name: "J.K. Rowling",
      imageUrl: "images/authors/jkrowling.jpg",
      imageSource: 'Wikimedia Commons',
      books: ['Harry Potter and the sorcerers stone']
    }
  },
  highlight: "none"
}


describe("Author Quiz", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });


  describe("When no answer has been selected", () => {
    let wrapper;
    
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}} />);
    })

    it('should have no background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
    })
  });


  describe("When wrong answer has been selected", () => {
    let wrapper;
    
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}} />);
    })

    it('should have red background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
    })
  });


  describe("When correct answer has been selected", () => {
    let wrapper;
    
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}} />);
    })

    it('should have green background color', () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
    })
  });


  describe("When the user selects his first answer", () => {
    let wrapper;
    const onAnswerSelectedHandler = jest.fn(); 

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelectedHandler} />);
      wrapper.find(".answer").first().simulate('click');
    })

    it('onAnswerSelectedHandler should be called', () => {
      expect(onAnswerSelectedHandler).toHaveBeenCalled();
    });

    it('should have received "The Shinning"', () => {
      expect(onAnswerSelectedHandler).toHaveBeenCalledWith(state.turnData.books[0]);
    });
  });
});
