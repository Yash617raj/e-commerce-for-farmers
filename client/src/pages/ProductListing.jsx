import React, { useState } from "react";
import {
  farmingMethodsNames,
  irrigationMethods,
  pesticides,
  soilTypes,
} from "../constants/farmingInput.js";

export default function ProductListing() {

  const inputDecoration = "border rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700";
  const labelDecoration = "text-white font-semibold";
  const headingDecoration = "text-white text-3xl";
  const sectionDecoration = "flex flex-col gap-2 border-2 border-slate-500 my-6 rounded-lg p-5";

  const [formData, setFormData] = useState({
    productInfo : {
      productName : "",
      productQuantity : "",
      price : "",
      harvestDate : ""
    },
    farmingAndCultivationInfo : {
      farmingMethod : "",
      farmLocation : "",
      farmSize : "",
      soilType : "",
      irrigationMethods : "",
      pesticidesUsed : "",
    },

    productDescription : {
      productQuantity : "",
      variety : "",
      packaging : "",
      minOrderQuantity : "",
      productImages : ""
    }
  })

  const handleInputChange = (e) => {
    if(e.target.parentNode.id === "productInfo"){
      setFormData({
        ...formData,
        productInfo : {...formData.productInfo, [e.target.id] : e.target.value}
      })
    }
    if(e.target.parentNode.id === "farmingAndCultivationInfo") {
      setFormData({
        ...formData,
        farmingAndCultivationInfo : {...formData.farmingAndCultivationInfo, [e.target.id] : e.target.value}
      })
    }
    if(e.target.parentNode.id === "productDescription"){
      setFormData({
        ...formData,
        productDescription : {...formData.productDescription, [e.target.id] : e.target.value}
      })
    }
  }

  // console.log(formData);

  const handleSubmitFromData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/farmer/productlisting", {
        method : "POST",
        headers : {
          'content-type' : "application/json"
        },
        body : JSON.stringify(formData)
      });

      const data = await res.json();
      if(data.success == false) {
        console.log(data.message);
        return;
      }

      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="flex flex-col gap-3 p-8 bg-[#243642] items-center">
      <h1 className="text-center text-2xl text-white">
        List your product details
      </h1>
      <form onSubmit={handleSubmitFromData} className="border border-black-200 rounded-lg p-8 shadow-2xl">
        <h3 className={headingDecoration}>Product Information</h3>
        <div className={sectionDecoration} id="productInfo">
          <label className={labelDecoration}>Product Name:</label>
          <input
            type="text"
            className={inputDecoration}
            onChange={handleInputChange}
            id="productName"
          />
          <label className={labelDecoration}>Product Quantity:</label>
          <input
            type="number"
            className={inputDecoration}
            id="productQuantity"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>Price:</label>
          <input
            type="number"
            className={inputDecoration}
            id="price"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>Harvest Date:</label>
          <input
            type="date"
            className={inputDecoration}
            id="harvestDate"
            onChange={handleInputChange}
          />
        </div>
        <h3 className={headingDecoration}>
          Farming and Cultivation Information
        </h3>
        <div className={sectionDecoration} id="farmingAndCultivationInfo">
          <label className={labelDecoration}>Farming Method: </label>
          <select
            name=""
            id=""
            className={inputDecoration}
            id="farmingMethod"
            onChange={handleInputChange}
          >
            <option value="hello" disabled>
              Farming methods
            </option>
            {farmingMethodsNames.map((farmingMethod) => (
              <option value={farmingMethod} key={farmingMethod}>
                {farmingMethod}
              </option>
            ))}
          </select>
          <label className={labelDecoration}>Farm Location</label>
          <input
            type="text"
            className={inputDecoration}
            id="farmLocation"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>Farm Size: </label>
          <input
            type="number"
            className={inputDecoration}
            id="farmSize"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>Soil Type: </label>
          <select
            name=""
            id=""
            className={inputDecoration}
            id="soilType"
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              soil Types
            </option>
            {soilTypes.map((soilType) => (
              <option value={soilType} key={soilType}>
                {soilType}
              </option>
            ))}
          </select>
          <label className={labelDecoration}>Irrigation Method:</label>
          <select
            name=""
            id=""
            className={inputDecoration}
            id="irrigationMethod"
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              Irrigation Method
            </option>
            {irrigationMethods.map((method) => (
              <option value={method} key={method}>
                {method}
              </option>
            ))}
          </select>

          <label className={labelDecoration}>pesticides:</label>
          <select
            name=""
            id=""
            className={inputDecoration}
            id="pesticidesUsed"
            onChange={handleInputChange}
          >
            <option value="" disabled selected>
              pesticide
            </option>
            {pesticides.map((pesticide) => (
              <option value={pesticide} key={pesticide}>
                {pesticide}
              </option>
            ))}
          </select>
        </div>
        <h3 className={headingDecoration}>Product Description:</h3>
        <div className={sectionDecoration} id="productDescription">
          <label className={labelDecoration}>Product Quality:</label>
          <input
            type="text"
            className={inputDecoration}
            id="productQuality"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>variety</label>
          <input
            type="text"
            className={inputDecoration}
            id="variety"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>packaging:</label>
          <input
            type="text"
            className={inputDecoration}
            id="packaging"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>Min Order Quantity: </label>
          <input
            type="number"
            className={inputDecoration}
            id="minOrderQuantity"
            onChange={handleInputChange}
          />
          <label className={labelDecoration}>Product Images: </label>
          <input
            type="file"
            className={inputDecoration}
            id="productImages"
            onChange={handleInputChange}
          />
        </div>
        <button className="border rounded-lg bg-green-700 p-3 text-white min-w-full uppercase">
          Submit
        </button>
      </form>
    </div>
  );
}
