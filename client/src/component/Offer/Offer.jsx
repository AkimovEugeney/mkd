import React, {useState} from "react";
import Modal from "../Modal/Modal";
import './Offer.css'
export const Offer = ({post,children}) => {
	const [active, setActive] = useState(false);


	return (
		<div className="is-my-offers__item row">
			<Modal active={active} setActive={setActive}>
				<div className='inf'>
					<h3>Предложение по благоустройству</h3>
					<div className='textTitle'>{post.title}</div>
					<h4>Общая информация:</h4>
					<div className= 'des'
						dangerouslySetInnerHTML={{__html: post.description}}
					/>
				</div>
			</Modal>
			<div className="is-my-offers__item_card col-md-12">
				<div onClick={()=>setActive(true)} className="is-my-offers__item_card_title">
					<p className="is-text text-500" style={{color: 'rgb(78, 78, 78)', fontSize: '18px', lineHeight: '16px'}}>{post.title}</p>
				</div>
				<div className="is-my-offers__item_card_bottom row">
					<div className="col-md-3">
						<p className="is-text text-500 text-not-selectable"  style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Разместил:
							<span className="ms-2" style={{fontWeight: '300'}}> кв. {post.appartamentNumber}, {post.firstName} {post.lastName}</span>
						</p>
					</div>
					<div className="col-md-3 d-flex">
						<p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Дата размещения:
							<span className="ms-2" style={{fontWeight: '300'}}> {post.date}</span>
						</p>
					</div>
					<div className="col-md-3">
						<p className="is-text text-500 text-not-selectable" style={{color: 'rgb(78, 78, 78)', fontSize: '12px', lineHeight: '16px'}}>Статус:
							<span className="ms-2" style={{fontWeight: '400', color: 'rgb(39, 174, 96)'}}> {post.active? 'Активно': 'Не активно'}</span>
						</p>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}