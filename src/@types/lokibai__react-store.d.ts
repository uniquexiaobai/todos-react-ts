declare module '@lokibai/react-store' {
	export const Provider: FunctionComponent;
	export const createStore = (reducer, initialState): any => {};
	export const useSelector = (selector): any => {};
	export const useDispatch = (): any => {};
}
