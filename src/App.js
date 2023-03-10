import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

//adding the cards
const cardImages = [
  { "src": "img/croc.jpg", matched : false},
  { "src": "img/elephant.jpg", matched : false},
  { "src": "img/monkey.jpg", matched : false},
  { "src": "img/sloth.jpg", matched : false},
  { "src": "img/snake.jpg", matched : false},
  { "src": "img/tiger.jpg", matched : false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)



  //shuffle cards 
  const shuffleCards = () => {
    //making two instances of each card in the array 'cardImages'
    const shuffleCards = [...cardImages, ...cardImages]
      //shuffle the cards
      .sort(() => Math.random() - 0.5)
      //mapping cards and giving them an id
      .map((card) => ({...card, id:Math.random() }))

      //reset values
      setChoiceOne(null)
      setChoiceTwo(null)

      //set value of cards and turns
      setCards(shuffleCards)
      setTurns(0)
  }


  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){
      setDisabled(true)
      
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
            return{...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } 
      else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)



  //reset choices and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }


  //start a new game automatically 
    useEffect(() => {
      shuffleCards()
    }, [])


  return (
    <div className="App">
      <h1>Animal Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      
      <div className="card-grid">
      {cards.map(card => (
        <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          /> 
        ))}
    </div>
    <p>Turns : {turns}</p>
    </div>
  );
}

export default App
