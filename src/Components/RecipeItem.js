class RecipeItem extends React.Component {
  constructor (props){
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.openOnClick(this.props.recipe)
  }

  componentDidMount(){
  //  this.props.height === 'auto' ? this.props.updateHeight
  }

  render(){
    let style = {
      transition: `height 0.2s ease-out`,
      height: this.props.height === 'auto' ? 'auto' : this.props.recipe.isOpen ? this.props.height : '2.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
    }

    const styleRecipeDetail = {
      minHeight: '8rem',
      padding: '5px 5px 5px 5px',

      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
    }

    const {id: recipeID, name, book, ingredients} = this.props.recipe

    return (
      <div>
        <section style={style} onClick={this.handleClick}>
          <RecipeName name={name} />
          <article style={styleRecipeDetail}>
            <RecipeBook book={book} />
            <IngredientList ingredients = {ingredients} />
          </article>
          <RecipeTray
              recipeID = {recipeID}
              deleteRecipe={this.props.deleteRecipe}
              editRecipe={this.props.editRecipe} />
        </section>
      </div>)
  }
}
