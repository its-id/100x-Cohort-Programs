import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ name, description, interests, socials }: any) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.description}>{description}</p>
      <div className={styles.interests}>
        <p className={styles.interestHeader}>Interests</p>
        {interests.map((interest: any) => (
          <span className={styles.interest}>{interest}</span>
        ))}
      </div>
      <div className={styles.socialsContainer}>
        {socials.map((social: any) => (
          <Link
            to={social.url}
            target='blank'
            className={styles.singleSocialItem}
          >
            <img src={social.icon} alt={social.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Card;
