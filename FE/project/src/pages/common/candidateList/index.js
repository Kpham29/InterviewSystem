import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../component/breadcrumb";
import { ROUTERS } from "../../../utils/routers";
import { Eye, Edit, Trash2 } from "lucide-react";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();

      if (keyword) params.append("keyword", keyword);
      if (status) params.append("status", status);

      const res = await fetch(
        `http://localhost:8080/api/candidate-list?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCandidates();
  };

  return (
    <div className="p-4">
      <Breadcrumb title="Candidate List" path={ROUTERS.COMMON.CANDIDATE_LIST} />

      <form
        onSubmit={handleSearch}
        className="flex flex-wrap gap-3 items-center mb-4"
      >
        <input
          type="text"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Status</option>
          <option value="Waiting for interview">Waiting for interview</option>
          <option value="Open">Open</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Offered">Offered</option>
          <option value="Failed">Failed</option>
          <option value="Offer rejected">Offer rejected</option>
          <option value="Banned">Banned</option>
        </select>
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
        <button
          type="button"
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto"
        >
          Add new
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Phone No.</th>
              <th className="border px-4 py-2 text-left">Current Position</th>
              <th className="border px-4 py-2 text-left">Recruiter</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No candidates found.
                </td>
              </tr>
            ) : (
              candidates.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{c.fullName}</td>
                  <td className="border px-4 py-2">{c.email}</td>
                  <td className="border px-4 py-2">{c.phone}</td>
                  <td className="border px-4 py-2">{c.currentPosition}</td>
                  <td className="border px-4 py-2">{c.recruiter}</td>
                  <td className="border px-4 py-2">{c.status}</td>
                  <td className="border px-4 py-2 text-center space-x-2">
                    <button className="text-gray-600 hover:text-black">
                      <Eye size={16} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
