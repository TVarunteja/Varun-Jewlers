import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../Config';


export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchViewCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}/md1customers`);
      const customersWithFormattedDate = response.data.map(customer => {
        return {
          ...customer,
          date: new Date(customer.date).toLocaleDateString('en-GB') // Convert timestamp to date string in "dd/mm/yyyy" format
        };
      });
      setCustomers(customersWithFormattedDate);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchViewCustomers();
  }, []);

  const deleteCustomer = async (billnumber) => {
    try {
      await axios.delete(`${config.url}/md1deletecustomer/${billnumber}`);
      fetchViewCustomers();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.billnumber.toString().includes(searchTerm) ||
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: '#003366' }} >MD1 Customers</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by Bill Number or Name..." 
          value={searchTerm} 
          onChange={handleSearch} 
          style={{ padding: '5px', marginRight: '10px' }} // Adjust input padding and margin
        />
      </div>
      {filteredCustomers && filteredCustomers.length > 0 ? (
        <table className="customers-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Bill Number</th>
              <th>Bill Number At Md1</th>
              <th>Name</th>
              <th>Amount at VJ</th>
              <th>Amount at MD1</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.date}</td>
                <td>{customer.billnumber}</td>
                <td>{customer.billnumbermd1}</td>
                <td>{customer.name}</td>
                <td>{customer.amountatvj}</td>
                <td>{customer.amountatmd1}</td>
                <td>
                  <button onClick={() => deleteCustomer(customer.billnumber)} className='button'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Data Not Found</p>
      )}
    </div>
  );
}
