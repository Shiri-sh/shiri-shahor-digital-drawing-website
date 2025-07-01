import { useState } from "react"
const UpdatbleFields=({order,updateOrder})=>{
    const [status,setStatus]=useState(order.Status);
    const [price,setPrice]=useState(order.price);
    return (
        <>
        <strong>{order.Status}</strong> 
            <label htmlFor="status">change status:</label>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="open">open</option>
            <option value="in_progress">in progress</option>
            <option value="completed">completed</option>
            </select>
            <button onClick={()=>updateOrder(order?.ID,'status',{'Status':status})}>save</button>
            <br/>
            <strong>Price</strong>
            <br/>
            {order.price ?? '-'}
            <label htmlFor="price">{order.price?'change price:':''}</label>
            <input defaultValue={order.price} onChange={(e)=>setPrice(e.target.value)} type="number" />
            <button onClick={()=>updateOrder(order?.ID,'price',{'price':Number(price)})}>save</button>  
        </>
    )
}
export default UpdatbleFields;