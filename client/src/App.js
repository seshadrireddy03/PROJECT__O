import './App.css';
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import LoginPage from './Components/LoginPage';
import Student from './Components/Slogin';
import StudentRegister from './Components/StudentRegister';
import StudentPage from './Components/StudentPage';
import FacultyLogin from './Components/FacultyLogin';
import FacultyPage from './Components/FacultyPage';
import FacultyRegister from './Components/FacultyRegister';
import UploadPage from './Components/UploadPage';
import HistoryPage from './Components/HIstoryPage';
import AllRecords from './Components/AllRecords';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={LoginPage} path='/'/>
          <Route Component={LoginPage} path='/LoginPage'/>
          <Route Component={Student} path='/StudentLogin'/>
          <Route Component={StudentRegister} path='/StudentRegister'/>
          <Route Component={StudentPage} path='/StudentPage'/>
          <Route Component={FacultyRegister} path='/FacultyRegister'/>
          <Route Component={FacultyLogin} path='/FacultyLogin'/>
          <Route Component={FacultyPage} path='/FacultyPage'/>
          <Route Component={UploadPage} path='/UploadPage'/>
          <Route Component={HistoryPage} path='/HistoryPage'/>
          <Route Component={AllRecords} path='/AllRecords'/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
