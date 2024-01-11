import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './Home.module.css';
import Card from '../../components/Card/Card';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [role, setRole] = useState('user');

  const navigate = useNavigate();
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
      {cards.map((card: any) => (
        <Card {...card} role={role} />
      ))}
    </div>
  );
};

export default Home;
