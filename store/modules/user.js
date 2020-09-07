import { db,auth } from "@/plugins/firebase";

export const state = () => ({
	user: null,
	roles: null,
	status: null,
	idToken: null,
	client: null,
});

export const getters = {
	user(state) {
		return state.user;
	},
	isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  },
};

export const actions = {
	async signIn({ dispatch }, user) {
		const userInfo = {
			name: null,
			email: user.email,
			uid: user.uid,
			// emailVerified: user.emailVerified,
		};

		// Set Last signin time
		await db.collection("users").doc(user.uid).set({
			lastSignIn: auth.currentUser.metadata.lastSignInTime,
		},{ merge: true});


		await db.collection("users").doc(user.uid).get().then(async (snapshot) => {
			let userData = snapshot.data();
			userInfo.name = userData.name;
		});

		// setup user to the localStorage
		window.localStorage.setItem("user", JSON.stringify(userInfo));

		// Set the user in the store
		dispatch("setUSER", userInfo);
	},

	async signout({ commit, dispatch, state }) {
		if (state.user)
			await db.collection("users").onSnapshot(
				() => {},
				(error) => {
					console.warn(error)
				}
			);

		await auth
			.signOut()
			.then(() => {
				dispatch("setUSER", null);
				window.localStorage.removeItem("user");
			});
	},

	setUSER({commit}, user) {
    commit('setUSER', user)
  },
};

export const mutations = {
  setUSER (state, user) {
    state.user = user
  },
}