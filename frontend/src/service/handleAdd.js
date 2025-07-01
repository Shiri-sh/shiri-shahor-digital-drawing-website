import fetchData from "./fectchData.js";
const handleAdd = async (setData, path, data) => {
  
    try {
        let sendData = data;
        const hasFile = Object.values(data).some(
            (val) => val instanceof File
        );
      
        if (hasFile) {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        sendData = formData;
        }
        
        let addData = await fetchData(path, "POST", sendData);
        if(path=='drawings')   
            return addData;
        setData(prevData => [...prevData, addData]);
        return true;
    } 
    catch (e) {
        return false;
    }
};
export default handleAdd;