import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import "./SignUpForm.css"

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        // sends formData to signUp service
        const newUser = await signUp(formData)
        setUser(newUser)
        navigate('/')
    } catch (err) {
        setMessage(err.message)
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="sign-up-card">
      <h1 >Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="sign-up-label" htmlFor='username'>Username</label>
          <input 
            className="sign-up-input"
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="sign-up-label" htmlFor='password'>Password</label>
          <input 
            className="sign-up-input"
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="sign-up-label" htmlFor='confirm'>Confirm Password</label>
          <input
            className="sign-up-input"
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className="sign-up-button " disabled={isFormInvalid()}>Sign Up</button>
          <p className="sign-up-text">Already have an account? <Link className="sign-up-link" to="/sign-in"><b>Sign In</b></Link></p>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm