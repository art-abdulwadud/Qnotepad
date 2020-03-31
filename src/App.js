import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/pages/Home';
import PlainNotes from './components/PlainNotes'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageNoteFound from './PageNoteFound';
import Surahs from './components/Surahs';
import Dashboard from './components/Dashboard';
import SurahDashboard from './components/SurahDashboard';
import NotesContent from './components/surahfiles/details/contents/NotesContent';
import TopicsContent from './components/surahfiles/details/contents/TopicsContent';
import AyahsContent from './components/surahfiles/details/contents/AyahsContent';
import AuthProvider from './components/AuthContext';
import SignUpAndLoginPage from './components/pages/SignUpAndLoginPage';


class App extends React.Component{

  render(){
    return(
      <div className="root-class">
        <BrowserRouter>
          <AuthProvider>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={SignUpAndLoginPage}/>
            <Route exact path="/:user/home" component={Home}/>
            <Route exact path="/:user/plain-notes" 
              render={(props) => (<Dashboard 
              {...props}/>)}/>
            <Route exact path="/:user/plain-notes/:id/:title"
            render={(props) => (
              <PlainNotes {...props} />
            )}/>
            <Route exact path="/:user/surahs"
            render={(props) => (
              <SurahDashboard {...props} />
            )}/>
            <Route exact path="/:user/surahs/:id/:name"
            render={(props) => (
              <Surahs {...props} />
            )}/>
            <Route exact path="/:user/surah-notes/:notesid/:surahid/:name/:number"
            render={(props) => (
              <NotesContent {...props} />
            )}/>
            <Route exact path="/:user/topic/:topicid/:surahid/:name/:number"
            render={(props) => (
              <TopicsContent {...props} />
            )}/>
            <Route exact path="/:user/ayah/:ayahid/:surahid/:name/:number"
            render={(props) => (
              <AyahsContent {...props} />
            )}/>
            <Route exact component={PageNoteFound}/>
          </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
