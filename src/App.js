import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

//adding the cards
const cardImages = [
  { "src": "img/croc.jpg"},
  { "src": "img/elephant.jpg"},
  { "src": "img/monkey.jpg"},
  { "src": "img/sloth.jpg"},
  { "src": "img/snake.jpg"},
  { "src": "img/tiger.jpg"}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)



  //shuffle cards 
  const shuffleCards = () => {
    //making two instances of each card in the array 'cardImages'
    const shuffleCards = [...cardImages, ...cardImages]
      //shuffle the cards
      .sort(() => Math.random() - 0.5)
      //mapping cards and giving them an id
      .map((card) => ({...card, id:Math.random() }))

      //set value of cards and turns
      setCards(shuffleCards)
      setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      
      <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
          key={card.id} 
          card={card}
          /> 
        ))}
    </div>
    </div>
  );
}

export default App
