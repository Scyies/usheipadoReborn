import { useRecoilValue } from 'recoil';
import { filteredTreinos } from '../atom/selectors';

export function useGetTreinosByDay() {
  return useRecoilValue(filteredTreinos);
}
