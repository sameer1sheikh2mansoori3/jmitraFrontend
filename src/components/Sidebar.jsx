/* eslint-disable react/prop-types */


const Sidebar = ({ user, onClose, onEdit }) => {
  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl">Profile Details i am side bar</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Avatar:</strong> <img src={user.avatar} alt="Avatar" className="w-12 h-12 rounded-full" /></p>
        <button className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700" onClick={onEdit}>
          Edit
        </button>
        <button className="px-4 py-2 mt-2 text-white bg-red-600 rounded hover:bg-red-700" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Sidebar