import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Home.module.css';
import Card from '../../components/Card/Card';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [role, setRole] = useState('user');
  const [socials, setSocials]: any = useState([]);
  const navigate = useNavigate();

  const addSocialInput = () => {
    setSocials([...socials, { name: '', url: '' }]);
  };

  const handleSocialChange = (e: any, idx: number) => {
    const { name, value } = e.target;
    const list = [...socials];
    list[idx][name] = value;
    setSocials(list);
  };

  const getCards = async () => {
    try {
      const response = await axios.get('http://localhost:3001/cards', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCards(response.data.cards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getCards();
      setRole(localStorage.getItem('role') || 'user');
    } else {
      navigate('/auth');
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Cards</h2>
      <div className={styles.sectionWrapper}>
        <div className={styles.addCard}>
          <input
            className={styles.addCard__input}
            type='text'
            placeholder='name'
          />
          <input
            className={styles.addCard__input}
            type='text'
            placeholder='description'
          />
          <input
            className={styles.addCard__input}
            type='text'
            placeholder='interests. eg: games, coding'
          />
          <div className={styles.socialsInputHeader}>
            <p>Socials</p>
            <button onClick={addSocialInput}>Add</button>
          </div>

          <div className={styles.socialsInputContainer}>
            {socials.map((social: any, idx: number) => (
              <div key={`social-${idx}`}>
                <input
                  className={styles.socialsInput__input}
                  type='text'
                  name='name'
                  placeholder='name'
                  value={social.name}
                  onChange={(e) => handleSocialChange(e, idx)}
                />
                <span>:</span>
                <input
                  className={styles.socialsInput__input}
                  type='text'
                  name='url'
                  placeholder='url'
                  value={social.url}
                  onChange={(e) => handleSocialChange(e, idx)}
                />
              </div>
            ))}
          </div>
          <button
            className={styles.addCardBtn}
            onClick={() => {
              navigate('/add');
            }}
          >
            Add Card
          </button>
        </div>
        <div className={styles.cardsSection}>
          {cards.map((card: any, idx: number) => (
            <Card key={idx} {...card} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
