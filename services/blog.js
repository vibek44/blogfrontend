import axios from 'axios'
const baseUrlrl ='/api/blogs'



const getAll=async ()=>{
  const request= await axios.get(baseUrlrl)
  return request.data
}

export default {
  getAll,
 
}
