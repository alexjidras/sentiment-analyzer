import React, { useState, useEffect } from 'react';
import './App.css';
import './reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, Redirect } from 'react-router-dom';
import axios from './axios';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MySentences from './pages/MySentences';
import history from './history';

function App() {
  const [analyzer, setAnalyzer] = useState({
      data: null,
      error: null,
      isLoading: false
  });

  const analyzeInput = async (input, save=true) => {
    setAnalyzer({
      ...analyzer,
      isLoading: true
    })
    await axios.post('/analyzer', {
      input,
      save
    })
    .then(res => {
      //console.log(res.data)
      setAnalyzer({
        ...analyzer,
        data: res.data,
        isLoading: false
      })
    })
    .catch(e => {
      setAnalyzer({
        ...analyzer,
        error: e,
        isLoading: false,
      })
    })
  }

  const [auth, setAuth] = useState({
    data: null,
    error: null,
    isLoading: false
  });
  const logIn = async (data) => {
    setAuth({
      ...auth,
      isLoading: true
    })
    await axios.post('/auth/login', data)
    .then(res => {
      //console.log(res.data)
      setAuth({
        ...auth,
        data: res.data,
        isLoading: false
      })
      history.push('/')
    })
    .catch(e => {
      setAuth({
        ...auth,
        error: e,
        isLoading: false,
      })
    })
  }

  const register = async (data) => {
    setAuth({
      ...auth,
      isLoading: true
    })
    await axios.post('/auth/register', data)
    .then(res => {
      //console.log(res.data)
      setAuth({
        ...auth,
        data: res.data,
        isLoading: false
      })
      history.push('/')
    })
    .catch(e => {
      setAuth({
        ...auth,
        error: e,
        isLoading: false,
      })
    })
  }


  const logout = async () => {
    setAuth({
      ...auth,
      isLoading: true
    })
    await axios.post('/auth/logout')
    .then(res => {
      //console.log(res.data)
      setAuth({
        ...auth,
        data: null,
        isLoading: false
      })
      history.push('/')
    })
    .catch(e => {
      setAuth({
        ...auth,
        error: e,
        isLoading: false,
      })
    })
  }

  const getUser = async () => {
    setAuth({
      ...auth,
      isLoading: true
    })
    await axios.get('/auth/user')
    .then(res => {
      //console.log(res.data)
      setAuth({
        ...auth,
        data: res.data,
        isLoading: false
      })
    })
    .catch(e => {
      setAuth({
        ...auth,
        error: e,
        isLoading: false,
      })
    })
  }

  const [sentences, setSentences] = useState({
    data: [],
    error: null,
    isLoading: false
  });

  const getSentences = async () => {
    setSentences({
      ...sentences,
      isLoading: true
    })
    await axios.get('/sentences')
    .then(res => {
      //console.log(res.data)
      setSentences({
        ...sentences,
        data: res.data,
        isLoading: false
      })
    })
    .catch(e => {
      setSentences({
        ...sentences,
        error: e,
        isLoading: false,
      })
    })
  }
  const deleteSentence = async (id) => {
    setSentences({
      ...sentences,
      isLoading: true
    })
    await axios.delete(`/sentences/${id}`)
    .then(res => {
      setSentences({
        ...sentences,
        isLoading: false
      });
      getSentences();
    })
    .catch(e => {
      setSentences({
        ...sentences,
        error: e,
        isLoading: false,
      })
    })
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Navbar logout={logout} isLoggedIn={!!auth.data} user={auth.data}/>
      <Router history={history}>
        <Route path="/" exact render={(props) => <MainPage data={analyzer.data} analyzeInput={analyzeInput} {...props} />} />
        <Route path="/login" render={(props) => <LoginPage login={logIn} {...props} />}/>
        <Route path="/register" render={(props) => <RegisterPage register={register} {...props} />}/>
        <Route path="/my-sentences" render={(props) => (
          !!auth.data ? <MySentences sentences={sentences.data} getSentences={getSentences} deleteSentence={deleteSentence} {...props} />
          : <Redirect to="/login"/>
        )}
        />
      </Router>
    </div>
  );
}

export default App;
