type ButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ text = 'Submit', onClick }: ButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
