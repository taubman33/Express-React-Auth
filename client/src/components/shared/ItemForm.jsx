import React from 'react'

const ItemForm = ({
	item,
	handleSubmit,
	handleChange,
	cancelPath,
	history
}) => (
	<div className='form-container'>
		<form onSubmit={handleSubmit}>
			<label>Title</label>
			<input
				placeholder='A vetted item.'
				value={item.title}
				name='title'
				onChange={handleChange}
			/>

			<label>Link</label>
			<input
				placeholder='http://acoolitem.com'
				value={item.link}
				name='link'
				onChange={handleChange}
			/>

			<button type='submit'>Submit</button>
			<button onClick={() => history.push(cancelPath)}>Cancel</button>
		</form>
	</div>
)

export default ItemForm
