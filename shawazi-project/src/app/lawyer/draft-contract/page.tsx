
import React from 'react';
import Link from 'next/link';
import { CheckCircle, Settings, Shield } from 'lucide-react';
import Image from 'next/image';
import SideBar from '@/app/components/SideBarPwa';


const WelcomeSection = () => {
  return (
    <div className="flex">
      <SideBar userRole={''}/>
      <div className="p-6 font-sans flex flex-col min-h-screen flex-grow">
        <h1 className="text-4xl font-semibold mb-16 text-center md:ml-0 ml-12 mt-6 py-4 mr-80">
          Welcome Lawyer, to The Shawazi Application
        </h1>
        <div className="flex flex-col md:flex-row mb-16 items-center justify-center mt-12 gap-6 md:gap-10 mr-32">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <Image
              src="/media/low.png"
              alt="Legal scales and gavel"
              width={700}
              height={700}
              className="rounded-lg mx-auto"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center mb-6 gap-x-4">
              <CheckCircle className="mr-4" size={32} />
              <span className="text-xl">Transparency</span>
            </div>
            <div className="flex items-center mb-6 gap-x-4">
              <Settings className="mr-4" size={32} />
              <span className="text-xl">Verify Transactions</span>
            </div>
            <div className="flex items-center gap-x-4">
              <Shield className="mr-4" size={32} />
              <span className="text-xl">Management</span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex justify-center mb-12">
          <Link href="/components/Link-to-join">
          <div className="flex justify-center">
  <button className="bg-[#508408] text-white px-10 py-2 rounded-md text-l hover:bg-opacity-90 transition-colors duration-300">
    View agreement
  </button>
</div>


          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

























// import React from 'react';
// import Link from 'next/link';
// import { CheckCircle, Settings, Shield } from 'lucide-react';
// import Image from 'next/image';
// import Sidebar from '../../Sidebar';

// const WelcomeSection = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="p-6 font-sans flex flex-col min-h-screen flex-grow">
//         <h1 className="text-4xl font-semibold mb-16 text-center md:ml-0 ml-12 mt-6 py-4">
//           Welcome Lawyer, to The Shawazi Application
//         </h1>
        
//         <div className="flex flex-col md:flex-row mb-16 items-center justify-center mt-12 gap-6 md:gap-10 pl-72">
//           <div className="w-full md:w-1/2 mb-6 md:mb-0">
//             <Image
//               src="/media/low.png"
//               alt="Legal scales and gavel"
//               width={700} 
//               height={700} 
//               className="rounded-lg mx-auto"
//             />
//           </div>
//           <div className="w-full md:w-1/2 flex flex-col justify-center">
//             <div className="flex items-center mb-6 gap-x-4">
//               <CheckCircle className="mr-4" size={32} />
//               <span className="text-xl">Transparency</span>
//             </div>
//             <div className="flex items-center mb-6 gap-x-4">
//               <Settings className="mr-4" size={32} />
//               <span className="text-xl">Verify Transactions</span>
//             </div>
//             <div className="flex items-center gap-x-4">
//               <Shield className="mr-4" size={32} />
//               <span className="text-xl">Management</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-auto flex justify-center mb-12">
//           <Link href="/components/Link-to-join"> 
//             <button className="bg-[#508408] text-white px-4 md:px-80 py-2 rounded-md text-l hover:bg-opacity-90 transition-colors duration-300 w-full">
//               View agreement
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WelcomeSection;


