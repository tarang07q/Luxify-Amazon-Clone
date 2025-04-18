import './Message.css';

const Message = ({ variant = 'info', children }) => {
  return (
    <div
      className={`message message-${variant}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export default Message;
