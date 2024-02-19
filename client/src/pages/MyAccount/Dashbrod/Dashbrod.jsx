import React, {useEffect, useContext, useState, useCallback} from 'react';
import './Dashbrod.scss'
import pavilion from './img/pavilion.277c9df.jpg'
import axios from 'axios'
import AuthContext from '../../../context/Auth.context'
import {Offer} from "../../../component/Offer/Offer";
import Voted from "../../../component/Voted/Voted";
import {EditingOffer} from "../Offers/EditingOffer/EditingOffer";
import {NavLink} from "react-router-dom";


const Dashbrod = () => {
    const [user,setUser] = useState([])
    const {userId} = useContext(AuthContext)
    useEffect(()=>{
            try {
                axios.get('/api/dashbrod',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {userId}
    
                })
                .then(res=>setUser(res.data))
            } catch (error) {
                console.log(error)
            }
    
    }, [userId]);



    let countPosts = 0

    const [modalActiveRed, setModalActiveRed] = useState(true);
    const [posts, setPosts] = useState([]);

    const [idPost, setIdPost] = useState();

    const red = (id)=>{
        setModalActiveRed(true)
        setIdPost(id)
    }

    const getDetails = useCallback(async(event) => {
            try {
                axios.get('/api/offers/upload',{
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    params: {userId}

                })
                    .then(res=>setPosts(res.data))
            } catch (error) {
                console.log(error)
            }

        },
        [userId,setPosts]);

    useEffect(() => {
        return () => {
            getDetails()
        };
    }, [getDetails]);
    console.log(posts)

    return (
        <div>
            <div className="is-layout__default_site-container pb-5 m-auto container">
                {
                    posts.map((posts,index)=>{
                        countPosts = countPosts+1
                        if(posts._id===idPost){
                            return <EditingOffer active={modalActiveRed} setActive={setModalActiveRed} setPosts = {setPosts} posts={posts} />
                        }

                    })
                }
      <div className="is-page is-page__index">
        <div className="is-dheader">
            <div className="is-dheader__mask"></div>
            <div className="is-dheader__content">
                <p className="mt-2 is-text text-600" style={{color: 'rgb(78, 78, 78)', fontSize: '32px', lineHeight: '16px'}}>Алые паруса</p>
                {user.map(user => (
                    <><p className="mt-3 is-text text-500" style={{ color: 'rgb(78, 78, 78)', fontSize: '16px', lineHeight: '16px' }}>Добро пожаловать, {`${user.firstName} ${user.lastName}`}!</p><p className="mt-3 is-text text-200" style={{ color: 'rgb(78, 78, 78)', fontSize: '14px', lineHeight: '16px' }}>Подъезд:
                        <span style={{ fontWeight: '500' }}>№ {user.frontDoor}</span>
                        <span className="mt-3 is-text text-200" style={{ color: 'rgb(78, 78, 78)', fontSize: '14px', lineHeight: '16px' }}>Квартира:
                            <span style={{ fontWeight: '500' }}>№ {user.appartamentNumber}</span>
                        </span>
                    </p></>
                ))}
                
                
            </div>
        </div>
        <div className="is-my-offers mt-5 container">
            <div className="is-my-offers__heading row">
                <div className="is-my-offers__heading_title col-md-6">
                    <p className="is-text text-600 text-not-selectable" style={{color: 'rgb(0, 0, 0)', fontSize: '24px', lineHeight: '16px'}}>Мои предложения и обращения</p>
                </div>
                <div className="is-my-offers__heading_count col-md-6">
                    <NavLink to="/offers" className="is-my-offer__heading_count_link">Все ({countPosts})</NavLink>
                </div>
            </div>
            {
                posts.map((post,index)=>{
                    if(userId===post.owner){

                        return(
                            <Offer post={post} key={index}>
                                <div className="col-md-3 d-flex justify-content-end">
                                    <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Проголосовало:
                                        <span className="me-2 ms-2" style={{fontWeight: '400', color: 'rgb(39, 174, 96)'}}> За: {post.numberFor} </span>
                                        <span style={{fontWeight: '400', color: 'rgb(242, 82, 72)'}}> Против: {post.numberOf}</span>
                                    </p>
                                </div>
                                <div className='editing' onClick={()=>red(post._id)} style={{margin:'10px', borderRadius:'10px', padding:'5px'}}>Редактировать</div>
                            </Offer>
                        )


                    }

                })
            }
        </div>
        <div className="is-my-booking mt-5 container">
            <div className="is-my-booking__heading row">
                <div className="is-my-booking__heading_title col-md-6">
                    <p className="is-text text-600 text-not-selectable" style={{color: 'rgb(0, 0, 0)', fontSize: '24px', lineHeight: '16px'}}>Мои бронирования</p>
                </div>
                <div className="is-my-booking__heading_count col-md-6">
                    <a href="/booking" className="is-my-booking__heading_count_link">Все (1)</a>
                </div>
            </div>
            <div className="is-my-booking__items row">
                <div className="is-my-booking__items_card col-md-3 mb-3">
                    <a href="/booking/:id" className="is-my-booking__items_card_title">
                        <img src={pavilion}/>
                    </a>
                    <div className="is-my-booking__items_card_bottom row">
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Беседка:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> № 1</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Дата:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> 01.01.2023 15:00</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Период брони:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> 2 часа</p>
                        </div>
                    </div>
                </div>
                <div className="is-my-booking__items_card col-md-3 mb-3">
                    <a href="/booking/:id" className="is-my-booking__items_card_title">
                        <img src={pavilion}/>
                    </a>
                    <div className="is-my-booking__items_card_bottom row">
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Беседка:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> № 1</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Дата:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> 01.01.2023 15:00</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Период брони:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> 2 часа</p>
                        </div>
                    </div>
                </div>
                <div className="is-my-booking__items_card col-md-3 mb-3">
                    <a href="/booking/:id" className="is-my-booking__items_card_title">
                        <img src={pavilion}/>
                    </a>
                    <div className="is-my-booking__items_card_bottom row">
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Беседка:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}> № 1</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Дата:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>01.01.2023 15:00</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Период брони:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>2 часа</p>
                        </div>
                    </div>
                </div>
                <div className="is-my-booking__items_card col-md-3 mb-3">
                    <a href="/booking/:id" className="is-my-booking__items_card_title">
                        <img src={pavilion}/>
                    </a>
                    <div className="is-my-booking__items_card_bottom row">
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Беседка:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>№ 1</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Дата:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>01.01.2023 15:00</p>
                        </div>
                        <div className="item d-flex justify-content-between mb-2">
                            <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Период брони:</p>
                            <p className="is-text text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>2 часа</p>
                        </div>
                    </div>
                </div>
                    
            </div>
            <div className="is-my-booking__items row" style={{display: 'none'}}>
                <div className="is-my-booking__items_card empty col-md-12">
                    <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '18px', lineHeight: '16px'}}>На данный момент у вас нет бронирований</p>
                </div>
            </div>
        </div>
    </div>
</div>
        </div>
    );
}

export default Dashbrod;
