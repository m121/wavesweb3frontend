
import { useRouter } from 'next/router'
import React from "react";

export default function Header(props) {
  const router = useRouter()
  

  return (
    <div className=" top-0">
      
      <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
         
        </nav>
       
      </div>
    </header>
    </div>
  );
}