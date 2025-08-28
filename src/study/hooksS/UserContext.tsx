import { createContext } from 'react';

// Define the type for our context data
interface UserType {
  name: string;
  age: number;
}

// Create and export the context with a default value
const UserContext = createContext<UserType>({
  name: '匿名用户',
  age: 0,
});

export default UserContext ;
