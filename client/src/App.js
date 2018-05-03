import React, { Component } from 'react';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroup';


class App extends Component {

state ={
  recipes: [
  {recipeName: "Pizza", ingredients: ["Pepporoni", "Mushrooms", "Bacon", "Cheese", "Bread"]},
  {recipeName: "Rebeun", ingredients: ["Pastrami", "Cheese", "Pickles"]}, 
  {recipeName: "Tacos", ingredients: ["Tortollia", "Cheese", "Tomatos"]}],
  activeKey: "1",
  showAdd: false,
  newRecipe: {recipeName: '', ingredients: []}
}

deleteRecipe(index){
let recipes = this.state.recipes.slice()
recipes.splice(index, 1)
return this.setState({recipes});

}

updateNewRecipe(recipeName, ingredients){

  return this.setState({newRecipe: {recipeName: recipeName, ingredients: ingredients}});
  
  }

close = () =>{
  if(this.state.showAdd){
    this.setState({showAdd: false})
  }
}


open = (state) =>{
this.setState({[state]: true})
}

saveNewRecipe = (newRecipe) =>{
let recipes= this.state.recipes.slice();
recipes.push(newRecipe)
this.setState({recipes})
this.setState({newRecipe :{recipeName: '', ingredients: []}})
this.close()
}

  render() {
    const { recipes, newRecipe } = this.state;
    console.log(newRecipe)
    return (
      <div className="container">

   <PanelGroup accordion id="accordion-example">
   {recipes.map((recipe, i)=>{
  return (<Panel eventKey={i} key={i}>
    <Panel.Heading>
      <Panel.Title toggle>{recipe.recipeName}</Panel.Title>
    </Panel.Heading>
    <Panel.Body collapsible>
    <ListGroup>
    {recipe.ingredients.map(ingredient => {
    return(<ListGroupItem key={ingredient}>{ingredient}</ListGroupItem>)
    })
    }
  </ListGroup>
  <ButtonToolbar>
    <Button onClick={(event) => this.deleteRecipe(i)} bsStyle="danger">Delete</Button>
    <Button>Edit</Button>
  </ButtonToolbar>
 
    </Panel.Body>
  </Panel>)
    })}

</PanelGroup>


     <Button onClick={(event) => this.open("showAdd")} bsStyle="primary"> ADD Recipe</Button>  
     <Modal
          show={this.state.showAdd}
          onHide={this.close}
          container={this}
          aria-labelledby="Add Recipe"
        >
          <Modal.Header closeButton>
          
          </Modal.Header>
          <Modal.Title id="contained-modal-title">
             Add Recipe
            </Modal.Title>
          <Modal.Body>
        <FormGroup
        controlId="formBasicText">
          <ControlLabel>Recipe Name</ControlLabel>
          <FormControl
          type="text"
          value={newRecipe.recipeName}
          placeholder="Add recipe name"
          onChange={(event) => this.updateNewRecipe(event.target.value, newRecipe.ingredients)}
          >


          </FormControl>
          <FormGroup
          controlId="formControlsTextarea"
          >
          <ControlLabel>Recipe Name</ControlLabel>
          <FormControl
          value={newRecipe.ingredients}
          placeholder="Enter Ingredients (separate by Comma)"
          onChange={(event) => this.updateNewRecipe(newRecipe.recipeName, event.target.value.split(","))}
          type="textarea"
          >


          </FormControl>
          </FormGroup>


          </FormGroup>
          </Modal.Body>
       
          <Modal.Footer>
            <Button onClick={(event) => this.saveNewRecipe(newRecipe)}>Close</Button>
          </Modal.Footer>
        </Modal>
  
      </div>
    );
  }
}

export default App;
