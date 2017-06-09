class RecipeItem extends React.Component {
  constructor (props){
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.openOnClick(this.props.recipe)
  }

  render(){
    const style = {
      transition: `height 0.2s ease-out`,
      height: this.props.height === 'auto' ? 'auto' : this.props.recipe.isOpen ? this.props.height : '2.5rem',
    }

    const styleRecipeDetail = {
      height: 'auto',
      padding: '5px 5px 5px 5px',

      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
    }

    const {id: recipeID, name, book, ingredients} = this.props.recipe

    return (
      <div style={style} onClick={this.handleClick}>
        <section>
          <RecipeName name={name} />
          <article style={styleRecipeDetail}>
            <RecipeBook book={book} />
            <IngredientList ingredients = {ingredients} />
            <RecipeTray
              recipeID = {recipeID}
              deleteRecipe={this.props.deleteRecipe}
              editRecipe={this.props.editRecipe} />
          </article>
        </section>
      </div>)
  }
}
