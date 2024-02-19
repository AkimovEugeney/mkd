import React,{useState,useEffect,useCallback,useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../context/Auth.context';
import './Voted.css'

const Voted = (props) => {
    const [post, setPosts] = useState([]);
    const [active, setActive] = useState(true);
    const{userId}=useContext(AuthContext)
    const getDetails = useCallback(async(event) => {
        try {
            axios.get('/api/offers/upload',{
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}

            })
                .then(res=>props.setPosts(res.data))
        } catch (error) {
            console.log(error)
        }

    },
    [userId,props.setPosts]);


useEffect(() => {
    return () => {
        getDetails(false)
    };
}, [getDetails,]);




    const addVotedFor = useCallback(
              async(id) => {
                  try {
                    
                      axios.put(`/api/offers/numberFor/${id}`,{
                        id: id,
                        numberFor: props.post.numberFor+1,
                          userId:userId
                      })
                          .then(res => {
                            getDetails()
                          })
                  } catch (error) { throw error;}

              }
    ,[props.post.numberFor,getDetails]);


    const addVotedOf = useCallback(
        async(id) => {
            try {
              
                axios.put(`/api/offers/numberOf/${id}`,{
                  id: id,
                  numberOf: props.post.numberOf+1,
                    userId: userId
                })
                    .then(res => {
                      getDetails()
                    })
            } catch (error) { throw error;}

        }
,[props.post.numberOf,getDetails]);
        let a

        if(!props.post.whoVoted.includes(userId)){
            a=
                <p className="text-500 " style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>
                    <div className='is text text-not-selectable'>
                    <span className="me-2 ms-2" style={{fontWeight: '400', color: 'rgb(39, 174, 96)'}}><div className="material-symbols-outlined" style={{color:'green'}} onClick={()=>{addVotedFor(props.post._id)}}>thumb_up</div> </span>
                    <span style={{fontWeight: '400', color: 'rgb(242, 82, 72)'}}> <div  className="material-symbols-outlined" style={{color:'red'}} onClick={()=>{addVotedOf(props.post._id)}}>thumb_down</div></span>
                    </div>
                </p>

        }else{
            a =
                <p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Проголосовало:
                    <span className="me-2 ms-2" style={{fontWeight: '400', color: 'rgb(39, 174, 96)'}}> За: {props.post.numberFor} </span>
                    <span style={{fontWeight: '400', color: 'rgb(242, 82, 72)'}}> Против: {props.post.numberOf}</span>
                </p>

        }



    return (
        <div className='col-md-3 d-flex justify-content-end'>
            {a}
        </div>
    )
        
        

}

export default Voted;
