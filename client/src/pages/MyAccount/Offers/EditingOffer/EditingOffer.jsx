import React, {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "../../../../context/Auth.context";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {convertFromRaw, convertToRaw, EditorState, ContentState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Modal from "../../../../component/Modal/Modal";
import {Editor} from "react-draft-wysiwyg";

export const EditingOffer = (props) => {
	const{userId}=useContext(AuthContext)
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



	const [userInfo, setuserInfo] = useState({
		title: '',
	});


	const onChangeValue = (e) => {
		setuserInfo({
			...userInfo,
			[e.target.name]:e.target.value
		});
	}

	let editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.posts.content)))
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




	useEffect(() => {
		return () => {
			setuserInfo({title:props.posts.title})
		};
	}, [props.red]);



	const editingDetails =
		async(event) => {
			try {
				event.preventDefault();
				event.persist();

				axios.put(`/api/offers/editing/${props.posts._id}`,{id: props.posts._id,
					title: userInfo.title,
					des: userInfo.description.value,
					content:  JSON.stringify(convertToRaw(description.getCurrentContent()))
				})
					.then(res => {
						getDetails()
						props.setActive(false)
					})
			} catch (error) { throw error;}

		}


	return (
		<div>
			<Modal active={props.active} setActive={props.setActive}>
				<div className="App">
					<div className="container">
						<div className="row">
							<form onSubmit={editingDetails}  className="update__forms">
								<h3 className="myaccount-content">Редактировать предлжение</h3>
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