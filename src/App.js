import React from 'react';
import { useAuth0 } from "./Auth/react-auth0-spa";
import MyEditor from './components/MyEditor';
import HeaderH from './components/Header';
import './App.css';


const App = ({ idToken }) => {
  const { loading, logout,user } = useAuth0();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
        <HeaderH logoutHandler={logout} user={user}/>
        <MyEditor></MyEditor>
      
    </div>
  );
}

export default App;
