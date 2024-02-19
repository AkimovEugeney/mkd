import React, {useContext,useState} from 'react';
import './Navbar.scss'
import AuthContext from "../../context/Auth.context";
import './Navbar.scss'
import logo from './img/elhoo_logo.svg'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const {logout, isLogin} = useContext(AuthContext);

    const [name, setName] = useState('none');

    

    return (
        <div>
            <aside className="is-sidebar" onMouseMove={()=> {setName('')}} onMouseLeave={()=> {setName('none')}}>
        <div className="is-sidebar__content">
            <div className="is-sidebar__content_wrapper d-block">
                <div className="is-sidebar__logo">
                    <img src={logo} className="logo_svg"/>
                    <h1 className="is-sidebar__logo_title">ELHOO System</h1>
                </div>
                <menu className="is-menu">
                    <li><NavLink to="/" aria-current="page" className="nuxt-link-exact-active nuxt-link-active">
                        <span className="item_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                <path d="M570.6 244C577.2 249.8 577.8 259.1 571.1 266.6C566.2 273.2 556 273.8 549.4 267.1L512 234.1V432C512 476.2 476.2 512 432 512H144C99.82 512 64 476.2 64 432V234.1L26.59 267.1C19.96 273.8 9.849 273.2 4.003 266.6C-1.844 259.1-1.212 249.8 5.414 244L277.4 4.002C283.5-1.334 292.5-1.334 298.6 4.002L570.6 244zM144 480H208V320C208 302.3 222.3 288 240 288H336C353.7 288 368 302.3 368 320V480H432C458.5 480 480 458.5 480 432V206.7L288 37.34L96 206.7V432C96 458.5 117.5 480 144 480zM240 480H336V320H240V480z"></path>
                            </svg>
                        </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Дэшборд</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/flat" className="">
                        <span className="item_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M0 32v464C0 504.8 7.2 512 15.1 512S32 504.8 32 496V32h64L95.1 381.5c0 35.29 27.49 65.79 62.78 66.47C178.5 448.4 196 439.5 208 425.9C219.8 439.2 236.8 448 256 448s36.25-8.75 48-22.12C315.8 439.2 332.8 448 352 448s36.25-8.75 48-22.12C411.8 439.2 428.8 448 448 448c11.75 0 22.5-3.375 32-8.875v56.88C480 504.8 487.2 512 496 512s16-7.2 16-16V32c0-17.67-14.33-32-32-32H32C14.33 0 0 14.33 0 32zM416 32h64v352c0 17.75-14.25 32-32 32c-17.75 0-32-14.25-32-32V32zM320 32h64v352c0 17.75-14.25 32-32 32s-32-14.25-32-32V32zM224 32h64v352c0 17.75-14.25 32-32 32s-32-14.25-32-32V32zM128 32h64v352c0 17.75-14.25 32-32 32s-32-14.25-32-32V32z">     
                                </path>
                            </svg>
                        </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Моя квартира</p>
                    </NavLink>
                    
                </li>
                <li>
                    <NavLink to="/offers" className="">
                        <span className="item_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M234.2 4.672C241 1.592 248.5 0 256 0C263.5 0 270.1 1.592 277.8 4.672L495.2 102.1C505.4 106.7 512 116.8 512 128C512 139.2 505.4 149.3 495.2 153.9L277.8 251.3C270.1 254.4 263.5 256 256 256C248.5 256 241 254.4 234.2 251.3L16.76 153.9C6.561 149.3 .0003 139.2 .0003 128C.0003 116.8 6.561 106.7 16.76 102.1L234.2 4.672zM256 32C252.1 32 249.1 32.64 247.2 33.87L37.27 128L247.2 222.1C249.1 223.4 252.1 224 256 224C259 224 262 223.4 264.8 222.1L474.7 128L264.8 33.87C262 32.64 259 32 256 32V32zM78.6 219.9C82.22 228 78.61 237.5 70.55 241.1L37.27 256L247.2 350.1C249.1 351.4 252.1 352 256 352C259 352 262 351.4 264.8 350.1L474.7 256L441.5 241.1C433.4 237.5 429.8 228 433.4 219.9C437 211.9 446.5 208.3 454.5 211.9L495.2 230.1C505.4 234.7 512 244.8 512 256C512 267.2 505.4 277.3 495.2 281.9L277.8 379.3C270.1 382.4 263.5 384 256 384C248.5 384 241 382.4 234.2 379.3L16.76 281.9C6.561 277.3 0 267.2 0 256C0 244.8 6.561 234.7 16.76 230.1L57.46 211.9C65.52 208.3 74.99 211.9 78.6 219.9H78.6zM37.27 384L247.2 478.1C249.1 479.4 252.1 480 256 480C259 480 262 479.4 264.8 478.1L474.7 384L441.5 369.1C433.4 365.5 429.8 356 433.4 347.9C437 339.9 446.5 336.3 454.5 339.9L495.2 358.1C505.4 362.7 512 372.8 512 384C512 395.2 505.4 405.3 495.2 409.9L277.8 507.3C270.1 510.4 263.5 512 256 512C248.5 512 241 510.4 234.2 507.3L16.76 409.9C6.561 405.3 0 395.2 0 384C0 372.8 6.561 362.7 16.76 358.1L57.46 339.9C65.52 336.3 74.99 339.9 78.6 347.9C82.21 356 78.61 365.5 70.54 369.1L37.27 384z"></path>
                            </svg>
                        </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Предложения</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/booking" className="">
                        <span className="item_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M416 0H128C92.65 0 64 28.65 64 64v48H16C7.166 112 0 119.2 0 128c0 8.832 7.166 16 16 16H64v96H16C7.166 240 0 247.2 0 256c0 8.832 7.166 16 16 16H64v96H16C7.166 368 0 375.2 0 384c0 8.832 7.166 16 16 16H64V448c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64V64C480 28.65 451.3 0 416 0zM128 480c-17.64 0-32-14.36-32-32v-48h34.67c8.834 0 16-7.168 16-16c0-8.834-7.166-16-16-16H96v-96h34.67c8.834 0 16-7.168 16-16c0-8.834-7.166-16-16-16H96v-96h34.67c8.834 0 16-7.168 16-16c0-8.834-7.166-16-16-16H96V64c0-17.64 14.36-32 32-32h64v448H128zM448 448c0 17.64-14.36 32-32 32H224V32h192c17.64 0 32 14.36 32 32V448z"></path>
                            </svg>
                        </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Бронирование</p>
                    </NavLink>
                </li>
            </menu>
        </div>
    </div>
    <div className="is-sidebar__version">
        <div className="is-sidebar__version_wrapper d-block">
            <menu className="is-menu">
                <li>
                    <NavLink to="/profile" className="">
                        <span className="item_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM224 32c52.94 0 96 43.06 96 96c0 52.93-43.06 96-96 96S128 180.9 128 128C128 75.06 171.1 32 224 32zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM413.3 480H34.66C33.2 480 32 478.8 32 477.3C32 399.4 95.4 336 173.3 336h101.3C352.6 336 416 399.4 416 477.3C416 478.8 414.8 480 413.3 480z"></path>
                            </svg>
                        </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Профиль</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/help" className="">
                        <span className="item_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M64 120C64 106.7 74.75 96 88 96H136C149.3 96 160 106.7 160 120V168C160 181.3 149.3 192 136 192H88C74.75 192 64 181.3 64 168V120zM96 128V160H128V128H96zM296 96C309.3 96 320 106.7 320 120V168C320 181.3 309.3 192 296 192H248C234.7 192 224 181.3 224 168V120C224 106.7 234.7 96 248 96H296zM288 160V128H256V160H288zM64 248C64 234.7 74.75 224 88 224H136C149.3 224 160 234.7 160 248V296C160 309.3 149.3 320 136 320H88C74.75 320 64 309.3 64 296V248zM96 256V288H128V256H96zM296 224C309.3 224 320 234.7 320 248V296C320 309.3 309.3 320 296 320H248C234.7 320 224 309.3 224 296V248C224 234.7 234.7 224 248 224H296zM288 288V256H256V288H288zM64 512C28.65 512 0 483.3 0 448V64C0 28.65 28.65 0 64 0H320C355.3 0 384 28.65 384 64V448C384 483.3 355.3 512 320 512H64zM32 64V448C32 465.7 46.33 480 64 480H128V416C128 380.7 156.7 352 192 352C227.3 352 256 380.7 256 416V480H320C337.7 480 352 465.7 352 448V64C352 46.33 337.7 32 320 32H64C46.33 32 32 46.33 32 64zM224 416C224 398.3 209.7 384 192 384C174.3 384 160 398.3 160 416V480H224V416z"></path>
                            </svg>
                        </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Вопрос к УК</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" className="" onClick={logout}>
                    <span className="material-symbols-outlined">
                        logout
                    </span>
                        <p className={`is-text text-500 text-not-selectable ${name}`} style={{color: 'rgb(78, 78, 78)',fontSize:'12px',lineHeight:'16px'}}>Выйти</p>
                    </NavLink>
                </li>
            </menu>
        </div>
    </div>
</aside>
        </div>
    );
}

export default Navbar;
