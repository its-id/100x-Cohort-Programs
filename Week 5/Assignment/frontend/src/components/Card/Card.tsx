import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ card, user, setCard, setCardId, setEditMode, setSocials, deleteCard }: any) => {
  
  const handleEdit = () => {
    setEditMode(true);
    setCardId(card._id);
    setSocials(card.socials);
    setCard({
      name: card.name,
      description: card.description,
      interests: card.interests.join(','),
      socials: card.socials,
    });
  };

  return (
    <div className={styles.container}>
      <span className={styles.name}>{card.name}</span>
      <div className={styles.main}>
        <span className={styles.description}>{card.description}</span>
        <div className={styles.interestsContainer}>
          <span className={styles.interestHeader}>Interests</span>
          <div className={styles.interests}>
            {card.interests.map((interest: any, idx: number) => (
              <span key={`interest-${idx}`} className={styles.interest}>
                {interest}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.socialsContainer}>
          <span className={styles.socialsHeader}>Socials</span>
          <div className={styles.socials}>
            {card.socials.map((social: any, idx: number) => (
              <Link
                key={`url-${idx}`}
                to={social.url}
                target='blank'
                className={styles.singleSocialItem}
              >
                <img src={social.img} alt={social.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {user.role == 'admin' && (
        <div className={styles.optionsContainer}>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteCard(card._id)}
          >
            Delete
          </button>
          <button className={styles.editBtn} onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
