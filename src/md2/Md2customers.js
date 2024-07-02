import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../Config';

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const fetchViewCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}/md2customers`);
      // Convert timestamp to date string
      const customersWithFormattedDate = response.data.map(customer => {
        return {
          ...customer,
          date: new Date(customer.date).toLocaleDateString('en-GB') // Convert timestamp to date string in "dd/mm/yyyy" format
        };
      });
      setCustomers(customersWithFormattedDate);
      setFilteredCustomers(customersWithFormattedDate); // Initially, display all customers
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchViewCustomers();
  }, []);

  const deleteCustomer = async (billnumber) => {
    try {
      await axios.delete(`${config.url}/md2deletecustomer/${billnumber}`);
      fetchViewCustomers();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.billnumber.toString().includes(searchTerm) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]); // Re-run the effect when searchTerm or customers changes

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#003366' }} >MD2 Customers</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by Bill Number or Name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ padding: '5px', marginRight: '10px' }} // Adjust input padding and margin
        />
      </div>
      <table className="customers-table" >
        <thead>
          <tr>
            <th>Date</th>
            <th>Bill Number</th>
            <th>Name</th>
            <th>Amount at VJ</th>
            <th>Amount at MD2</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredCustomers) && filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.date}</td>
                <td>{customer.billnumber}</td>
                <td>{customer.name}</td>
                <td>{customer.amountatvj}</td>
                <td>{customer.amountatmd2}</td>
                <td>
                  <button onClick={() => deleteCustomer(customer.billnumber)} className='button'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
