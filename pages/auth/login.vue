<template>
  <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <nuxt-link to="/">
          <h1 class="text-4xl font-extrabold text-blue-600">
            <i class="fas fa-book mr-3"></i>Gradebook
          </h1>
        </nuxt-link>
        <h2 class="mt-6 text-3xl leading-9 font-bold text-gray-900">Sign in to your account</h2>
        <p class="mt-2 text-sm leading-5 text-gray-600 max-w">
          Or
          <nuxt-link
            to="/auth/signup"
            href="#"
            class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >sign up for a free account</nuxt-link>
        </p>
      </div>

      <div class="mt-8">
        <div class="mt-6">
          <form @submit.prevent="logIn" class="space-y-6">
            <div>
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

            <div>
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

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input v-model="rememberMe" id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
                <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
              </div>

              <div class="text-sm leading-5">
                <nuxt-link to="/auth/forgot-password" class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">Forgot your password?</nuxt-link>
              </div>
            </div>

            <div>
              <span class="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                >Sign in</button>
              </span>
              <p v-if="actions.form.error" class="mt-4 text-red-500 text-sm">{{actions.form.error}}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js"
import { mapActions } from "vuex"

export default {
  data() {
    return {
      email: null,
      password: null,
      rememberMe: false,
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

    logIn() {
      this.actions.form.loading = true

      auth
        .signInWithEmailAndPassword(this.email.toLowerCase(), this.password)
        .then((firebaseUser) => {
          return this.signIn(firebaseUser.user)
        })
        .then(() => {
          return this.$router.push("/dashboard")
          this.actions.form.loading = false
        })
        .catch((error) => {
          this.actions.form.error = error.message
          this.actions.form.loading = false
        })
    },
  },
  layout: "auth",
}
</script>