import React, { useState, useEffect } from 'react'; //useState is for state management and useEffect is for data loading
import Moment from 'moment'; //for date/time adjustment
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from "axios";
import { thisTypeAnnotation } from '@babel/types';

export default class Create extends React.Component{
    state = {
        title: '',
        username: '',
        time: '',
        description: '',
        steps: [],
        ingredients: []
    }  

    changes = event => {
        if(event.target.name === 'title')
            this.setState({ title: event.target.value});
        else if(event.target.name === 'username')
            this.setState({username: event.target.value});
        else if(event.target.name === 'time')
            this.setState({time: event.target.value});
        else if(event.target.name === 'description')
            this.setState({description: event.target.value});    
            

    }

    changesSteps(event, index){

            console.log("the name received is" + event.target.name);
            console.log("the step received is" + event.target.value);

            this.setState({step : event.target.value});
            const steps = this.state.steps;
            steps[index] = event.target.value;
            this.setState({steps});
        
    }

    changesIngredients(event, index){

        console.log("the name received is" + event.target.name);
        console.log("the ingredient received is" + event.target.value);

        this.setState({ingredient : event.target.value});
        const ingredients = this.state.ingredients;
        ingredients[index] = event.target.value;
        this.setState({ingredients});
    
    }
   
    addIngredient = event =>{
        event.preventDefault();
        this.setState({ingredients: [...this.state.ingredients, event.target.value]})
    }

    addStep = event =>{
        event.preventDefault();
        this.setState({steps: [...this.state.steps, event.target.value]})
    }

    addSubmit = event => {
        
        event.preventDefault();       

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        const recipe ={
            title: this.state.title,
            username: this.state.username,
            time: this.state.time,
            description: this.state.description,
            steps: this.state.steps,
            ingredients: this.state.ingredients
        }

        console.log(recipe);

        axios.post(proxyurl  + "https://mysterious-dawn-71769.herokuapp.com/recipe", recipe)
            .then(res => {
                console.log(res);
                console.log(res.data);
                //window.location = "/";
            })
    }
    
    render(){
        return(
            <div class="edit">
    
    
            <form onSubmit={this.addSubmit}>
                <label>
                    Recipe Title:
                    <input type="text" name="title" onChange={this.changes} />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" onChange={this.changes} />
                </label>
                <label>
                    Recipe Time to Make in Minutes:
                    <input type="text" name="time" onChange={this.changes} />
                </label>
                <label>
                    Recipe Description:
                    <textarea name="description" onChange={this.changes} />
                </label>
                <table>
                <tbody>
                    <tr>
                        <button onClick={this.addStep}>Add Step</button>

                        <ol>
                        {this.state.steps.map((step, index) => (
                            <li key={index}>
                                <label>
                                    Step # {index + 1}:
                                    <input type="text" name="steps" onChange={(event) => this.changesSteps(event, index)}/>
                                </label>
                            </li>
                        ))}              
                        </ol>
                

                    </tr>
                    <tr>
                        <button onClick={this.addIngredient}>Add Ingredient</button>

                        
                        <ol>
                            {this.state.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <label>
                                        Ingredient # {index + 1}:
                                        <input type="text" name="ingredients" onChange={(event) => this.changesIngredients(event, index)}/>
                                    </label>
                                </li>
                            ))}              
                        </ol>
                        
                    </tr>
                    <tr>
                    <button type="submit">Submit</button> 
                    </tr>
                </tbody>        

                    
                </table>
                      
            </form>
  
            
            </div>
            )
    }
    
    
}
