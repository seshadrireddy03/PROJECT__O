import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import LoginPage from './Components/LoginPage';
import Student from './Components/Slogin';
import StudentRegister from './Components/StudentRegister';
import StudentPage from './Components/StudentPage';
import FacultyLogin from './Components/FacultyLogin';
import AdminPage from './Components/FacultyPage';
import FacultyRegister from './Components/FacultyRegister';
import UploadPage from './Components/UploadPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path='/'/>
          <Route Component={Student} path='/StudentLogin'/>
          <Route Component={StudentRegister} path='/StudentRegister'/>
          <Route Component={StudentPage} path='/StudentPage'/>
          <Route Component={FacultyRegister} path='/FacultyRegister'/>
          <Route Component={FacultyLogin} path='/FacultyLogin'/>
          <Route Component={AdminPage} path='/Admin'/>
          <Route Component={UploadPage} path='/UploadPage'/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
