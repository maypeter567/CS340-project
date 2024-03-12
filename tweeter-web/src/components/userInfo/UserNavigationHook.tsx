import { useContext } from "react";
import { AuthToken, FakeData, User } from "tweeter-shared";
import useToastListener from "../toaster/ToastListenerHook";
import { UserInfoContext } from "./UserInfoProvider";

const useUserNavigationInfo = () => {
  const { displayErrorMessage } = useToastListener();
  const { setDisplayedUser, currentUser, authToken } =
    useContext(UserInfoContext);

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    try {
      let alias = extractAlias(event.target.toString());

      let user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };
  const extractAlias = (value: string): string => {
    let index = value.indexOf("@");
    return value.substring(index);
  };
  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    return FakeData.instance.findUserByAlias(alias);
  }

  return navigateToUser;
}

export default useUserNavigationInfo