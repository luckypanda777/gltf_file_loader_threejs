import create from "zustand"
import produce from "immer"

const useStore = create((set) => ({
	dragInfo: {
		isDragging: false,
	},
	setDragInfo: (payload: any) => set(produce((state: any) => {
		state.dragInfo = payload
	})),

	wallIndex: 1,
	setWallIndex: (payload: any) => set(produce((state: any) => {
		state.wallIndex = payload
	}))
}))

export default useStore
