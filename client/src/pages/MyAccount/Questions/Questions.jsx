import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../context/Auth.context";
import axios from "axios";
import './Questions.css'

export const Questions = () => {


	useEffect(() => {
		var elems = document.querySelectorAll('input#input_text, textarea#textarea1');
		window.M.CharacterCounter.init(elems);
	}, []);

	const [form, setForm] = useState({
		title: '',
		des: '',

	})

	const { userId } = useContext(AuthContext);
	const [send, setSend] = useState(false);
	const changeHandler = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}
	const questionsHandler = async () => {
		try {
			await axios.post('/api/questions/send', {...form,userId},{
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then(response => {
					if(form.title != '' && form.des!= ''){
						setSend(true)
					}
					setForm({title: '', des:''})
					setTimeout(()=>setSend(false),2000)
				})
		} catch (error) {
			alert("Question no send")
			console.error(error)
		}
	}


	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	return (
		<>
			<div className="is-layout__default_site-container pb-5 m-auto container">
				<h3 style={{marginLeft:'5px'}}>Отправка вопросов к УК</h3>:
				<div className='row col s12' >
				<form className='col s12'  onSubmit={e => e.preventDefault()}>
					<div className="row" >
						<div style={{float:'left'}}>
						<div className="input-field col s12" >
							<input value={form.title} id="first_name2" name="title" type="text" className="validate" onChange={changeHandler} required/>
								<label className="active" htmlFor="first_name2">Тема вопроса:</label>
						</div>
							</div>
					</div>
							<div className="row">
								<div className="input-field col s12">
									<textarea value={form.des} name="des" onChange={changeHandler} id="textarea1" className="materialize-textarea" length="420" required></textarea>
									<label htmlFor="textarea1">Вопрос:</label>
								</div>
							</div>
						<div className="row">
							<button style={{marginLeft:'13px'}} className='wawes-effect wawes-linght btn btn blue' onClick={questionsHandler}>
								Отправить
							</button>
						</div>
					<p className={`question ${send ? '':'send'}`}>Question send!</p>
				</form>
				</div>

			</div>
		</>
	)
}