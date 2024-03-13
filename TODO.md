**Refactor the provided code to have a proper layered architecture. Your refactored design should include:**

- A view layer consisting of React components and React Hooks. [Already created but will need to be modified]
- A presenter layer.
- An application logic layer (i.e. your service classes).
- A domain model layer. [This already exists in the tweeter-shared module and likely will not need to change]
- You are to use the observer pattern as demonstrated in the M2A demo video to communicate from the presenter layer to the view layer. The use of - async/await prevents the need to use the observer pattern to communicate from the service layer to the presenter layer.

# notes from the video.
1. move FakeData out of the view
2. Feed and Story items are my task to refactor.
3. 