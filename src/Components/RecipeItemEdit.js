class RecipeItemEdit extends React.Component {
  constructor (props){
    super (props)
  }

  render(){
    const style = {
      transition: `height 0.2s ease-out`,
      //height: this.props.height === 'auto' ? 'auto' : this.props.recipe.isOpen ? this.props.height : '2.5rem',
      height: this.props.height,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      }

    const styleRecipeDetail = {
      height: 'auto',
      padding: '5px 5px 5px 5px',

      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
    }

    const {id: recipeID, name, book, ingredients} = this.props.recipe

    return (
      <div>
        <section style={style}>
          <RecipeNameEdit recipeID={recipeID} value={name} editRecipeName={this.props.editRecipeName} />
          <article style={styleRecipeDetail}>
            <RecipeBookEdit book={book} recipeID={recipeID} editBookName={this.props.editBookName} />
            <IngredientListEdit recipeID={recipeID}
              ingredients = {ingredients}
              ingredientsHeight = {this.props.ingredientsHeight}
              updateIngredientList={this.props.updateIngredientList} />
          </article>
          <RecipeTrayEdit
              recipeID={recipeID}
              saveRecipe={this.props.saveRecipe}
              resetHeight={this.props.resetHeight}
              updateHeight={this.props.updateHeight} />
        </section>
      </div>)
  }
}
