import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DefaultToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
      theme="dark"
    />
  );
};

export default DefaultToast;
