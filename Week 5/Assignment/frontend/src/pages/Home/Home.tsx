import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import styles from './Home.module.css';
import Card from '../../components/Card/Card';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState<any>({
    name: '',
    description: '',
    interests: '',
    socials: [],
  });
  const [cardId, setCardId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [socials, setSocials]: any = useState([]);
  const [user, setUser] = useState({
    email: '',
    role: '',
  });

  const navigate = useNavigate();

  //specific for socials input and mapping
  const addSocialInput = () => {
    setSocials([...socials, { name: '', url: '' }]);
  };

  const handleSocialChange = (e: any, idx: number) => {
    const { name, value } = e.target;
    const list = [...socials];
    list[idx][name] = value;
    setSocials(list);
  };

  const handleCardChange = (e: any) => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  };

  const checkValid = () => {
    let checkSocialsFilled = true;
    socials.forEach((social: any) => {
      if (social.name == '' || social.img == '' || social.url == '') {
        checkSocialsFilled = false;
      }
    });

    if (
      card.name === '' ||
      card.description === '' ||
      card.interests === '' ||
      !checkSocialsFilled
    ) {
      toast.error('Please fill all fields');
      return false;
    }
    return true;
  };

  const clearCard = () => {
    setCard({
      name: '',
      description: '',
      interests: '',
      socials: [],
    });
    setSocials([]);
  };

  const addCard = async () => {
    try {
      if (!checkValid()) return;
      const payload = {
        name: card.name,
        description: card.description,
        interests: card.interests.split(','),
        socials,
      };
      const response = await axios.post(
        'http://localhost:3001/cards',
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success('Card added successfully');
        getCards();
        clearCard();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (id: string) => {
    try {
      if (!checkValid()) return;
      const payload = {
        name: card.name,
        description: card.description,
        interests: card.interests.split(','),
        socials,
      };
      const response = await axios.put(
        `http://localhost:3001/cards/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Card updated successfully');
        setEditMode(false);
        setCardId('');
        clearCard();
        getCards();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (!confirmDelete) return;

    const loadingToast = toast.loading('Deleting card...');
    const res = await axios.delete(`http://localhost:3001/cards/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (res.status === 200) {
      toast.dismiss(loadingToast);
      toast.success('Card deleted successfully');
      getCards();
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        setUser(response.data);
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.log(err);
      toast.error('Please login again');
      localStorage.removeItem('token');
      navigate('/auth');
    }
  };

  const getCards = async () => {
    try {
      const loadingToast = toast.loading('Loading cards...');
      const response = await axios.get('http://localhost:3001/cards', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        toast.dismiss(loadingToast);
        setCards(response.data.cards);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
      getCards();
    } else {
      navigate('/auth');
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Cards</h2>
      <div className={styles.logoutBtnContainer}>
        <span className={styles.userEmail}>
          Welcome {user.email.split('@')[0]}!
        </span>
        <button className={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
      <div className={styles.sectionWrapper}>
        <div className={styles.addCard}>
          <input
            className={styles.addCard__input}
            type='text'
            name='name'
            value={card.name}
            placeholder='name'
            onChange={handleCardChange}
          />
          <input
            className={styles.addCard__input}
            type='text'
            name='description'
            value={card.description}
            onChange={handleCardChange}
            placeholder='description'
          />
          <input
            className={styles.addCard__input}
            type='text'
            name='interests'
            value={card.interests}
            onChange={handleCardChange}
            placeholder='interests. format eg: games,coding'
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
                  name='img'
                  placeholder='image url'
                  value={social.img}
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
              editMode && user.role == 'admin' ? updateCard(cardId) : addCard();
            }}
          >
            {editMode && user.role == 'admin' ? 'Update Card' : 'Add Card'}
          </button>
        </div>
        <div className={styles.cardsSection}>
          {cards.map((card: any, idx: number) => (
            <Card
              key={`card-${idx}`}
              card={card}
              user={user}
              setCard={setCard}
              setCardId={setCardId}
              setEditMode={setEditMode}
              setSocials={setSocials}
              deleteCard={deleteCard}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Home;
