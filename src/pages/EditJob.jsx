import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    type: "",
    title: "",
    description: "",
    salary: "",
    location: "",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      type: job.type,
      title: job.title,
      location: job.location,
      description: job.description,
      salary: job.salary,
      company: {
        name: job.company.name,
        description: job.company.description,
        contactEmail: job.company.contactEmail,
        contactPhone: job.company.contactPhone,
      },
    };

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const data = await response.json();
      toast.success(`Job listing for ${data} added successfully`, {
        autoClose: 3000,
      });
    } catch (error) {
      console.log("Error adding job: ", error);
    }

    navigate(`/jobs/${id}`);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl text-center font-semibold mb-6">
              Edit Job
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                required
                value={job.type}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    type: e.target.value,
                  }))
                }
              >
                <option value="" disabled hidden>
                  Select Job Type
                </option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                required
                value={job.title}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={job.description}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="salary"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={job.salary}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    salary: e.target.value,
                  }))
                }
              >
                <option value="" disabled hidden>
                  Select Salary Range
                </option>
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
                value={job.location}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    location: e.target.value,
                  }))
                }
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company_name"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={job.company.name}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    company: { ...prevForms.company, name: e.target.value },
                  }))
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="company_description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                value={job.company.description}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    company: {
                      ...prevForms.company,
                      description: e.target.value,
                    },
                  }))
                }
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contact_email"
                name="contactEmail"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                value={job.company.contactEmail}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    company: {
                      ...prevForms.company,
                      contactEmail: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contact_phone"
                name="contactPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                value={job.company.contactPhone}
                onChange={(e) =>
                  setJob((prevForms) => ({
                    ...prevForms,
                    company: {
                      ...prevForms.company,
                      contactPhone: e.target.value,
                    },
                  }))
                }
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJob;
