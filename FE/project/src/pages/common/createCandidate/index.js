import React, { useState } from "react";
import Breadcrumb from "../../../component/breadcrumb";
import { ROUTERS } from "../../../utils/routers";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCandidate = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    cvFilePath: "",
    currentPosition: "",
    skills: [],
    recruiterId: "",
    note: "",
    status: "",
    yearsOfExperience: "",
    highestLevel: "",
  });

  const skillOptions = [
    "Java",
    "Spring Boot",
    "Python",
    "JavaScript",
    "React JS",
    "Angular",
    "Node JS",
    "HTML/CSS",
    "SQL",
    "MongoDB",
    "Docker",
    "Git",
    "AWS",
    "Azure",
    "Agile",
    "Scrum",
    "Communication",
    "Problem Solving",
    "Leadership",
    "C#",
  ];
  const genderOptions = ["Male", "Female"];
  const statusOptions = [
    "Open",
    "Waiting for interview",
    "Cancelled interview",
    "Passed Interview",
    "Failed interview",
    "Waiting for approval",
    "Approved offer",
    "Rejected offer",
    "Waiting for response",
    "Accepted offer",
    "Declined offer",
    "Cancelled offer",
    "Banned",
  ];
  const levelOptions = [
    "College",
    "Bachelor",
    "Master",
    "Undergraduate",
    "Junior",
  ];
  const recruiterOptions = ["anh1m1", "anh1m2", "anh1m3", "anh1m4", "anh1m5"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "http://localhost:8080/api/candidate-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (response.ok && result.id) {
        alert("Candidate created successfully!");
        navigate(ROUTERS.COMMON.CANDIDATE_LIST);
      } else {
        alert(result.message || "Tạo thất bại: có thể do trùng email/sđt");
      }
    } catch (error) {
      alert("Lỗi kết nối đến server!");
      console.error("Error:", error);
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div>
      <Breadcrumb
        title="Candidate List"
        subTitle="Create Candidate"
        path={ROUTERS.COMMON.CANDIDATE_LIST}
      />
      <form
        onSubmit={handleSubmit}
        className="p-6 grid grid-cols-2 gap-6 bg-[#f3f6fb] rounded-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full name *
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            D.O.B
          </label>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a gender</option>
            {genderOptions.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="relative col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CV attachment
          </label>
          <div className="relative">
            <input
              name="cvFilePath"
              value={form.cvFilePath}
              onChange={handleChange}
              className={inputClass + " pr-10"}
            />
            <label className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 hover:text-blue-600">
              <Upload size={20} />
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Position
          </label>
          <input
            name="currentPosition"
            value={form.currentPosition}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select status</option>
            {statusOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year of Experience
          </label>
          <input
            name="yearsOfExperience"
            type="number"
            value={form.yearsOfExperience}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Highest level *
          </label>
          <select
            name="highestLevel"
            value={form.highestLevel}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select highest level</option>
            {levelOptions.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <div className="flex flex-wrap gap-2">
            {skillOptions.map((skill) => (
              <button
                type="button"
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full border ${
                  form.skills.includes(skill)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recruiter
          </label>
          <select
            name="recruiterId"
            value={form.recruiterId}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select recruiter</option>
            {recruiterOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note
          </label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={4}
            className={inputClass}
          />
        </div>

        <div className="col-span-2 flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[#4CAF50] text-white rounded"
          >
            Submit
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded"
            onClick={() => navigate(ROUTERS.COMMON.CANDIDATE_LIST)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCandidate;
