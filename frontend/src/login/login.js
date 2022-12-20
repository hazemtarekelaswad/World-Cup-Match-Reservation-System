import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlockKeyhole, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../imges/login.png';
import { useState } from 'react';
import DatePicker from 'react-date-picker';

function Login() {

    const [state, setState] = useState('login');
    const [dateValue, onDateChange] = useState(new Date());


  return (
    <div className="login">
        <div className='login-wrapper'>
            <div className='login-container'>
                <div className='img-container'>
                    <div className='img'>
                        <FontAwesomeIcon className='icon-img' icon={faUser} />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='inputs-container'>
                        <div className='form-wrapper'>
                            <div className='Name-container'>
                                <div className='first-name'>
                                    <input type='text' name='firstname' id='firstname' placeholder='First name' />
                                </div>
                                <div className='last-name'>
                                    <input type='text' name='lastname' id='lastname' placeholder='Last name' />
                                </div>
                            </div>
                            <div className='birth-date-container'>
                                <DatePicker className="DatePicker" onChange={onDateChange} value={dateValue} />
                            </div>
                            {state === 'login' && <div className='username-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faUser} />
                                </div>
                                <div className='input'>
                                    <input type='text' name='username' id='username' placeholder='username' />
                                </div>
                            </div>}
                            {state === 'login' && <div className='password-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faUnlockKeyhole} />
                                </div>
                                <div className='input'>
                                    <input type='password' name='password' id='password' placeholder='password' />
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className='button-container'>
                        <button>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;