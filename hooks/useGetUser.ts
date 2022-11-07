import { useRecoilState } from 'recoil';
import { user } from '../atom/atom';

export function useGetUser() {
  const [userInfo, setUserInfo] = useRecoilState(user);

  return { userInfo, setUserInfo };
}
