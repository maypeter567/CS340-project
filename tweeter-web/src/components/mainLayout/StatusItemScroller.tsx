import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useUserInfo from "../userInfo/UserHook";

export const PAGE_SIZE = 10;

interface Props {
  loadMoreItems: (
    authToken: AuthToken,
    displayedUser: User,
    PAGE_SIZE: 10,
    lastItem: Status | null
    ) => Promise<[Status[], boolean]>;
  description: string;
}

const InfiniteScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [lastItem, setLastItem] = useState<Status | null>(null);

  // Required to allow the addItems method to see the current value of 'items'
  // instead of the value from when the closure was created.
  const itemsReference = useRef(items);
  itemsReference.current = items;

  const addItems = (newItems: Status[]) =>
    setItems([...itemsReference.current, ...newItems]);

  const { displayedUser, authToken } = useUserInfo();

  // Load initial items
  useEffect(() => {
    loadMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreItems = async () => {
    try {
      if (hasMoreItems) {
        let [newItems, hasMore] = await props.loadMoreItems(
          authToken!,
          displayedUser!,
          PAGE_SIZE,
          lastItem
        );

        setHasMoreItems(hasMore);
        setLastItem(newItems[newItems.length - 1]);
        addItems(newItems);
      }
    } catch (error) {
      displayErrorMessage(
        `Failed to load ${props.description} because of exception: ${error}`
      );
    }
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <StatusItem value={item} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScroller;
