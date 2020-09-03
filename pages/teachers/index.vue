<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Teachers</h1>
      <!-- <span class="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          <i class="fas fa-plus mr-2"></i>Add Teacher
        </button>
      </span> -->
    </div>
    <div class="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="teacher in teachers" :key="teacher.id" class="col-span-1 bg-white rounded-lg shadow">
          <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="text-gray-900 text-sm leading-5 font-medium truncate">{{teacher.name}}</h3>
                <span class="flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">Admin</span>
              </div>
              <p class="mt-1 text-gray-500 text-sm leading-5 truncate">{{teacher.email}}</p>
              <p class="mt-1 text-gray-500 text-sm leading-5 truncate">{{teacher.phone}}</p>
            </div>
            <img
              class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
              alt
            />
          </div>
          <div class="border-t border-gray-200">
            <div class="-mt-px flex">
              <div class="w-0 flex-1 flex border-r border-gray-200">
                <a
                  :href="'mailto:' + teacher.email"
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                >
                  <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span class="ml-3">Email</span>
                </a>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <a
                  :href="'tel:' + teacher.phone"
                  class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                >
                  <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                  <span class="ml-3">Call</span>
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js"

export default {
  async asyncData() {
    let teachers = []
    await db
      .collection("teachers")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let teacher = {
            ...doc.data(),
            id: doc.id,
          }
          teachers.push(teacher)
        })
      })

    return { teachers: teachers }
  },
  layout: "protected",
}
</script>

<style lang="scss" scoped>
</style>