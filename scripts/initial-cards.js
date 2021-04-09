import { Card } from './Card.js'
import { containerListCard } from './constants.js'

const initialCards = [
  {
    name: 'Эверест',
    link: 'https://i.ibb.co/qpkfHd4/image.jpg'
  },
  {
    name: 'Канченджанга',
    link: 'https://i.ibb.co/bFpsJg8/image.jpg'
  },
  {
    name: 'Аннапурна',
    link: 'https://i.ibb.co/L9h8cz0/image.jpg'
  },
  {
    name: 'Манаслу',
    link: 'https://i.ibb.co/pWRvzg9/image.jpg'
  },
  {
    name: 'Дхаулагири',
    link: 'https://i.ibb.co/5YDJTGr/image.jpg'
  },
  {
    name: 'Чогори',
    link: 'https://i.ibb.co/4SmLZvJ/image.jpg'
  }
]

initialCards.forEach( (item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();

  containerListCard.append(cardElement);
});

