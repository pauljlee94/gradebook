<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <!-- Off-canvas menu for mobile -->
    <div v-if="mobileMenuOpen" class="md:hidden">
      <div class="fixed inset-0 flex z-40">
        <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
        -->
        <div @click="mobileMenuOpen = false" class="fixed inset-0">
          <div class="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
        <!--
      Off-canvas menu, show/hide based on off-canvas menu state.

      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
        -->
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div class="absolute top-0 right-0 -mr-14 p-1">
            <button @click="mobileMenuOpen = false" class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600" aria-label="Close sidebar">
              <i class="fas fa-times fa-lg text-gray-100"></i>
            </button>
          </div>
          <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div class="flex-shrink-0 flex items-center px-4">
              <h1 class="text-2xl font-medium text-white">
                <i class="fas fa-book mr-3"></i>Gradebook
              </h1>
            </div>
            <nav class="mt-5 px-2 space-y-1">
              <nuxt-link
                to="/dashboard"
                class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <i class="fas fa-home mr-3"></i>
                Dashboard
              </nuxt-link>

              <nuxt-link
                to="/courses"
                class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <i class="fas fa-book-open mr-3"></i>
                Courses
              </nuxt-link>
              <nuxt-link
                to="/teachers"
                class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <i class="fas fa-chalkboard-teacher mr-3"></i>
                Teachers
              </nuxt-link>
              <nuxt-link
                to="/calendar"
                class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                <i class="fas fa-calendar-alt mr-3"></i>
                Calendar
              </nuxt-link>
            </nav>
          </div>
          <div class="flex-shrink-0 flex bg-gray-700 p-4">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div class="ml-3">
                  <p class="text-base leading-6 font-medium text-white">Tom Cook</p>
                  <p class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">View profile</p>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="flex-shrink-0 w-14">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col h-0 flex-1 bg-gray-800">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div class="flex items-center flex-shrink-0 px-4">
              <h1 class="text-2xl font-medium text-white">
                <i class="fas fa-book mr-3"></i>Gradebook
              </h1>
            </div>
            <!-- REVIEW: Border here??? -->
            <nav class="mt-5 flex-1 px-2 bg-gray-800 space-y-1 border-t border-gray-700 pt-4">
              <nuxt-link
                to="/dashboard"
                :class="[$nuxt.$route.name.includes('dashboard') ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700', 'group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150']"
              >
                <i class="fas fa-home mr-3"></i>
                Dashboard
              </nuxt-link>

              <nuxt-link
                to="/courses"
                :class="[$nuxt.$route.name.includes('courses') ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700', 'group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150']"
              >
                <i class="fas fa-book-open mr-3"></i>
                Courses
              </nuxt-link>
              <nuxt-link
                to="/teachers"
                :class="[$nuxt.$route.name.includes('teachers') ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700', 'group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150']"
              >
                <i class="fas fa-chalkboard-teacher mr-3"></i>
                Teachers
              </nuxt-link>
              <nuxt-link
                to="/calendar"
                :class="[$nuxt.$route.name.includes('calendar') ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700', 'group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150']"
              >
                <i class="fas fa-calendar-alt mr-3"></i>
                Calendar
              </nuxt-link>
            </nav>
          </div>
          <div class="flex-shrink-0 flex bg-gray-700 p-4">
            <a href="#" class="flex-shrink-0 w-full group block">
              <div class="flex items-center">
                <div class="ml-3">
                  <p class="text-sm leading-5 font-medium text-white">{{user.name}}</p>
                  <button @click="logOut" class="text-sm text-red-500">Sign Out</button>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          @click="mobileMenuOpen = true"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
          aria-label="Open sidebar"
        >
          <i class="fas fa-bars fa-lg"></i>
        </button>
      </div>
      <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js"
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
        this.$router.push({ path: "/auth/login" })
      })
    },
  },

  middleware: ["authenticated"],
}
</script>