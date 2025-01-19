import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchAllWeaponPairs } from "../../services/weapons";
import { WeaponPairType } from "../../types/Weapon.types";

import "./AdminPage.css";

const AdminWeaponPanel = () => {
  const [weaponPairs, setWeaponPairs] = useState<WeaponPairType[]>([]);

  // Fetch weapon pairs
  useEffect(() => {
    const fetchWeaponPairs = async () => {
      try {
        const response = await fetchAllWeaponPairs();
        setWeaponPairs(response.data);
      } catch (error) {
        console.error("Error fetching weapon pairs:", error);
      }
    };

    fetchWeaponPairs();
  }, []);

  // Validation schema
  const weaponSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    year: Yup.string().required("Year is required"),
    media: Yup.string()
      .url("Must be a valid URL")
      .required("Media URL is required"),
    shortText: Yup.string().required("Short description is required"),
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Admin Weapon Panel
      </h1>

      {/* Weapon Pairs Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {weaponPairs.map((pair, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{pair.name}</h2>
            <div className="flex space-x-4">
              {pair.weapons.map((weapon, idx) => (
                <div key={idx} className="flex-1">
                  <img
                    src={`/assets/${weapon.media}.png`}
                    alt={weapon.name}
                    className="w-full h-50 object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-medium text-gray-700">
                    {weapon.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {weapon.year} {weapon.country}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Weapon Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Weapon</h2>
        <Formik
          initialValues={{
            name: "",
            country: "",
            year: "",
            media: "",
            shortText: "",
          }}
          validationSchema={weaponSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              await axios.post("/api/weapons", values);
              alert("Weapon added successfully!");
              resetForm();
            } catch (error) {
              console.error("Error adding new weapon:", error);
              alert("Failed to add weapon.");
            }
          }}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <Field
                  name="country"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <Field
                  name="year"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Media URL
                </label>
                <Field
                  name="media"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="media"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Short Description
                </label>
                <Field
                  name="shortText"
                  as="textarea"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage
                  name="shortText"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Add Weapon
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminWeaponPanel;
