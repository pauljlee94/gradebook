<template>
  <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <nuxt-link to="/">
          <h1 class="text-4xl font-extrabold text-blue-600">
            <i class="fas fa-book mr-3"></i>Gradebook
          </h1>
        </nuxt-link>
        <h2 class="mt-6 text-3xl leading-9 font-bold text-gray-900">Sign up for a free account</h2>
      </div>

      <div class="mt-8">
        <div class="mt-6">
          <form @submit.prevent="signUp" class="mb-4">
            <div>
              <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Name</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="name"
                  id="name"
                  type="text"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email address</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="email"
                  id="email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="password"
                  id="password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-6">
              <label for="verifyPassword" class="block text-sm font-medium leading-5 text-gray-700">Verify Password</label>
              <div class="mt-1 rounded-md shadow-sm">
                <input
                  v-model="verifyPassword"
                  id="verifyPassword"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div class="mt-10">
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >Sign up</button>
              </span>
              <p v-if="actions.form.error" class="mt-4 text-red-500 text-sm">{{actions.form.error}}</p>
            </div>
          </form>
          <nuxt-link to="/auth/login" class="text-blue-500">← Back to Login</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "~/plugins/firebase.js"
import { mapActions } from "vuex"

export default {
  data() {
    return {
      name: null,
      email: null,
      password: null,
      verifyPassword: null,
      actions: {
        form: {
          loading: false,
          success: false,
          error: false,
        },
      },
    }
  },
  methods: {
    ...mapActions("modules/user", ["signIn"]),

    signUp() {
      this.actions.form.loading = true

      if (this.password === this.verifyPassword) {
        auth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((firebaseUser) => {
            db.collection("users")
              .doc(firebaseUser.user.uid)
              .set({
                name: this.name,
                email: this.email,
              })
              .then(() => {
                this.signIn(firebaseUser.user)
              })
          })
          .then(() => {
            return this.$router.push("/dashboard")
            this.actions.form.loading = false
          })
          .catch((error) => {
            console.log(error)
            this.actions.form.error = error.message
            this.actions.form.loading = false
          })
      } else {
        this.actions.form.error = "The passwords don't match"
      }
    },
  },
  layout: "auth",
}
</script>