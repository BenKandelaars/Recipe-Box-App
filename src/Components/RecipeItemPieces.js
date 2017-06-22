
function RecipeName ({name}){
  return (
    <div className="recipe_label">
      <p className="recipe_label--text">{name}</p>
    </div>
  )
}

function RecipeNameEdit ({recipeID, value, editRecipeName}){
  const style = {
    //textDecoration: 'underline',
    border: 'none',
    borderBottom: '0.5px solid grey'
  }

  return (
    <div className="recipe_label">
      <input className="recipe_label--text" style={style} type="text" defaultValue={value}
        onChange={(e) => editRecipeName(e, recipeID)}>
      </input>
    </div>
  )
}

function RecipeBook ({book}){
  const styleComponent = {margin: '10px auto'}
  const styleHeader = {display: 'inline', fontWeight: 'normal'}
  const styleBook = {display: 'inline', textDecoration: 'underline', textDecorationColor: 'white'}

  return (
    <article style={styleComponent}>
      <h6 style={styleHeader}>Recipe Book: </h6>
        <p style={styleBook}>{book}</p>
    </article>
  )
}

function RecipeBookEdit ({book, recipeID, editBookName}){
  const styleComponent = {margin: '10px auto'}
  const styleHeader = {display: 'inline', fontWeight: 'normal'}
  const styleBook = {
  //  textDecoration: 'underline',
    fontSize: 'inherit',
    border: 'none',
    borderBottom: '0.5px solid grey',
    padding: '0px',
  }

  return (
    <article style={styleComponent}>
      <h6 style={styleHeader}>Recipe Book: </h6>
      <input className="" type="text"
        style={styleBook} defaultValue={book}
        onChange={(e) => editBookName(e, recipeID)}>
      </input>
    </article>
  )
}

function IngredientList ({ingredients}){

  const ingredientItems = ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)

  return (
    <article className="recipe_ingredientList">
      <h6>Ingrediants:</h6>
      <ul>
        {ingredientItems}
      </ul>
    </article>
  )
}

function IngredientListEdit ({ingredients, updateIngredientList, ingredientsHeight, recipeID}){

  const ingredientItems = ingredients.join(", ")

  const style={
    width: '90%',
    height: ingredientsHeight,
    fontFamily: "'Quicksand', sans-serif",
    fontSize: '1rem',
    minHeight: '4rem'
  }

  return (
    <article className="recipe_ingredientList">
      <h6>Ingrediants:</h6>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <textarea className="" type="text"
          style={style}
          defaultValue={ingredientItems}
          onChange={(e) => updateIngredientList(e, recipeID)}>
        </textarea>
      </div>
    </article>
  )
}

function RecipeTray ({editRecipe, deleteRecipe, recipeID}){
  const style={
    marginTop: 'auto',
    padding: '5px',
  }

  return (
    <article className="recipe_tray" style={style}>
      <button className="recipe_btn" onClick={(e) => editRecipe(e, recipeID)}>Edit</button>
      <button className="recipe_btn" onClick={(e) => deleteRecipe(e, recipeID)}>Delete</button>
    </article>)
}

function RecipeTrayEdit ({saveRecipe, resetHeight, recipeID}){
  const style={
    marginTop: 'auto',
    padding: '5px',
    display: 'flex',
    justifyContent: 'center'
  }

  function handleClick (){
    saveRecipe(recipeID)
    resetHeight()
  }

  return (
    <article className="recipe_tray" style={style}>
      <button className="recipe_btn" onClick={handleClick}>Save</button>
    </article>)
}
