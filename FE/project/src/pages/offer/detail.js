import React from 'react';

const OfferDetails = () => {
    // Dummy data để demo layout UI
    const offer = {
        candidate: 'Nguyen Van A',
        position: 'Software Engineer',
        approvedBy: 'Hoang Quang (quanghv)',
        status: 'Waiting for Approval',
        interviewInfo: 'Schedule A - Interviewers: Binh, Linh',
        contractFrom: '01/07/2025',
        contractTo: '01/07/2026',
        interviewNotes: 'Candidate shows strong technical skills.',
        contractType: 'Full-time',
        level: 'Junior',
        department: 'IT',
        recruiterOwner: 'Nguyen Thi B (nguyenbt)',
        dueDate: '30/06/2025',
        basicSalary: '25,000,000 VND',
        notes: 'Need to finalize before Friday.',
        createdOn: 'Today',
        updatedBy: 'Hoang Quang (quanghv) - Today',
    };

    return (
        <div className="container-fluid p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Offer Details</h1>

            <div className="grid grid-cols-2 gap-6">
                <div><strong>Candidate:</strong> {offer.candidate}</div>
                <div><strong>Position:</strong> {offer.position}</div>
                <div><strong>Approved By:</strong> {offer.approvedBy}</div>
                <div><strong>Status:</strong> {offer.status}</div>
                <div><strong>Interview Info:</strong> {offer.interviewInfo}</div>
                <div><strong>Contract Period:</strong> {offer.contractFrom} - {offer.contractTo}</div>
                <div><strong>Interview Notes:</strong> {offer.interviewNotes}</div>
                <div><strong>Contract Type:</strong> {offer.contractType}</div>
                <div><strong>Level:</strong> {offer.level}</div>
                <div><strong>Department:</strong> {offer.department}</div>
                <div><strong>Recruiter Owner:</strong> {offer.recruiterOwner}</div>
                <div><strong>Due Date:</strong> {offer.dueDate}</div>
                <div><strong>Basic Salary:</strong> {offer.basicSalary}</div>
                <div><strong>Notes:</strong> {offer.notes}</div>
                <div><strong>Created On:</strong> {offer.createdOn}</div>
                <div><strong>Last Updated By:</strong> {offer.updatedBy}</div>
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Approve</button>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Reject</button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Mark as Sent</button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Accepted Offer</button>
                <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">Declined Offer</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Cancel Offer</button>
                <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Back</button>
            </div>
        </div>
    );
};

export default OfferDetails;
