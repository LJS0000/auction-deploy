const ErrorMessage = ({ message }) =>
  message ? <p className="text-red-500 text-sm mb-4">{message}</p> : null;

export default ErrorMessage;
