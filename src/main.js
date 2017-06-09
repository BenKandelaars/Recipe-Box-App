class RecipeItemContainer extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      height: 'auto',
    }
  }

  componentDidMount(){
    this.setState({
      height: window.getComputedStyle(ReactDOM.findDOMNode(this.instance)).getPropertyValue("height"),
    })
  }

  render() {
    const style = {
      width: `300px`,
      margin: `5px 10px 0px 10px`,
      overflow: 'hidden',

      border: `1px solid cornflowerblue`,
      borderRadius: '5px 5px 5px 5px',
      backgroundImage: 'linear-gradient(to bottom, cornflowerblue 2.5rem, transparent 2.5rem)',
    }

    let recipeView

    if (this.props.recipe.presentationView) {
      recipeView =
        (
          <RecipeItem
            ref = {(instance) => this.instance = instance}

            height = {this.state.height}
            openOnClick = {this.props.openOnClick}
            deleteRecipe = {this.props.deleteRecipe}
            editRecipe = {this.props.editRecipe}

            recipe = {this.props.recipe}
          />
        )
    } else {

      recipeView =
        (
          <RecipeItemEdit
            ref = {(instance) => this.instance = instance}

            height = {this.state.height}
            openOnClick = {this.props.openOnClick}
            saveRecipe = {this.props.saveRecipe}

            recipe = {this.props.recipe}

            editRecipeName={this.props.editRecipeName}
            editBookName={this.props.editBookName}
          />
        )
    }

    return (
      <div style={style}>
        {recipeView}
      </div>
    )
  }
}



class RecipeIndex extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      recipeStore,
      currentOpen: false,
    },

    this.openOnClick = this.openOnClick.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.editRecipeName = this.editRecipeName.bind(this)
    this.editBookName = this.editBookName.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)
  }

  openOnClick (clickedRecipe){
    let currentOpen = this.state.currentOpen
    let presentationView = this.state.recipeStore.map((recipe) => {
      if (recipe.id === currentOpen) {return recipe.presentationView}
    })

    let nextOpen = currentOpen
    let updatedRecipeStore = []

    if (clickedRecipe.id === currentOpen) {

        updatedRecipeStore = this.state.recipeStore.map((recipe) => {

          //Only change the open status is the recipe is in presentation mode
          if (recipe.id === currentOpen && recipe.presentationView) {
              recipe.isOpen = false
              nextOpen = false
          }

        return recipe
    })

    } else {

      // Save current recipe being worked on before switching to another.
      const updatedRecipes = this.state.recipeStore.map(function (recipe) {
        if (recipe.id === currentOpen) {
          recipe = {...recipe, presentationView: true}
        }
        return recipe
      })

      updatedRecipeStore = updatedRecipes.map((recipe) => {

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

    this.setState ({
      recipeStore: updatedRecipeStore,
      currentOpen: nextOpen
    })
  }

  updateRecipeState (recipeID, actionFn){
    const updatedRecipes = this.state.recipeStore.reduce(function (acc, recipe) {
      if (recipe.id === recipeID) {
        return acc.concat(actionFn(recipe))
        }  else {
        return acc.concat(recipe)
      }
    }, [])

    this.setState({
      recipeStore: updatedRecipes
    })
  }

  deleteRecipe (e, recipeID) {
    console.log("delete recipe no. ", recipeID)

    e.stopPropagation()

    const updatedRecipes = this.state.recipeStore.reduce(function (acc, recipe) {
      return recipe.id === recipeID ? acc : acc.concat(recipe)
    }, [])

    this.setState({recipeStore: updatedRecipes})
  }

  editRecipe (e, recipeID) {
    e.stopPropagation()

    this.updateRecipeState(recipeID, (recipe) => {
      return {...recipe, presentationView: false}
    })
  }

  editRecipeName(e, recipeID){
    this.updateRecipeState(recipeID, (recipe) => {
      return {...recipe, name: e.target.value}
    })

    console.log(this.state)
  }

  editBookName (e, recipeID){
    this.updateRecipeState(recipeID, (recipe) => {
        return {...recipe, book: e.target.value}
    })
  }

  saveRecipe(recipeID){
    this.updateRecipeState(recipeID, (recipe) => {
      return {...recipe, presentationView: true}
    })
  }

  render(){
    const recipeItems = this.state.recipeStore.map((recipe, index) =>
      <RecipeItemContainer
        key = {recipe.id}
        recipe = {recipe}
        openOnClick = {this.openOnClick}
        deleteRecipe = {this.deleteRecipe}
        editRecipe = {this.editRecipe}
        editRecipeName = {this.editRecipeName}
        editBookName = {this.editBookName}
        saveRecipe = {this.saveRecipe}
      />
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
