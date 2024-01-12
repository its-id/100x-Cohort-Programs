import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ name, description, interests, socials, user }: any) => {
  const [editMode, setEditMode] = useState(false);

  const deleteCard = (id: string) => {};

  const updateCard = (id: string) => {
    console.log(id);
  };

  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>
      <div className={styles.main}>
        <span className={styles.description}>{description}</span>
        <div className={styles.interestsContainer}>
          <span className={styles.interestHeader}>Interests</span>
          <div className={styles.interests}>
            {interests.map((interest: any, idx: number) => (
              <span key={`interest-${idx}`} className={styles.interest}>
                {interest}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.socialsContainer}>
          <span className={styles.socialsHeader}>Socials</span>
          <div className={styles.socials}>
            {socials.map((social: any, idx: number) => (
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

      <div className={styles.optionsContainer}>
        <button className={styles.deleteBtn} onClick={() => deleteCard(user)}>
          Delete
        </button>
        <button className={styles.editBtn} onClick={() => setEditMode(true)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
