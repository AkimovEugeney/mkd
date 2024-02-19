import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Registration.scss';
import { NavLink,Routes,Route,Navigate } from'react-router-dom';



const Registration = (props) => {
    useEffect(() => {
        // imitialize dropdown
        var elems = document.querySelectorAll('select');
        var instances = window.M.FormSelect.init(elems, {});
        window.M.updateTextFields();
      }, []);

    return (
       <div className='login_content'>
        <h3>Регистрация</h3>
                    <form className='form form-login' onSubmit={e => e.preventDefault()}>
                    <div class="row">
                        <div class="input-field col s6">
                            <input  name="firstName" type="text" class="validate" onChange={props.changeHandler} required/>
                            <label for="first_name">Имя</label>
                        </div>
                        <div class="input-field col s6">
                         <input name="lastName" type="text" class="validate" onChange={props.changeHandler} required/>
                            <label for="last_name">Фамилия</label>
                        </div>
                    </div>
                    <div className="row">
                        <div class="input-field col s6">
                            <select name='frontDoor' onChange={props.changeHandler}>
                            <option selected="selected" value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            </select>
                            <label>Номер подъезда</label>
                        </div>

                        <div class="input-field col s6">
                            <input placeholder="Введите номер квартиры" name='appartamentNumber' type="number" class="validate" onChange={props.changeHandler} required/>
                            <label for="first_name">Номер квартиры</label>
                        </div>
                    </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input type="email" name='email' className='validate' onChange={props.changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className='input-field col s12'>
                                <input type="password" name='password' className='validate' onChange={props.changeHandler} />
                                <label htmlFor="password">Пароль</label>
                            </div>
                            <div className="row">
                                <button className='wawes-effect wawes-linght btn blue' onClick={props.registerHandler} >
                                    Регистрация
                                </button>
                                <NavLink className='btn-outline btn-reg' to="/login">Есть аккаунт?</NavLink>
                            </div>
                        </div>
                        <p style={{float:"left", paddingBottom:'50px', color:"red"}}>{props.state}</p>
                        <div style={{marginTop:"5px"}}>.</div>
                    </form>

       </div>
    );
}

export default Registration;
