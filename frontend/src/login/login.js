import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUnlockKeyhole, faUser, faEnvelope, faEarthAfrica, faVenusMars } from '@fortawesome/free-solid-svg-icons'
// import logo from '../imges/login.png';
import { useState } from 'react';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import tamema from '../imges/toy.png';
import Header from "../components/header/header";



function Login({signupParam}) {

    const [signup, setSignup] = useState(signupParam);
    const [dateValue, onDateChange] = useState(new Date());
    // const options = [ 'fan', 'manager', 'admin' ];

    return (
    <div className="login">
        <Header />
        <div className='login-wrapper'>
            <div className={signup ? 'login-container signup-style' : 'login-container'}>
                <div className='img-container'>
                    <div className='img'>
                        <img className='icon-img' src={tamema} alt='tamema' />
                        {/* <FontAwesomeIcon className='icon-img' icon={faUser} /> */}
                    </div>
                </div>
                <div className='form-container'>
                    <div className='inputs-container'>
                        <div className='form-wrapper'>
                            {signup && <div className='Name-container'>
                                <div className='first-name'>
                                    <input type='text' name='firstname' id='firstname' placeholder='First name' />
                                </div>
                                <div className='last-name'>
                                    <input type='text' name='lastname' id='lastname' placeholder='Last name' />
                                </div>
                            </div>}

                           

                            {signup && <div className='birth-date-container'>
                                <div className='label'>Birth date: </div>
                                <DatePicker className="DatePicker" onChange={onDateChange} value={dateValue} />
                            </div>}

                            
                            {/* <div className='role'>
                                <Dropdown className="Dropdown" options={options} value={''} placeholder="Select your role" />
                            </div> */}

                            {signup && <div className='nationality-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faEarthAfrica} />
                                </div>
                                <div className='input'>
                                    <input type='text' name='nationality' id='nationality' placeholder='nationality' />
                                </div>
                            </div>}

                            {signup && <div className='email-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faEnvelope} />
                                </div>
                                <div className='input'>
                                    <input type='email' name='email' id='email' placeholder='email' />
                                </div>
                            </div>}

                            {signup && <div className='gender-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faVenusMars} />
                                </div>
                                <div className='gender'>
                                    <Dropdown className="Dropdown" options={['M', 'F']} value={''} placeholder="Select your gender" />
                                </div>
                            </div>}

                            <div className='username-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faUser} />
                                </div>
                                <div className='input'>
                                    <input type='text' name='username' id='username' placeholder='username' />
                                </div>
                            </div>
                            <div className='password-container'>
                                <div className='icon'>
                                    <FontAwesomeIcon className='icon-item' icon={faUnlockKeyhole} />
                                </div>
                                <div className='input'>
                                    <input type='password' name='password' id='password' placeholder='password' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>
                        <div className='change-mode' onClick={() => setSignup(!signup)}>
                            {signup ? 'Login' : 'SignUp'}
                        </div>

                        <div className='button-container'>
                            <button>{signup ? 'SignUp' : 'Login'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;