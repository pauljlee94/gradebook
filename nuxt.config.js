require("dotenv").config();

export default {
	mode: "spa",

	env: {
		firestore_apikey: process.env.firestore_apikey,
	},

	head: {
		title: process.env.npm_package_name || "",
		meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: process.env.npm_package_description || "" }],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		script: [{ src: "https://kit.fontawesome.com/b8708477a7.js" }],
	},

	css: [],

	plugins: ["~/plugins/firebase.js", "~plugins/v-calendar.js"],

	components: true,

	buildModules: ["@nuxtjs/tailwindcss"],

	modules: [],

	build: {},
};
