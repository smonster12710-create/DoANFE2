const navLinks = [
	{ id: "cocktails", title: "Constellations" },
	{ id: "about", title: "The Lore" },
	{ id: "art", title: "Stellar Sight" },
	{ id: "contact", title: "Basecamp" },
];

const constellationLists = [
	{
		name: "The Starry Plow",
		country: "Folklore",
		detail: "Harvest Sign",
		visibility: "Easy",
	},
	{
		name: "Ursa Major",
		country: "Ancient",
		detail: "The Great Bear",
		visibility: "Easy",
	},
	{
		name: "Orion",
		country: "Mythology",
		detail: "The Hunter",
		visibility: "Clear",
	},
	{
		name: "The Pleiades",
		country: "Folklore",
		detail: "Seven Sisters",
		visibility: "Medium",
	},
];

const nebulaLists = [
	{
		name: "Andromeda Galaxy",
		country: "Deep Sky",
		detail: "Our nearest spiral neighbor",
		visibility: "Dark Sky",
	},
	{
		name: "Orion Nebula",
		country: "Stellar",
		detail: "A cosmic nursery of stars",
		visibility: "Telescope",
	},
	{
		name: "The Milky Way",
		country: "Galaxy",
		detail: "Our home celestial river",
		visibility: "Dark Sky",
	},
	{
		name: "Aurora Borealis",
		country: "Atmosphere",
		detail: "The dancing northern lights",
		visibility: "Seasonal",
	},
];

const profileLists = [
	{
		imgPath: "/images/profile1.png",
	},
	{
		imgPath: "/images/profile2.png",
	},
	{
		imgPath: "/images/profile3.png",
	},
	{
		imgPath: "/images/profile4.png",
	},
];

const featureLists = [
	"Zero light pollution zones",
	"Crystal clear night skies",
	"High-end optical telescopes",
	"Expertly guided cosmic tours",
];

const goodLists = [
	"Open-air wooden terraces",
	"Deep mountain silence",
	"Ancient star-mapping methods",
	"Seasonal celestial events",
];

const storeInfo = {
	heading: "Reach the Stars",
	address: "Mountain Peak Road, Sapa, Vietnam",
	contact: {
		phone: "(+84) 987-STAR-GAZE",
		email: "hello@stellalounge.com",
	},
};

const openingHours = [
	{ day: "Mon–Thu", time: "6:00pm – 12am" },
	{ day: "Fri", time: "6:00pm – 2am" },
	{ day: "Sat", time: "5:00pm – 2am" },
	{ day: "Sun", time: "5:00pm – 1am" },
];

const socials = [
	{
		name: "Instagram",
		icon: "/images/insta.png",
		url: "#",
	},
	{
		name: "X (Twitter)",
		icon: "/images/x.png",
		url: "#",
	},
	{
		name: "Facebook",
		icon: "/images/fb.png",
		url: "#",
	},
];

const allCocktails = [
	{
		id: 1,
		name: "The Cosmic Horizon",
		image: "/images/horizon.png",
		title: "Endless Void, Timeless Tales",
		description:
			"Observe the vast dome of the night sky where modern astronomy meets ancient starlight storytelling. A serene space designed to connect your soul with the infinite universe.",
	},
	{
		id: 2,
		name: "Nebula Dreams",
		image: "/images/horizon2.png",
		title: "Where Stars Are Born",
		description:
			"Witness the colorful clouds of interstellar dust through deep-space tracking. A breathtaking view that reminds us of our own cosmic origins beneath the dark sky.",
	},
	{
		id: 3,
		name: "Lunar Serenade",
		image: "/images/horizon3.png",
		title: "Chasing the Ancient Moonlight",
		description:
			"Track the silver phases of the moon as it rises above the misty mountain peaks. Perfect for quiet contemplation and capturing the beauty of the celestial dance.",
	},
	{
		id: 4,
		name: "Stellar Journey",
		image: "/images/horizon4.png",
		title: "Guided by Eternal Starlight",
		description:
			"Every constellation holds a legend from ancient civilizations. Explore the mapping of the night sky with precision equipment and passionate astronomers.",
	},
];

export {
	navLinks,
	constellationLists,
	nebulaLists,
	profileLists,
	featureLists,
	goodLists,
	openingHours,
	storeInfo,
	socials,
	allCocktails,
};