declare module '@lokibai/react-store' {
	export const Provider: FunctionComponent;
	export const createStore = (reducer, initialState) => {};
	export const useSelector = (selector): any => {};
	export const useDispatch = (): any => {};
}
