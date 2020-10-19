<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <!-- Replace with your content -->
      <pre>{{totalAverage.toFixed(1)}}</pre>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js"

export default {
  async asyncData({ store }) {
    let courses = []
    await db
      .collection("courses")
      .where("user", "==", store.state.modules.user.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          // if (doc.data().active) {
            let course = {
              ...doc.data(),
              id: doc.id,
            }
            courses.push(course)
          // }
        })
      })
    return { courses: courses }
  },

  computed: {
    totalAverage() {
      var gradedCourses = this.courses.filter((course) => {
        return course.weightedGrade !== undefined
      })

      return gradedCourses.reduce((a, b) => {
        return a + b.weightedGrade
      }, 0) / gradedCourses.length
    },
  },

  mounted() {},
  layout: "protected",
}
</script>
