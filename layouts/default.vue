<template>
  <div class="bg-gray-50">
    <header class="relative bg-white px-4">
      <div class="flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10">
        <div class="lg:w-0 lg:flex-1">
          <nuxt-link to="/" class="flex">
            <h1 class="text-4xl font-bold text-blue-600">
              <i class="fas fa-book mr-3"></i>Gradebook
            </h1>
          </nuxt-link>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <button
            @click="mobileMenuOpen = true"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
          >
            <i class="fas fa-bars fa-lg"></i>
          </button>
        </div>
        <!-- <nav class="hidden md:flex space-x-10">
          <a href="#" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Pricing</a>
          <a href="#" class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">Docs</a>
        </nav>-->
        <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
          <nuxt-link v-if="!user" to="/auth/login" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">Sign in</nuxt-link>
          <span v-if="!user" class="inline-flex rounded-md shadow-sm">
            <a
              href="#"
              class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
            >Sign up</a>
          </span>
          <span v-if="user" class="inline-flex rounded-md shadow-sm">
            <button
              @click="logOut"
              class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-500 hover:bg-red-400 transition ease-in-out duration-150"
            >Sign Out</button>
          </span>
          <span v-if="user" class="inline-flex rounded-md shadow-sm">
            <nuxt-link
              to="/dashboard"
              class="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none active:bg-blue-700 transition ease-in-out duration-150"
            >Dashboard</nuxt-link>
          </span>
        </div>
      </div>

      <!-- Mobile -->
      <div v-if="mobileMenuOpen" class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div class="rounded-lg shadow-lg">
          <div class="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5 space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <nuxt-link to="/" class="flex">
                    <h1 class="text-4xl font-bold text-blue-600">
                      <i class="fas fa-book mr-3"></i>Gradebook
                    </h1>
                  </nuxt-link>
                </div>
                <div class="-mr-2">
                  <button
                    @click="mobileMenuOpen = false"
                    type="button"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  >
                    <i class="fas fa-times fa-lg"></i>
                  </button>
                </div>
              </div>
              <div>
                <nav class="grid grid-cols-1 gap-7">
                  <a href="#" class="-m-3 p-3 flex items-center space-x-4 rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <div class="text-base leading-6 font-medium text-gray-900">Analytics</div>
                  </a>
                </nav>
              </div>
            </div>
            <div class="py-6 px-5 space-y-6">
              <div class="space-y-6">
                <span v-if="user" class="w-full flex rounded-md shadow-sm">
                  <button
                    @click="logOut"
                    class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-500 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >Sign Out</button>
                </span>
                <span v-if="user" class="w-full flex rounded-md shadow-sm">
                  <nuxt-link
                    to="/dashboard"
                    class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >Dashboard</nuxt-link>
                </span>
                <span v-if="!user" class="w-full flex rounded-md shadow-sm">
                  <a
                    href="#"
                    class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >Sign up</a>
                </span>
                <p v-if="!user" class="text-center text-base leading-6 font-medium text-gray-500">
                  Existing customer?
                  <nuxt-link to="/auth/login" href="#" class="text-blue-600 hover:text-blue-500 transition ease-in-out duration-150">Sign in</nuxt-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <nuxt />

    <!-- footer -->
    <footer class="bg-white">
      <div class="max-w-screen-xl mx-auto pt-10 border-t py-20 mt-20">
        <div class="flex flex-col items-center mt-8 md:mt-0 md:order-1">
          <nuxt-link to="/" class="flex">
            <h1 class="text-3xl font-bold text-blue-600">
              <i class="fas fa-book mr-3"></i>Gradebook
            </h1>
          </nuxt-link>
          <p class="text-center text-base leading-6 text-gray-400">&copy; 2020 Workflow, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
  computed: {
    ...mapGetters("modules/user", ["user"]),
  },
  methods: {
    ...mapActions("modules/user", ["signout"]),

    logOut() {
      this.signout().then(() => {
        this.$router.push({ path: "/" })
      })
    },
  },
  middleware: ["checkUser"],
}
</script>


<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
