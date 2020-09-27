import React,{useState,useEffect} from 'react';

import './App.css';
import search from './images/search.png'
import git  from './images/github.png'

function App() {
  const [name,setName]=useState('');
 
  const [followers,setfollowers]=useState('');
  const [following,setfollowing]=useState('');
  const [repos,setRepos]=useState('');

  const [avatar ,setAvatar]=useState('');
 
  const [userInput,setUserInput]=useState('');
  const [repoData,setRepoData]=useState([]);
 


  useEffect(() => {
   fetch(`https://api.github.com/users/prajwalr308`)
    .then(res =>res.json())
    .then(data =>{
      console.log(data);
      setData(data)
    });
    fetch(`https://api.github.com/users/prajwalr308/repos`)
  .then(res =>res.json())
  .then(data =>{
    
      console.log(data)
      setRepoData(data);
     
      console.log(repoData);
    }
  )
      
    

  }, [])

const setData =({name,followers,public_repos,avatar_url,following})=>{
  setName(name);

  setfollowers(followers);
  setRepos(public_repos);

  setAvatar(avatar_url);
  setfollowing(following);

};

const handleSearch=e=>{
  setUserInput(e.target.value);
}
const handleSubmit=(e)=>{
  e.preventDefault();
  fetch(`https://api.github.com/users/${userInput}`)
  .then(res =>res.json())
  .then(data =>{
  
      console.log(data);
    setData(data)
    }
    
  )
  fetch(`https://api.github.com/users/${userInput}/repos`)
  .then(res =>res.json())
  .then(data =>{
    
      console.log(data)
      setRepoData(data);
     
      console.log(repoData);
    }
    
  )

}

  return (
    <div className="App">
      
        <div className="nav">
        <img className="logo" src={git} alt="git" />
        <div className="search">
          <form className="searchbox" onSubmit={handleSubmit} >
            <input type="text" placeholder="Search.." className="searchfield" name="search" onChange={handleSearch} />
            <img src={search} type="submit" onClick={handleSubmit} alt="search" />
          </form>
        </div>
        </div>

       
        
        <div className="divide">
          <div className="card">
            <div>   <img src={avatar} alt="John" style={{width:"100%"}} />
            <h1>{name}</h1>
            <div className="flex">
              <div>
              <h2>{followers}</h2>
            <p className="title">followers</p>
              </div>
              <div>
              <h2>{following}</h2>
            <p className="title">following</p>
              </div>
              <div>
              <h2>{repos}</h2>
            <p className="title">Repos</p>
              </div>

            </div></div>
     
            
            
 
           
            
            </div>
                <div className="repos">
                  <div className="repository">Repository</div>
        {repoData.map( repo => <div className="repobox"><div className="repoName">{repo.name}</div><p className="description">{repo.description}</p></div>)}
                </div>
        </div>
        
   
 
        </div>
  )}

export default App;
