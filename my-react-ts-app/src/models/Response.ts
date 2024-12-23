interface Response<T> {
  data: T;
  message: string;
  error: string | null;
}

// Example usage with a User type
// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// Example response object
// const exampleResponse: Response<User> = {
//   data: {
//     id: 1,
//     name: "Jon Snow",
//     email: "jon@email.com",
//   },
//   message: "User fetched successfully",
//   error: null,
// };
