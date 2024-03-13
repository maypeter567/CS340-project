export interface FollowingView {

}

class FollowingPresenter {
  private view: FollowingView;

  public constructor(view: FollowingView) {
    this.view = view;
  }
}