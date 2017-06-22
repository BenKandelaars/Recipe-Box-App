function recipeStoreInit(){

  const inStorage = localStorage.getItem('_username_recipes')

  if (inStorage){
    return JSON.parse(inStorage)
  } else {
    const recipes = defaultRecipes()
    localStorage.setItem('_username_recipes', JSON.stringify(recipes))
    return recipes
  }
}



function NavMenu ({createRecipe, resetDefaults}){
  return (
    <nav className="navStyle">
      <button className="navBtn_Style" onClick={() => resetDefaults()}>Reset</button>
      <button className="navBtn_Style createBtn" onClick={() => createRecipe()}>Create</button>
    </nav>
  )
}


class RecipeItemContainer extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      height: (this.props.recipe.isNew) ? '14rem' : 'auto',
      ingredientsHeight: 0
    }

    this.resetHeight = this.resetHeight.bind(this)
  }



  componentDidMount(){
    let ingredientsNo = this.props.recipe.ingredients.length

    if (ingredientsNo > 3){

      this.setState({
        height: window.getComputedStyle(ReactDOM.findDOMNode(this.instance)).getPropertyValue("height"),
        ingredientsHeight: `${(ingredientsNo) + 1}rem`
      })
    } else {
      this.setState({
        ingredientsHeight: `4rem`
      })
    }
  }

  resetHeight(){
    this.setState({
      height: 'auto'
    })
  }

  componentDidUpdate(){
    if (this.state.height === 'auto'){
      const ingredientsNo = this.props.recipe.ingredients.length

      this.setState({
        height: window.getComputedStyle(ReactDOM.findDOMNode(this.instance)).getPropertyValue("height"),
        ingredientsHeight: `${(ingredientsNo) + 1}rem`
      })
    }
  }

  render() {

    const style = {
      width: `100%`,
      margin: `5px auto`,
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

          //  updateHeight = {this.updateHeight}
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
            ingredientsHeight = {this.state.ingredientsHeight}

            editRecipeName={this.props.editRecipeName}
            editBookName={this.props.editBookName}
            updateIngredientList={this.props.updateIngredientList}

            resetHeight = {this.resetHeight}
          //  updateHeight = {this.updateHeight}
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
      recipeStore: recipeStoreInit(),
      currentOpen: false,
    },

    this.openOnClick = this.openOnClick.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)

    this.editRecipeName = this.editRecipeName.bind(this)
    this.editBookName = this.editBookName.bind(this)
    this.updateIngredientList = this.updateIngredientList.bind(this)
    this.saveRecipe = this.saveRecipe.bind(this)

    this.createRecipe = this.createRecipe.bind(this)
    this.resetDefaults = this.resetDefaults.bind(this)
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

  updateRecipeState (recipeID, actionFn, updateLocalStorage){
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

    if(updateLocalStorage){
      localStorage.setItem('_username_recipes', JSON.stringify(updatedRecipes))
    }
  }

  deleteRecipe (e, recipeID) {
    e.stopPropagation()

    const updatedRecipes = this.state.recipeStore.reduce(function (acc, recipe) {
      return recipe.id === recipeID ? acc : acc.concat(recipe)
    }, [])

    this.setState({
      recipeStore: updatedRecipes,
      currentOpen: false
    })

    localStorage.setItem('_username_recipes', JSON.stringify(updatedRecipes))

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
  }

  editBookName (e, recipeID){
    this.updateRecipeState(recipeID, (recipe) => {
        return {...recipe, book: e.target.value}
    })
  }

  updateIngredientList (e, recipeID){
    const ingredients = e.target.value

    this.updateRecipeState(recipeID, (recipe) => {
      return {...recipe, ingredients: ingredients.split(",")}
    })

  }

  saveRecipe(recipeID){
    this.updateRecipeState(recipeID, (recipe) => {
      return {...recipe, presentationView: true}
    }, true)
  }

  createRecipe (){
    const updatedRecipes = this.state.recipeStore.reduce(function (acc, recipe) {
      return acc.concat({...recipe, isOpen: false, presentationView: true})
    }, [])

    const highestID = this.state.recipeStore.reduce(function (acc, recipe) {
        return (recipe.id < acc) ? acc : recipe.id
      }, 0)


    this.setState({
      currentOpen: highestID + 1,
      recipeStore: updatedRecipes.concat({
          "id": highestID + 1,
          "isNew": true,
          "isOpen": true,
          "presentationView": false,
          "name": "",
          "book": "",
          "ingredients": []
        })
    })
  }

  resetDefaults(){
    this.setState({
      recipeStore: defaultRecipes(),
      currentOpen: false
    })

    localStorage.setItem('_username_recipes', JSON.stringify(defaultRecipes()))
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
        updateIngredientList = {this.updateIngredientList}
        saveRecipe = {this.saveRecipe}
      />
    )

    return (
      <div>
        <NavMenu
          resetDefaults={this.resetDefaults}
          createRecipe={this.createRecipe} />
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
        <MainView>
          <RecipeIndex />
        </MainView>
      </div>
  )}
}



ReactDOM.render(
  <App />,
  document.getElementById("app")
)
