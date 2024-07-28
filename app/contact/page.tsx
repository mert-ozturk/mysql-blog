"use client"
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import emailjs from "@emailjs/browser"


const Contact  = () => {
  const [security,setSecurity] = useState("")
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs
    .sendForm(
      'service_02q1lhm', 
      'template_6xd1kfu', 
      e.target, 
       'UDsfVTsIbGeI8T7xs',
    )
    .then(
      (result) => {
        console.log(result.text);
        alert("Email send !")
      },
      (error) => {
        console.log('FAILED...', error.text);
        alert("Failed to send Error !")
      },
    );
    setFormData({
      name:"",
      email:"",
      message:"",
    })
  
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prevFormData)=>({
      ...prevFormData,
      [name]:value,
    }))
  }

  

  return (
    <section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
      <form   className="space-y-8" onSubmit={handleSubmit}>
           <div>
              <label   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
              <input name='name' value={formData.name} onChange={handleChange} type="name"   className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required/>
          </div>

          <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input name='email' value={formData.email} onChange={handleChange} type="email"   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
          </div>
        
          <div className="sm:col-span-2">
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea name='message' value={formData.message} onChange={handleChange}   className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <div className="sm:col-span-2">
          <label  className="block mb-2 text-sm font-medium text-red-500 dark:text-gray-400">Türkiye'nin Başkenti  (küçük harfler ile)</label>
            <input   onChange={(e)=>setSecurity(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
            {security === "ankara"   && (
          <>
          <Button type="submit" >Send message</Button>
          </>
        )}
        </div>
      </form>
  </div>
</section>
  );
};

export default Contact;