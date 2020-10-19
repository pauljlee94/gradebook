<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Teachers</h1>
      <!-- <span class="inline-flex rounded-md shadow-sm">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
        >
          <i class="fas fa-plus mr-2"></i>Add Teacher
        </button>
      </span>-->
    </div>
    <div class="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="teacher in teachers" :key="teacher.id" class="col-span-1 bg-white rounded-lg shadow">
          <div class="w-full flex items-center justify-between p-6 space-x-6">
            <div class="flex-1 truncate">
              <div class="flex items-center space-x-3">
                <h3 class="text-gray-900 text-sm leading-5 font-medium truncate">{{teacher.name}}</h3>
                <span class="flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full">{{teacher.course}}</span>
              </div>
              <p class="mt-1 text-gray-500 text-sm leading-5 truncate">{{teacher.email}}</p>
              <p class="mt-1 text-gray-500 text-sm leading-5 truncate">{{teacher.phone}}</p>
            </div>
          </div>
          <div class="border-t border-gray-200">
            <div class="-mt-px flex">
              <div class="w-0 flex-1 flex border-r border-gray-200">
                <a
                  :href="'mailto:' + teacher.email"
                  class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                >
                  <i class="fas fa-envelope"></i>
                  <span class="ml-3">Email</span>
                </a>
              </div>
              <div class="-ml-px w-0 flex-1 flex">
                <a
                  :href="'tel:' + teacher.phone"
                  class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                >
                  <i class="fas fa-phone"></i>
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
  async asyncData({ store }) {
    let teachers = []
    await db
      .collection("courses")
      .where("user", "==", store.state.modules.user.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let teacher = {
            ...doc.data().teacher,
            course: doc.data().name,
          }
          if (!!teacher.name || !!teacher.email || !!teacher.phone)
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