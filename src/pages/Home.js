import React, { useState, useEffect } from 'react'; //useState is for state management and useEffect is for data loading
import Moment from 'moment'; //for date/time adjustment
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from "axios";

function Home(){
     //state variable data and a function for updating data called setData
    const [data, setData] = useState([])
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    useEffect(() => {
    //add async function to add a wait for pulling in data from api
    
    const fetchData = async() => {
      const result = await fetch(proxyurl + "https://mysterious-dawn-71769.herokuapp.com/recipe", { mode: 'cors'}).then(
        response => response.json()
      );
      setData(result);
    };
    fetchData();
    }, []); //helps with data fetching, but only when the componant maps, [] lets us know we only want to fetch data one time


   
    return(
    
    <div class="slider">
        {
            data.map(recipe => (
                
                <div class="container">
                    <div class="recipe">
                        <div class="front">
                            <h2>{recipe.title}</h2>

                            </div> 
                        <div class="back">
                            <h2>{recipe.title}</h2>
                            <h3>created by {recipe.username} {Moment(new Date(recipe.date)).fromNow()} </h3>
                            <h3>time to make - {recipe.time} minutes</h3>
                            <p>{recipe.description}</p>
                            <h2>Ingredients: </h2>
                            <ul>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}              
                            </ul>
                            <h2>Steps: </h2>  
                            <ol>
                            {recipe.steps.map((step, index) => (
                                <li key={index}>{index+1}. {step}</li>
                            ))}              
                            </ol>
                            <Link to={{
                                pathname: `/contribute/${recipe._id}`,
                                state:{
                                    title: recipe.title,
                                    username: recipe.username,
                                    time: recipe.time,
                                    description: recipe.description,
                                    steps: recipe.steps,
                                    ingredients: recipe.ingredients
                                }
                            }                          
                            }>Edit</Link>
                            
                            </div>
                        </div>                              
                    </div>
                
            ))
        }
      </div>
      
    )

}

export default Home;