import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "../../../component/breadcrumb";
import { ROUTERS } from "../../../utils/routers";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [role] = useState(localStorage.getItem("role"));
  const navigate = useNavigate();

  const fetchCandidates = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (status) params.append("status", status);
      params.append("page", page);
      params.append("size", 10);

      const res = await fetch(
        `http://localhost:8080/api/candidate-list?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setCandidates(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching candidates", err);
    }
  }, [keyword, status, page]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
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
          <option value="Open">Open</option>
          <option value="Waiting for interview">Waiting for interview</option>
          <option value="Cancelled interview">Cancelled interview</option>
          <option value="Passed Interview">Passed Interview</option>
          <option value="Failed interview">Failed interview</option>
          <option value="Waiting for approval">Waiting for approval</option>
          <option value="Approved offer">Approved offer</option>
          <option value="Rejected offer">Rejected offer</option>
          <option value="Waiting for response">Waiting for response</option>
          <option value="Accepted offer">Accepted offer</option>
          <option value="Declined offer">Declined offer</option>
          <option value="Cancelled offer">Cancelled offer</option>
          <option value="Banned">Banned</option>
        </select>
        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>

        {role !== "interviewer" && (
          <button
            type="button"
            className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600 ml-auto"
            onClick={() => navigate(ROUTERS.COMMON.CANDIDATE_CREATE)}
          >
            Add new
          </button>
        )}
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
                    {role !== "interviewer" && (
                      <>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>{`${candidates.length} rows shown`}</span>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-3 py-1 border rounded hover:bg-blue-600 hover:text-white ${
                page === i ? "bg-blue-600 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateList;
