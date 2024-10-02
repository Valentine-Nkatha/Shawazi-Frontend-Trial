import Image from 'next/image';
import { FC } from 'react';
import SideBar from '@/app/components/SideBarPwa';

const Dashboard: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <SideBar userRole="seller" />
      <div className="flex">
        <aside className="bg-black text-white w-64 py-8 px-6">
          <div className="flex items-center mb-12">
            <Image src="/path_to_your_logo.png" alt="Shawazi Logo" width={50} height={50} />
            <h1 className="text-3xl font-bold">SHAWAZI</h1>
          </div>
          <nav className="space-y-6">
            <a href="#" className="flex items-center text-yellow-400">
              <span className="ml-4">Home</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="ml-4">Profile</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="ml-4">ChatRoom</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="ml-4">Contract</span>
            </a>
            <a href="#" className="flex items-center">
              <span className="ml-4">Transactions</span>
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-[25px] font-semibold justify-center px-[350px] ml-80">Hello John, Welcome to Shawazi</h2>
            </div>
          </header>
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-300 rounded-lg p-4 w-1/2 ml-96 mb-8"
          />
          <p className="text-black-600 px-[350px] ml-80 text-[20px] mb-18">Let&apos;s start, you have no new notifications</p>
          <div className="grid grid-cols-3 gap-8 mb-8 h-[170px] w-[700px] ml-72 mt-96">
            <button className="bg-yellow-500 text-white py-4 rounded-md shadow-lg">
              Upload land documents
            </button>
            <button className="bg-yellow-500 text-white py-4 rounded-md shadow-lg mt-10">
              Go to chats
            </button>
            <button className="bg-yellow-500 text-white py-4 rounded-md shadow-lg ml-8">
              Upload receipt of payment
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Grace Wahome</td>
                  <td className="py-3 px-4">1 Aug 2024</td>
                  <td className="py-3 px-4 text-green-600">Completed</td>
                  <td className="py-3 px-4">Ksh XXXXX</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Grace Wahome</td>
                  <td className="py-3 px-4">1 Aug 2024</td>
                  <td className="py-3 px-4 text-green-600">Completed</td>
                  <td className="py-3 px-4">Ksh XXXXX</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="bg-green-700 text-white mt-4 px-8 py-2 rounded-lg ">
            View More
          </button>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
