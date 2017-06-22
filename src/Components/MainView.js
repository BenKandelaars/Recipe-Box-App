

class MainView extends React.Component {
  constructor (props){
    super(props)
  }

  render(){
    const headerStyle = {
      padding: '5px',
      color: 'olivedrab'
    }

    return (
      <div className='mainView'>
        <h1 style={headerStyle}>RecipeBox</h1>
        {this.props.children}
      </div>
    )
  }
}
