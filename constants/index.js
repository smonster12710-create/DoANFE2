const navLinks = [
	{ id: "constellations", title: "Các Vì Sao" },
	{ id: "about", title: "Chuyện Xưa" },
	{ id: "art", title: "Góc Viễn Vọng" },
	{ id: "contact", title: "Liên Lạc" },
];

const constellationLists = [
	{
		name: "Cày Tinh Tú",
		country: "Dân Gian",
		detail: "Báo Hiệu Mùa Vụ",
		visibility: "Dễ Dàng",
	},
	{
		name: "Chòm Đại Hùng",
		country: "Cổ Đại",
		detail: "Gấu Lớn",
		visibility: "Dễ Dàng",
	},
	{
		name: "Chòm Thợ Săn",
		country: "Thần Thoại",
		detail: "Thợ Săn",
		visibility: "Rõ Ràng",
	},
	{
		name: "Sao Tua Rua",
		country: "Dân Gian",
		detail: "Thất Nữ",
		visibility: "Trung Bình",
	},
];

const nebulaLists = [
	{
		name: "Thiên Hà Tiên Nữ",
		country: "Vũ Trụ Sâu",
		detail: "Dải xoắn ốc gần ta nhất",
		visibility: "Đêm Thẳm",
	},
	{
		name: "Tinh Vân Orion",
		country: "Tinh Tú",
		detail: "Nôi sinh trưởng của các vì sao",
		visibility: "Ống Kính",
	},
	{
		name: "Dải Ngân Hà",
		country: "Thiên Hà",
		detail: "Dòng sông ánh sáng của chúng ta",
		visibility: "Ngoại Ô",
	},
	{
		name: "Cực Quang Phương Bắc",
		country: "Khí Quyển",
		detail: "Vũ điệu ánh sáng đêm đêm",
		visibility: "Vùng Cực",
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
	"Vùng trời không ô nhiễm",
	"Màn đêm trong vắt",
	"Kính quang học cao cấp",
	"Hành trình cùng chuyên gia",
];

const goodLists = [
	"Hiên gỗ lộ thiên",
	"Núi thẳm lặng tờ",
	"Thuật họa bản đồ sao",
	"Kỳ quan theo mùa",
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
	{ day: "Thứ 2 – Thứ 5", time: "18:00 – 00:00" },
	{ day: "Thứ 6", time: "18:00 – 02:00" },
	{ day: "Thứ 7", time: "17:00 – 02:00" },
	{ day: "Chủ Nhật", time: "17:00 – 01:00" },
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

const allGalaxy = [
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
	allGalaxy,
};