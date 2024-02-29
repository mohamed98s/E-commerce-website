// import axios from 'axios';
// import React from 'react'
// import { useQuery } from 'react-query';

// export default function Sub(props) {

//     let baseURL = "https://ecommerce.routemisr.com/api/v1/categories/";

//   function getSub() {
//     return axios.get(`${baseURL}${props.idSub}/subcategories`);
//   }
//   function useSub(key, fn) {
//     return useQuery(key, fn, {
//       select: (data) => data.data.data,
//     });
//   }

//   let {data} = useSub('getsub', getSub)
//  console.log(data);
//   return (
//     <>
//         <h2>{props.idSub}</h2>
//         {/* <div className='row gy-3'>
//             {}
//         </div> */}
//     </>
//   )
// }
