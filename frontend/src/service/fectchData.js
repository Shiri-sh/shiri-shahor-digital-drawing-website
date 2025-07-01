import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
async function fetchData(navigateString, methodType = "GET", dataContent = null) {
  const token = localStorage.getItem('currentToken');

  const options = {
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    method: methodType,
  };
  console.log(options)
  if (dataContent !== null) {
    if (dataContent instanceof FormData) {
      options.body = dataContent;
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(dataContent);
    }
  }
  
  console.log(navigateString, options);
  const response = await fetch(`http://localhost:3000/api/${navigateString}`, options);

  const data = await response.json();
  if (!response.ok) {
    console.log(data.message);
    toast.error(data.error);
    throw new Error();
  }
  console.log(data);
  return data;
}
export default fetchData;