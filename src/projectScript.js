

function RecipeName ({name}){
  return (
    <div className="recipe_label">
      <p>{name}</p>
    </div>
  )
}

function RecipeBook ({book}){
  const styleComponent = {margin: '10px auto'}
  const styleHeader = {display: 'inline', fontWeight: 'normal'}
  const styleBook = {display: 'inline'}

  return (
    <article style={styleComponent}>
      <h6 style={styleHeader}>Recipe Book: </h6>
        <p style={styleBook}>{book}</p>
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

function RecipeTray (props){
  return (
    <article className="recipe_tray">
      <button className="recipe_btn btn_primary">Update</button>
      <button className="recipe_btn btn_alert">Delete</button>
    </article>)
}


class RecipeBox extends React.Component {
  constructor (props){
    super (props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    this.props.openOnClick(this.props.recipe)
  }

  render(){
    const style = {
      width: `300px`,
      margin: `5px 10px 0px 10px`,
      overflow: 'hidden',

      border: `1px solid cornflowerblue`,
      borderRadius: '5px 5px 5px 5px',
      backgroundImage: 'linear-gradient(to bottom, cornflowerblue 2.5rem, transparent 2.5rem)',

      transition: `height 0.2s ease-out`,
    }

    let height = {
      height: this.props.height === 'auto' ? 'auto' : this.props.recipe.isOpen ? this.props.height : '2.5rem',
    }

    let styleRecipeBox = Object.assign({}, style, height)

    const styleRecipeDetail = {
      height: 'auto',
      padding: '5px 5px 5px 5px',

      fontFamily: "'Quicksand', sans-serif",
      fontSize: '1rem',
    }

    const {name, book, ingredients} = this.props.recipe

    return (
      <div style={styleRecipeBox} onClick={this.handleClick}>
        <section>
          <RecipeName name={name} />
          <article style={styleRecipeDetail}>
            <RecipeBook book={book} />
            <IngredientList ingredients = {ingredients} />
            <RecipeTray />
          </article>
        </section>
      </div>)
  }
}


class RecipeBoxContainer extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      height: 'auto'
    }
  }

  componentDidMount(){
    this.setState({
      height: window.getComputedStyle(ReactDOM.findDOMNode(this.instance)).getPropertyValue("height"),
    })
  }

  render() {
    return (
      <div>
        <RecipeBox
          ref = {(instance) => this.instance = instance}

          height = {this.state.height}
          openOnClick = {this.props.openOnClick}

          recipe = {this.props.recipe} />
      </div>
    )
  }
}

class RecipeIndex extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      recipeStore,
      currentOpen: false
    },

    this.openOnClick = this.openOnClick.bind(this)
  }

  openOnClick (clickedRecipe){
    setTimeout(() => console.log("Recipe changed: ", clickedRecipe), 500)

    let currentOpen = this.state.currentOpen
    let nextOpen
    let updatedRecipeStore = []

    if (clickedRecipe.id === currentOpen) {
      updatedRecipeStore = this.state.recipeStore.map((recipe) => {
        if (recipe.id === currentOpen) {
          recipe.isOpen = false
          nextOpen = false
        }

        return recipe
      }
    )} else {
      updatedRecipeStore = this.state.recipeStore.map((recipe) => {

        if (recipe.id === clickedRecipe.id) {
          recipe.isOpen = true
          nextOpen = recipe.id
        }

        if (recipe.id === currentOpen) {
          recipe.isOpen = false
        }

        return recipe
      })
    }

    this.setState({
      recipeStore: updatedRecipeStore,
      currentOpen: nextOpen
    })
  }

  render(){

    const recipeItems = recipeStore.map((recipe, index) =>
      <RecipeBoxContainer
        key = {recipe.id}
        recipe = {recipe}
        openOnClick = {this.openOnClick} />
    )

    return (
      <div>
        {recipeItems}
      </div>
    )
  }
}

class App extends React.Component {
  constructor (props){
    super(props)
  }

  render(){
    return (
      <div>
        <RecipeIndex />
      </div>
  )}
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
)
