export default async function({ store, redirect }) {
	const user = typeof window.localStorage.user !== "undefined" && window.localStorage.user !== "undefined" ? JSON.parse(window.localStorage.user) : undefined;

	if (user) store.commit("modules/user/setUSER", user);
}
