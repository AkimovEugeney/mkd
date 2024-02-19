import React, {useState, useEffect, useContext} from 'react';
import AddOffers from './AddOffers/AddOffers';
import './Offers.scss'
import axios from "axios";
import AuthContext from "../../../context/Auth.context";
import {Offer} from "../../../component/Offer/Offer";
import Voted from '../../../component/Voted/Voted';
import {EditingOffer} from "./EditingOffer/EditingOffer";
import './Offers.scss'


const Offers = () => {

    const [modalActive, setModalActive] = useState(false);
    const [modalActiveRed, setModalActiveRed] = useState(false);
    const [posts, setPosts] = useState([]);
    const{userId}=useContext(AuthContext)

    const [idPost, setIdPost] = useState();

    const red = (id)=>{
        setModalActiveRed(true)
        setIdPost(id)
    }


    return (
            <div className="is-layout__default_site-container pb-5 m-auto container">
            <button className='addOffers' onClick={()=>setModalActive(true)}>Добавить предложение</button>
             <AddOffers active={modalActive} setActive={setModalActive} setPosts = {setPosts} posts={posts}/>
                {
                 posts.map((posts,index)=>{
                     if(posts._id===idPost){
                         return <EditingOffer active={modalActiveRed} setActive={setModalActiveRed} setPosts = {setPosts} posts={posts} />
                     }

            })
                }

                <div>
                    
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
                            return (<Offer post={post}>
                                <Voted post={post} setPosts={setPosts} />
                            </Offer>)
                        })
                    }
       
                </div>
        </div>

    );
}


{/* <div
dangerouslySetInnerHTML={{__html: post.description}}
/> */}

export default Offers;
