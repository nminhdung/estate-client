import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/About';
import CreateListing from './pages/CreateListing';
import Home from './pages/Home';
import Listing from './pages/Listing';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SigUp from './pages/SignUp';
import UpdateListing from './pages/UpdateListing';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SigUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/update-listing/:listingId' element={<UpdateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
