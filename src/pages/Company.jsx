import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Company = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [companies, setCompanies] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // GET LIST OF COMPANY

  const fetchCompanies = async () => {
    try {
      const data = await fetch(
        "https://talented-toad-bedclothes.cyclic.app/companies",
        {
          method: "GET",
        }
      );

      const res = await data.json();
      setCompanies(res);
    } catch (error) {
      console.log(error);
    }
  };

  //   ADD COMPANY

  const handleAddCompany = async () => {
    if (name === "" || location === "") {
      toast.error("Please Fill Required Details!");
      return;
    }

    try {
      const data = await fetch(
        "https://talented-toad-bedclothes.cyclic.app/company",
        {
          method: "POST",
          body: JSON.stringify({ name, location }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await data.json();
      fetchCompanies();
      toast.success("Company Added Successfully !");
      // Reset the state and close the modal
      setName("");
      setLocation("");
      setIsModalOpen(false);
      window.my_modal_5.close();
    } catch (error) {
      console.log(error);
    }
  };

  //   DELETE COMPANY

  const handleDeleteCompany = async (id) => {
    try {
      const data = await fetch(
        `https://talented-toad-bedclothes.cyclic.app/company/${id}`,
        {
          method: "DELETE",
        }
      );

      const res = await data.json();
      if (res.success) toast.success("Company Deleted Successfully!");
      fetchCompanies();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <>
      <Toaster />
      <div className="containerWrap mt-8">
        <div className="float-right">
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn"
            onClick={() => {
              window.my_modal_5.showModal();
              setIsModalOpen(true);
            }}
          >
            ADD
          </button>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies?.map((res, i) => (
                <>
                  <tr key={res?._id}>
                    <th>{i + 1}</th>
                    <td>{res?.name}</td>
                    <td>{res?.location}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <MdEdit className="cursor-pointer" size={20} />
                        <FaTrash
                          className="cursor-pointer"
                          onClick={() => handleDeleteCompany(res?._id)}
                          size={20}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}

      <dialog
        id="my_modal_5"
        className={`modal modal-bottom sm:modal-middle ${
          isModalOpen ? "open" : ""
        }`}
      >
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Add a new Company?</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <span
              onClick={() => {
                handleAddCompany();
              }}
              className="btn btn-primary"
            >
              Add
            </span>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      {/* MODAL */}
    </>
  );
};

export default Company;
