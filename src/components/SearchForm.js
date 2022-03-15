import React, { useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
	const { setSearchTerm } = useGlobalContext();
	const searchBar = useRef("");
	const changeSearchTerm = () => {
		setSearchTerm(searchBar.current.value);
	};
	return (
		<section className='section search'>
			<form action='' className='search-form'>
				<div className='form-control'>
					<label htmlFor='name'> search your favorite cocktail</label>
					<input
						type='text'
						name='name'
						id='name'
						ref={searchBar}
						onChange={changeSearchTerm}
					/>
				</div>
			</form>
		</section>
	);
};

export default SearchForm;
