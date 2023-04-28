
// sorting...
const sortingByDateAndTime = (data)=>{
    let dataTemp = data;
    if(dataTemp){
      dataTemp.sort((data1, data2)=>{
        return (new Date(data2.createdAt)) - (new Date(data1.createdAt));
      });
    }
    return dataTemp;
  }

const getSnippets =async ()=>{
    try{
        const response = await fetch("https://snippet-cheatsheet-default-rtdb.firebaseio.com/snippets.json", {
            method:"GET",
        });
        const jsonRes = await response.json();
        const data = Object.values(jsonRes);
        return sortingByDateAndTime(Object.values(data[0]));
    }catch(error){
        throw error;
    }
}

export {getSnippets};