import axios from "axios";
import { useQuery } from "react-query";




  export function useBrand(key, fn) {
    
    return useQuery(key, fn)
  }