import { toast } from 'react-toastify';

/**
 * Handles errors and displays a toast notification with the corresponding message
 * @param {number} status - The status code of the error
 * @returns {object} An object containing the status and message of the error
 */

const errorHandlers: Record<number, () => void> = {
  400: () => {
    const message = 'Search field cannot be empty';
    toast(message, {
      type: 'error',
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'system',
    });
  },
  404: () => {
    const message = 'No results match search criteria';
    toast(message, {
      type: 'info',
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'system',
    });
  },
  500: () => {
    const message = 'Something went wrong';
    toast(message, {
      type: 'error',
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'system',
    });
  },
};

export const handleError = (status: number) => {
  const handler = errorHandlers[status];

  if (handler) handler(); // Check if the handler exists before calling it
  return { status };
};

export default handleError;
