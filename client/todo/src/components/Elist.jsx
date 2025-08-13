import React, { useState } from 'react'
import axios from 'axios';

const Elist = ({ mydata, fetchdata, formdata, setFormdata }) => {

  let [searchdata, setSearchdata] = useState([]);
  let [search, setSearch] = useState("");
  let [isSearch, setIsSearch] = useState(false);

  const deleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/delete/${id}`);
      alert("Data deleted");
      fetchdata();
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Error deleting data");
    }
  };

  let updateRow = async (id) => {
    if (formdata._id === "") {
      setFormdata({
        _id: id,
        name: mydata.find(item => item._id === id).name,
        email: mydata.find(item => item._id === id).email,
        phone:
          mydata.find(item => item._id === id).phone,
        message: mydata.find(item => item._id === id).message
      })

      alert("form data filled");
    } else {
      alert(formdata._id);
    }

  }

  let searchHandle = async (e) => {
    e.preventDefault();

    let value = search.trim();
    if (!value) return;

    try {
      let res = await axios.get(`http://localhost:3000/api/search?q=${value}`);
      console.log(res.data);
      setSearchdata(res.data)
      setIsSearch(true);

    } catch (err) {
      console.log(err);
      setIsSearch(true);
      setSearchdata([]);
    }
  }

  return (
    <div>

      <form onSubmit={searchHandle} className='py-4 my-3 flex'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 mx-3 text-gray-700 rounded border" type="text" id="search" name="search" placeholder="Search here" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
    px-4 rounded" type="submit">Search</button>

      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Message</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Edit</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {search !== "" && isSearch ? (
              searchdata.length >= 1 ? (
                searchdata.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.message}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => updateRow(item._id)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded">Edit</button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => deleteRow(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-800">No Data Found</td>
                </tr>
              )
            ) : (
              mydata.length >= 1 ? (
                mydata.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{item.message}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => updateRow(item._id)} className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded">Edit</button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => deleteRow(item._id)} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-800">No Data Found</td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default Elist
