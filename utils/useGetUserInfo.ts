import { ResponsiveContainer } from "recharts";
import { supabase } from "../pages/supa";

export default async function useGetUserInfo() {
  const {data, error} = await supabase.auth.getUser();
  return data
}
