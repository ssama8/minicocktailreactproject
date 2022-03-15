import React, { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
	const { id } = useParams();
	const { loading, setLoading } = useGlobalContext();
	const [cocktail, setCocktail] = useState(null);
	const getCocktail = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${url}${id}`);
			const data = await response.json();
			const {
				strDrink,
				strCategory,
				strAlcoholic,
				strGlass,
				strDrinkThumb,
				strInstructions,
				strIngredient1,
				strIngredient2,
				strIngredient3,
				strIngredient4,
				strIngredient5,
			} = data.drinks[0];
			const ingredients = [
				strIngredient1,
				strIngredient2,
				strIngredient3,
				strIngredient4,
				strIngredient5,
			];
			const newCocktail = {
				name: strDrink,
				category: strCategory,
				image: strDrinkThumb,
				info: strAlcoholic,
				glass: strGlass,
				instructions: strInstructions,
				ingredients: ingredients,
			};

			setCocktail(newCocktail);
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}, [id, setLoading]);
	useEffect(() => {
		getCocktail();
	}, [getCocktail]);

	if (loading) {
		return <Loading />;
	}
	if (!cocktail) {
		return <h2 className='section-title'> no cocktail to display</h2>;
	}
	const { name, category, image, info, glass, instructions, ingredients } =
		cocktail;
	return (
		<section className='section cocktail-section'>
			<Link className='btn btn-primary' to='/'>
				{" "}
				back home
			</Link>
			<h2 className='section-title'>{name}</h2>
			<div className='drink'>
				<img src={image} alt={name} />
				<div className='drink-info'>
					<p>
						<span className='drink-data'>name:</span>
						{name}
					</p>
					<p>
						<span className='drink-data'>category:</span>
						{category}
					</p>
					<p>
						<span className='drink-data'>info:</span>
						{info}
					</p>
					<p>
						<span className='drink-data'>glass:</span>
						{glass}
					</p>
					<p>
						<span className='drink-data'>instructions:</span>
						{instructions}
					</p>
					<p>
						<span className='drink-data'>ingredients:</span>
						{ingredients.map((ingredient, index) => {
							return ingredient ? <span key={index}>{ingredient}</span> : null;
						})}
					</p>
				</div>
			</div>
		</section>
	);
};

export default SingleCocktail;
