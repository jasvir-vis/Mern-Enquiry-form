import React, { useEffect, useState } from 'react';
import Elist from './components/Elist';
import axios from 'axios';

const App = () => {

  let [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: ""
  })

  let getValue = (e) => {
    let oldData = { ...formdata };
    let inputName = e.target.name;
    let inputValue = e.target.value;

    oldData[inputName] = inputValue;
    setFormdata(oldData);

  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (formdata._id === "") {
      axios.post('http://localhost:3000/api/insert', formdata)
        .then((response) => {
          console.log('Data inserted:', response.data);
          alert("Data inserted successfully!");
          fetchData();
          setFormdata({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: ""
          })
        })
        .catch((error) => {
          console.error('Insert failed:', error.message);
        });
    } else {
      axios.put(`http://localhost:3000/api/update/${formdata._id}`, formdata)
        .then((response) => {
          console.log('Data updated:', response.data);
          alert("Data updated successfully!");
          fetchData();
          setFormdata({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: ""
          })
        })
        .catch((error) => {
          console.error('Update failed:', error.message);
        });
    }

  }

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);





  return (
    <>
      <div className="flex h-screen w-screen">
        {/* enquiry form name,email,phone,message */}
        <div className="w-1/3 h-screen bg-white p-10">
          <h1 className="text-3xl font-bold text-gray-800">Enquiry Form
          </h1>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 text-sm mb-2" htmlFor="name">Name
              </label>
              <input onChange={getValue} value={formdata.name} className="w-full p-2 text-black bg-gray-200 border-none focus:outline-none focus:ring-0" type="text"
                id="name" name="name" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 text-sm mb-2" htmlFor="email">Email
              </label>
              <input onChange={getValue} value={formdata.email} className="w-full p-2 text-black bg-gray-200 border-none focus:outline-none focus:ring-0" type="email"
                id="email" name="email" placeholder="Enter your email" />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 text-sm mb-2" htmlFor="phone">Phone
              </label>
              <input onChange={getValue} value={formdata.phone} className="w-full p-2 text-black bg-gray-200 border-none focus:outline-none focus:ring-0" type="tel"
                id="phone" name="phone" placeholder="Enter your phone number" />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-600 text-sm mb-2" htmlFor="message">Message</label>
              <textarea onChange={getValue} value={formdata.message} className="w-full p-2 text-black bg-gray-200 border-none focus:outline-none focus:ring-0" id="message" name="message" placeholder="Enter your message" />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">{formdata._id !== "" ? 'Update': 'Submit' }</button>
          </form>
        </div>
        {/* enquiry list */}
        <div className="w-1/1 h-screen bg-gray-100 p-10">
          <h1 className="text-3xl font-bold text-gray-800">Enquiry List
          </h1>
          <Elist mydata={data} fetchdata={fetchData} setFormdata={setFormdata} formdata={formdata} />
        </div>
      </div>
    </>


  )
}

export default App
