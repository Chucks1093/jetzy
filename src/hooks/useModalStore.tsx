import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define modal types
export type ModalType =
	| 'placeDetails'
	| 'restaurantDetails'
	| 'confirmation'
	| 'imageGallery'
	| 'booking'
	| 'filter'
	| 'userProfile'
	| 'settings'
	| 'search';

// Modal store interface - only boolean states
interface ModalStore {
	// State - each modal type has a boolean
	placeDetails: boolean;
	restaurantDetails: boolean;
	confirmation: boolean;
	imageGallery: boolean;
	booking: boolean;
	filter: boolean;
	userProfile: boolean;
	settings: boolean;
	search: boolean;

	// Actions
	openModal: (type: ModalType) => void;
	closeModal: (type: ModalType) => void;
	closeAllModals: () => void;
	toggleModal: (type: ModalType) => void;
	isModalOpen: (type: ModalType) => boolean;
}

// Create the modal store
export const useModalStore = create<ModalStore>()(
	devtools(
		(set, get) => ({
			// Initial state - all modals closed
			placeDetails: false,
			restaurantDetails: false,
			confirmation: false,
			imageGallery: false,
			booking: false,
			filter: false,
			userProfile: false,
			settings: false,
			search: false,

			// Open a specific modal
			openModal: (type: ModalType) => {
				set({ [type]: true }, false, `openModal-${type}`);
			},

			// Close a specific modal
			closeModal: (type: ModalType) => {
				set({ [type]: false }, false, `closeModal-${type}`);
			},

			// Close all modals
			closeAllModals: () => {
				set(
					{
						placeDetails: false,
						restaurantDetails: false,
						confirmation: false,
						imageGallery: false,
						booking: false,
						filter: false,
						userProfile: false,
						settings: false,
						search: false,
					},
					false,
					'closeAllModals'
				);
			},

			// Toggle a modal open/closed
			toggleModal: (type: ModalType) => {
				const currentState = get()[type];
				set({ [type]: !currentState }, false, `toggleModal-${type}`);
			},

			// Check if a specific modal is open
			isModalOpen: (type: ModalType) => {
				return get()[type];
			},
		}),
		{
			name: 'modal-store',
		}
	)
);

export const usePlaceDetailsModal = () => {
	const { placeDetails, openModal, closeModal, toggleModal } = useModalStore();

	return {
		isOpen: placeDetails,
		open: () => openModal('placeDetails'),
		close: () => closeModal('placeDetails'),
		toggle: () => toggleModal('placeDetails'),
	};
};
