import React, {useState, useEffect, useContext, useCallback} from 'react';
import Modal from '../../../../component/Modal/Modal';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import {Editor} from'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {useNavigate} from'react-router-dom';
import axios from 'axios';
import './AddOffers.scss'
import AuthContext from "../../../../context/Auth.context";


const AddOffers = (props) => {

    const{userId}=useContext(AuthContext)

    const [user,setUser] = useState([])
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


    let d = new Date();
    let date = String(d.getDate()).padStart(2, '0') + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + d.getFullYear() + ' '+d.getHours() +':' +d.getMinutes();


  const uploadCallback = (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("image", file)
      axios.post('/api/offers/upload', data,).then(responseImage => {
        resolve({ data: { link: `http://localhost:5000/image/${file.name}` } });
      })
    });
  }


  useEffect(() => {
        let elems = document.querySelectorAll('select');
        let instances = window.M.FormSelect.init(elems, {});
        window.M.updateTextFields();
      }, []);



      let history = useNavigate();
      const [userInfo, setuserInfo] = useState({
        title: '',
      });


      const onChangeValue = (e) => {
        setuserInfo({
          ...userInfo,
          [e.target.name]:e.target.value
        });
      }
      
      let editorState = EditorState.createEmpty();
      let [description, setDescription] = useState(editorState);
      const onEditorStateChange = (editorState) => {
        setDescription(editorState);
      }
      
      const [isError, setError] = useState(null);


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
            getDetails()
        };
    }, [getDetails]);
    console.log(props.posts)




    useEffect(() => {
        return () => {
            setuserInfo({title:props.posts.title})
        };
    }, [props.red]);



      const addDetails =
              async(event) => {
                  try {
                      event.preventDefault();
                      event.persist();
                      // if(userInfo.description.value.length < 10){
                      //     setError('Required, Add description minimum length 10 characters');
                      //     return;
                      // }

                      axios.post(`/api/offers/upload`,{userId: userId,
                          title: userInfo.title,
                          description: userInfo.description.value,
                          appartamentNumber:user[0].appartamentNumber,
                          firstName:user[0].firstName ,
                          lastName: user[0].lastName,
                          date: date,
                          content:  JSON.stringify(convertToRaw(description.getCurrentContent()))
                      })
                          .then(res => {
                              getDetails()
                              setuserInfo({title:''})
                              props.setActive(false)
                              onEditorStateChange('')
                              editorState = EditorState.createEmpty();
                              setDescription(editorState)
                              if(res.data.success === true){
                              }
                          })
                  } catch (error) { throw error;}

              }


    return (
        <div>
             <Modal active={props.active} setActive={props.setActive}>
             <div className="App">
    <div className="container">
      <div className="row"> 
        <form onSubmit={addDetails}  className="update__forms">
          <h3 className="myaccount-content">Добавить предложение</h3>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="font-weight-bold"> Заголовок <span className="required"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Введите заголовок" required />
            </div>
            <div className="form-group col-md-12 editor"  >
              <label className="font-weight-bold"> Редактор <span className="required"> * </span> </label>
                <Editor
                 toolbar ={{
                  image: {
                  urlEnabled: true,
                  uploadEnabled: true,
                  uploadCallback: uploadCallback,
                  previewImage: true,
                  alt: { present: false, mandatory: false },
                    height: '30px'
                },
                }}
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={ draftToHtml(convertToRaw(description.getCurrentContent()))} />
            </div>
            {isError !== null && <div className="errors"> {isError} </div>}
            <div className="form-group col-sm-12 text-right">
              <button type="submit" className="btn btn__theme"> Отправить  </button>
            </div> 
          </div> 
        </form>
      </div>
    </div>
  </div>
            </Modal>
        </div>
    );
}

export default AddOffers;


// editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.posts.content)))