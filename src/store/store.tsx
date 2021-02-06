import { RentalOption } from "../models/RentalOption";

const store = {
	getRentalOptions: (): Array<RentalOption> => (
		new Array(10).fill(null).map((_, i) => ({
			id: i.toString(),
			title: "Modern apartment in city center",
			city: "London",
			category: "Apartment",
			imageSrc: "http://via.placeholder.com/300x200",
			numRooms: 1,
			shared: false,
			description: "Stylish third floor apartment in the heart of London",
			dailyPrice: 100
		}))
	)
};

export default store;