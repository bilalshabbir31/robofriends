import React ,{Component}from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox'
// import { robot } from './robot';
import ErrorBoundary from '../Components/ErrorBoundary'
import Scroll from '../Components/Scroll';
import './App.css'

class App extends Component{
    constructor(){
        super()
        this.state={
            robot:[],
            searchfield:''
        }
    }

     componentDidMount(){
         fetch('http://jsonplaceholder.typicode.com/users')
         .then(Response=> Response.json()).then(users=>this.setState({robot:users}));
     }

    onSearchChange=(event)=>{
        this.setState({searchfield:event.target.value})
    }
    render(){
        const filteredRobot=this.state.robot.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(this.state.robot.length===0){
            return <h1>Loading</h1> 
        }else{
            return(
                <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchchange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robot={filteredRobot}/>
                    </ErrorBoundary>    
                </Scroll>
                </div>
            );
        }

    }

}
export default App;