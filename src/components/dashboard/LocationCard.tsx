type LocationCardProps = {
	image: string;
};

function LocationCard(props: LocationCardProps) {
	return (
		<article className="flex-shrink-0 w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 p-2">
			<div className="relative">
				<img
					src={props.image}
					className="w-full h-[12rem] object-cover rounded-xl"
					alt={props.image}
				/>
			</div>

			<div className="bg-white px-2 py-3">
				<p className="text-gray-500 text-md">
					Where can I get the most unique cocktails
				</p>
			</div>
		</article>
	);
}

export default LocationCard;
