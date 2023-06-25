import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import { MdEdit } from "react-icons/md";
import { FaEye, FaTrash } from "react-icons/fa";
import { Dna } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Company = () => {
  const navigate = useNavigate();

  // INPUT VALUES STATE
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [companies, setCompanies] = useState();

  // CHECKING MODAL FOR ADD / UPDATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FOR LOADER
  const [loading, setLoading] = useState(false);

  // SAVING COMPANY STATE FOR UPDATE MODAL
  const [selectedCompany, setSelectedCompany] = useState(null);

  // GET LIST OF COMPANY

  const fetchCompanies = async () => {
    try {
      await setLoading(true);
      const data = await fetch(
        "https://talented-toad-bedclothes.cyclic.app/companies",
        {
          method: "GET",
        }
      );

      const res = await data.json();
      setLoading(false);
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

  // UPDATE COMPANY

  const handleUpdateCompany = async (id) => {
    try {
      const data = await fetch(
        `https://talented-toad-bedclothes.cyclic.app/company/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(selectedCompany),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await data.json();
      if (res.success) toast.success("Company Updated Successfully!");
      setSelectedCompany(null);
      setIsModalOpen(false);
      window.my_modal_5.close();
      fetchCompanies();
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ON FIRST RENDER

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <>
      <Toaster />
      <div className="containerWrap mt-8 py-6  flex m-auto justify-center flex-col">
        <div className="flex justify-end">
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn"
            onClick={() => {
              setSelectedCompany(null);
              window.my_modal_5.showModal();
              setIsModalOpen(true);
            }}
          >
            ADD
          </button>
        </div>

        {/* TABLE */}

        {!loading ? (
          <div className="overflow-x-auto mt-6 py-6">
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
                {/* MAPPING ARRAY OF OBJECTS AND RENDERING ITERATIVELY */}
                {companies?.map((res, i) => (
                  <>
                    <tr
                      className="cursor-pointer hover:bg-base-200"
                      key={res?._id}
                    >
                      <th>{i + 1}</th>
                      <td>{res?.name}</td>
                      <td>{res?.location}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          {/* SENDING AND SELECTING COMPANY DATA TO MODAL */}
                          <MdEdit
                            onClick={() => {
                              setSelectedCompany(res);
                              window.my_modal_5.showModal(res);
                              setIsModalOpen(true);
                            }}
                            className="cursor-pointer"
                            size={20}
                          />
                          {/* CALLING DELETE FUNCTION */}
                          <FaTrash
                            className="cursor-pointer"
                            onClick={() => handleDeleteCompany(res?._id)}
                            size={20}
                          />

                          {/* VIEW DETAILS OF A COMPANY */}

                          <FaEye
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(`/individual/${res?._id}`, {
                                state: res,
                              })
                            }
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
        ) : (
          <>
            {/* LOADER */}
            <div className="flex items-center justify-center m-auto">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          </>
        )}
      </div>

      {/*DYNAMIC MODAL FOR BOTH ADD AND UPDATE  */}

      <dialog
        id="my_modal_5"
        className={`modal modal-bottom sm:modal-middle ${
          isModalOpen ? "open" : ""
        }`}
      >
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">
            {selectedCompany ? "Update Company" : "Add a new Company?"}
          </h3>
          <div className="py-4">
            <div className="py-4">
              <input
                type="text"
                placeholder="Name..."
                value={selectedCompany ? selectedCompany.name : name}
                onChange={(e) => {
                  if (selectedCompany) {
                    setSelectedCompany((prevCompany) => ({
                      ...prevCompany,
                      name: e.target.value,
                    }));
                  } else {
                    setName(e.target.value);
                  }
                }}
                className="input input-bordered input-info w-full max-w-xs"
              />
            </div>
            <div className="py-4">
              <input
                type="text"
                placeholder="Location..."
                value={selectedCompany ? selectedCompany.location : location}
                onChange={(e) => {
                  if (selectedCompany) {
                    setSelectedCompany((prevCompany) => ({
                      ...prevCompany,
                      location: e.target.value,
                    }));
                  } else {
                    setLocation(e.target.value);
                  }
                }}
                className="input input-bordered input-info w-full max-w-xs"
              />
            </div>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            {selectedCompany ? (
              <span
                onClick={() => {
                  handleUpdateCompany(selectedCompany?._id);
                }}
                className="btn btn-primary"
              >
                Update
              </span>
            ) : (
              <span
                onClick={() => {
                  handleAddCompany();
                }}
                className="btn btn-primary"
              >
                Add
              </span>
            )}

            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      {/* MODAL */}
    </>
  );
};

export default Company;
