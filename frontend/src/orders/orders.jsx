import { useContext, useEffect, useState } from "react";
import { ContextUser } from '../contextUser';
import fetchData from '../service/fectchData';
import '../css/orders.css';
import UpdatbleFields from "./updatbleFields";
import { ContextOrders } from "./contextOrders";

const Orders = () => {
    const { orders, setOrders } = useContext(ContextOrders);
    const { user } = useContext(ContextUser);
    const [filter, setFilter] = useState('none');
    const [searchEmail, setSearchEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const getOrders = async () => {
        try {
            let data;
            if (user?.role !== 'admin')
                data = await fetchData(`orders/userOrders`);
            else
                data = await fetchData('orders');
            setOrders(data);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }
    const updateOrder = async (orderId, field, updateField) => {
        try {
            const data = await fetchData(`orders/${orderId}/${field}`, 'PUT', updateField);
            setOrders(orders.map(order => order.ID === orderId ? data : order));
        }
        catch (e) {
            console.error(e);
        }
    }
    const deleteOrder = async (orderId) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this order?');
            if (!confirmed) return;
            await fetchData(`orders/${orderId}`, 'DELETE');
            setOrders(orders.filter(order => order.ID !== orderId));
        }
        catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        getOrders();
    }, [user]);

    if (loading) return <p>Loading...</p>;
    if (orders.length === 0) return <p>You have no orders</p>;

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filter === 'none' || order.Status === filter;
        const matchesEmail = searchEmail.trim() === '' || order.email?.toLowerCase().includes(searchEmail.toLowerCase());
        return matchesStatus && matchesEmail;
    });

    return (
        <div className="orders">
            <div className="filter">
                <label>Status:</label>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="open">open</option>
                    <option value="in_progress">in progress</option>
                    <option value="completed">completed</option>
                    <option value="none">none</option>
                </select>
                {user?.role === 'admin' && (
                    <>
                        <label>Search by email:</label>
                        <input
                            type="text"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            placeholder="Enter email..."
                        />
                    </>
                )}
            </div>

            <div className="orders-cards">
                {filteredOrders.map(order => (
                    <div className="order-card" key={order.ID}>
                        {user?.role === 'admin' && (
                            <p><strong>Client:</strong> <br />{order.name}, {order.email}, {order.phone}</p>
                        )}
                        <p><strong>Description:</strong><br /> {order.Description}</p>
                        <p><strong>Order Date:</strong> <br />{new Date(order.OrderDate).toLocaleDateString()}</p>
                        <p><strong>Completion Date:</strong><br /> {order.CompletionDate ? new Date(order.CompletionDate).toLocaleDateString() : '-'}</p>
                        {order.ReferenceImagePath && (
                            <div>
                                <strong>Reference Image:</strong>
                                <br />
                                <img src={`http://localhost:3000/api/ordersPic/${order.ReferenceImagePath}`} alt="reference" className="ref-img" />
                            </div>
                        )}
                        {order.Status !== 'completed' && user?.role === 'admin' ? (
                            <UpdatbleFields order={order} updateOrder={updateOrder} />
                        ) : (
                            <>
                                <p><strong>Status:</strong> {order.Status}</p>
                                <p><strong>Price:</strong> {order.price}</p>
                            </>
                        )}
                        {order.Status === 'open' && user?.id === order.UserID && (
                            <button onClick={() => deleteOrder(order.ID)}>Cancel</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;
