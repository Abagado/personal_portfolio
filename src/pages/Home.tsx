import {Introduction} from '../components/Introduction';
import {ProfilePic} from '../components/ProfilePic';


export const Home = () => {
  return (
    <div className="ml-[90px] min-h-screen grid grid-cols-1 md:grid-cols-3">
      <div className="col-span-2 p-5">
        <Introduction />
      </div>
      <div className="hidden md:block">
        <ProfilePic />
      </div>
    </div>
  );
};
