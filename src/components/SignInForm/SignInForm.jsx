import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext';
import "./SignInForm.css"
const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="sign-in-card">
      <h1>Sign In</h1>
      <p>{message}</p>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div>
          <label className="sign-in-label" htmlFor='email'>Username</label>
          <input
          className="sign-in-input"
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="sign-in-label" htmlFor='password'>Password</label>
          <input
            className="sign-in-input"
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className="sign-in-button">Sign In</button>
          <p className="sign-in-text">No Account? <Link className="sign-in-link" to="/sign-up">Sign Up</Link></p>
        </div>
      </form>
    </main>
  );
};

export default SignInForm