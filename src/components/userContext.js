import {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from "react";

const UserContext = createContext({
  userDisplay: "",
  setUserDisplay: () => {},
});

export default UserContext;

// export default function useForceUpdate(): () => void {
//   const [ , dispatch ] = useState<{}>(Object.create(null));

//   // Turn dispatch(required_parameter) into dispatch().
//   const memoizedDispatch = useCallback(
//     (): void => {
//       dispatch(Object.create(null));
//     },
//     [ dispatch ],
//   );
//   return memoizedDispatch;
// }

// const UserContext = () => {
//   const useForceUpdate = () => {
//     const [ , dispatch] = useState(Object.create(null));

//     const memoizedDispatch = useCallback(
//       dispatch(Object.create(null)), [dispatch]
//     );

//     return memoizedDispatch;
//   };
// };

// export default UserContext;
