import React, { useState, useEffect } from 'react'; //useState is for state management and useEffect is for data loading
import Moment from 'moment'; //for date/time adjustment
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from "axios";

export default class Contribute extends React.Component{
    state = {
        title: this.props.location.state.title,
        username: this.props.location.state.username,
        time: this.props.location.state.time,
        description: this.props.location.state.description,
        steps: this.props.location.state.steps,
        ingredients: this.props.location.state.ingredients
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

    updateSubmit = event => {
        
        event.preventDefault();
        const id = this.props.match.params.id;
        

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

        axios.put(proxyurl  + "https://mysterious-dawn-71769.herokuapp.com/recipe/" + id, recipe)
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location = "/";
            })
    }

    delete = event => {
        const id = this.props.match.params.id;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        event.preventDefault();
        axios.delete(proxyurl  + "https://mysterious-dawn-71769.herokuapp.com/recipe/" + id)
        .then(res => {
            console.log(res);
            console.log(res.data);
            window.location = "/";
        })
    }

    render(){
        console.log(this.props)

        return(              
            <div class="edit">

                <form onSubmit={this.updateSubmit}>
                    <label>
                        Recipe Title:
                        <input type="text" name="title" onChange={this.changes} defaultValue={this.props.location.state.title}/>
                    </label>
                    <label>
                        Recipe Time to Make in Minutes:
                        <input type="text" name="time" onChange={this.changes} defaultValue={this.props.location.state.time}/>
                    </label>
                    <label>
                        Recipe Description:
                        <textarea name="description" onChange={this.changes} defaultValue={this.props.location.state.description}/>
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
                                    <input type="text" name="steps" defaultValue={step} onChange={(event) => this.changesSteps(event, index)}/>
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
                                        <input type="text" name="ingredients" defaultValue = {ingredient} onChange={(event) => this.changesIngredients(event, index)}/>
                                    </label>
                                </li>
                            ))}              
                        </ol>
                        
                    </tr>
                    <tr>
                    <button type="submit">Submit</button> 
                    </tr>
                    <tr>
                    <button type="submit" onClick={this.delete}>Delete Recipe</button>
                    </tr>
                </tbody>        
                        
                    
                </table>
                </form>
                
                

                
                </div>
                                         
            )
    }
    
}
