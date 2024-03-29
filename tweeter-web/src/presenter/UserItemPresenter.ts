import { AuthToken, User } from "tweeter-shared";

export interface UserItemView {
  addItems: (items: User[]) => void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
  private _view: UserItemView;
  private _hasMoreItems: boolean = true;

  protected constructor(view: UserItemView) {
    this._view = view;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(item: boolean) {
    this._hasMoreItems = item;
  }

  protected get view() {
    return this._view;
  }

  public abstract loadMoreItems(authToken: AuthToken, displayedUser: User): void;
}