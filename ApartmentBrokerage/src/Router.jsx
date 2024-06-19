import { createBrowserRouter } from 'react-router-dom';
import UserHome from './components/UserPage/UserHome';
import LoginIn from './components/AdminPage/LoginIn';
import AdminHome from './components/AdminPage/AdminHome';
import ServicesList from './components/Services/ServicesList';
import AddService from './components/Services/AddService';
import AddMeeting from './components/Meetings/AddMeeting';
import MeetingsList from './components/Meetings/MeetingsList';

const router = createBrowserRouter([
    {
      path: '/',
      element: <UserHome />,
      errorElement: <div>error 404</div>,
      children:[ {
        path: '',
        element: <div></div>,
       
      },
        {
          path: 'addMeeting',
          element: <div><AddMeeting/></div>,
          errorElement: <div>error contant not found</div>
        },]
    },
    {
      path: '/admin',
      element: <AdminHome />,
      errorElement: <div>error Admin</div>,
      children: [
        {
          path: '',
          element: <div></div>,
        },
        {
          path: 'services',
          element: <div><ServicesList/></div>,
          errorElement: <div>error contant not found</div>
        },
        {
          path: 'services/addService',
          element: <div><AddService/></div>,
          errorElement: <div>error contant not found</div>
        },
        {
          path: 'meetings',
          element: <div><MeetingsList></MeetingsList></div>,
          errorElement: <div>error contant not found</div>
        },
      ]
    },
    {
      path: '/logIn',
      element: <AdminHome />,
      errorElement: <div>error 404</div>
  
    },
    
  ]);

  export default router;
