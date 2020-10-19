<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Courses</h1>
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click="addCourseModal = 'add'"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
        >
          <i class="fas fa-plus mr-2"></i>Add Course
        </button>
      </span>
    </div>
    <div class="mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="course in courses" :key="course.id" class="flex flex-col justify-between py-6 px-10 col-span-1 bg-white rounded-lg shadow">
          <!-- <nuxt-link :to="'/course/' + course.id"> -->
          <div class="flex justify-between">
            <div>
              <h2 class="text-xl font-bold text-gray-700">{{course.name}}</h2>
              <p v-if="course.teacher" class="text-gray-500 text-sm">{{course.teacher.name}}</p>
              <p v-if="course.teacher" class="text-gray-500 text-sm">{{course.teacher.email}}</p>
              <p v-if="course.teacher" class="text-gray-500 text-sm">{{course.teacher.phone}}</p>
            </div>
            <span
              @click="course.active =!course.active; activateCourse(course)"
              role="checkbox"
              tabindex="0"
              aria-checked="false"
              :class="{'bg-blue-600': course.active}"
              class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
            >
              <span aria-hidden="true" :class="{'translate-x-4': course.active}" class="inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"></span>
            </span>
          </div>

          <div class="flex justify-between items-end">
            <div>
              <span
                v-if="course.weightedGrade"
                :class="[course.weightedGrade <= 33 ? 'text-red-500' : course.weightedGrade >= 66 ? 'text-green-500' : 'text-orange-400' ,'text-3xl font-bold']"
              >{{course.weightedGrade.toFixed(1)}}%</span>
            </div>
            <div class="flex mt-6">
              <nuxt-link :to="`/courses/${course.id}`" class="flex justify-center items-center text-center inline-block border border-blue-600 rounded-full shadow h-10 w-10 text-blue-600">
                <i class="fas fa-stream"></i>
              </nuxt-link>
              <button @click="addGradeModal = !addGradeModal; gradeCourse = course" class="ml-2 border border-transparent bg-blue-600 rounded-full shadow h-10 w-10 text-white">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <!-- </nuxt-link> -->
        </li>
      </ul>
    </div>
    <!-- Modal -->
    <div v-if="!!addCourseModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!--
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0"
To: "opacity-100"
Leaving: "ease-in duration-200"
From: "opacity-100"
To: "opacity-0"
        -->
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <!--
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
From: "opacity-100 translate-y-0 sm:scale-100"
To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <!-- Form -->
          <div class="flex justify-between border-b items-center pb-3">
            <h2 v-if="addCourseModal === 'add'" id="modal-title" class="text-xl font-semibold text-gray-900">Add a course</h2>
            <h2 v-else id="modal-title" class="text-xl font-semibold text-gray-900">Edit course</h2>
          </div>
          <form class="mt-4" @submit.prevent>
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-6">
                <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Name</label>
                <input
                  v-model="newCourse.name"
                  id="name"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="CS 101"
                />
              </div>

              <div class="col-span-6">
                <div class="flex justify-between">
                  <label for="teacher" class="block text-sm font-medium leading-5 text-gray-700">Teacher</label>
                  <!-- <button v-if="newTeacher" @click="newTeacher = false" class="text-sm text-red-500">back</button> -->
                </div>
                <!-- <div v-if="!newTeacher">
          <select
            v-model="newCourse.teacher"
            id="teacher"
            class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>

          <span class="mt-2 col-span-6 flex w-full rounded-md shadow-sm">
            <button
              @click="newTeacher = true"
              type="button"
              class="w-full rounded-md border border-blue-600 px-4 py-2 bg-white text-base leading-6 font-medium text-blue-600 shadow-sm hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <i class="fas fa-plus mr-2"></i>Add Teacher
            </button>
          </span>
                </div>-->
                <div>
                  <input
                    v-model="newCourse.teacher.name"
                    id="teacher"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="John Doe"
                  />
                  <input
                    v-model="newCourse.teacher.email"
                    id="teacher"
                    class="mt-2 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="john@gradebook.com"
                  />
                  <input
                    v-model="newCourse.teacher.phone"
                    id="teacher"
                    class="mt-2 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="5555555555"
                  />
                </div>
              </div>

              <div class="col-span-6">
                <h3 class="col-span-6 block text-sm font-medium leading-5 text-gray-700">Grade Breakdown</h3>
                <div v-for="(breakdown, index) in newCourse.weightBreakdown" :key="index" class="grid grid-cols-6 gap-x-4">
                  <div :class="[index > 0 ? 'mt-3' : 'mt-1', 'col-span-4']">
                    <input
                      id="name"
                      class="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="Exams"
                      aria-label="breakdown name"
                      v-model="breakdown.name"
                    />
                  </div>
                  <div :class="[index > 0 ? 'mt-3' : 'mt-1', 'col-span-2 relative']">
                    <input
                      id="breakdown"
                      class="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      placeholder="25"
                      aria-label="percentage"
                      v-model.number="breakdown.weight"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <i class="fas fa-percent text-gray-500"></i>
                    </div>
                  </div>
                </div>

                <span class="mt-4 col-span-6 flex w-full rounded-md shadow-sm">
                  <button
                    @click="newCourse.weightBreakdown.push({name: null, weight: null})"
                    type="button"
                    class="w-full rounded-md border border-blue-600 px-4 py-2 bg-white text-base leading-6 font-medium text-blue-600 shadow-sm hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    <i class="fas fa-plus mr-2"></i>Add Breakdown
                  </button>
                </span>
              </div>
            </div>
            <!-- Buttons -->
            <div class="flex mt-5 sm:mt-6 space-x-4 border-t pt-4">
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  @click="addCourseModal = false; newCourse =  {name: null,teacher: {name: null,email: null,phone: null}, weightBreakdown: [{name: null,weight: null,}]}"
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-red-500 px-4 py-2 bg-white text-base leading-6 font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >Cancel</button>
              </span>
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  @click="saveCourse"
                  v-if="addCourseModal === 'add'"
                  type="submit"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >Add Course</button>
              </span>
            </div>
            <p v-if="actions.form.error" class="mt-2 text-red-500 text-xs">The weight doesn't add up to 100%</p>
          </form>
        </div>
      </div>
    </div>
    <div v-if="addGradeModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!--
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0"
To: "opacity-100"
Leaving: "ease-in duration-200"
From: "opacity-100"
To: "opacity-0"
        -->
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <!--
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
From: "opacity-100 translate-y-0 sm:scale-100"
To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        -->
        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <!-- Form -->
          <div class="flex justify-between border-b items-center pb-3">
            <h2 id="modal-title" class="text-xl font-semibold text-gray-900">Add Grade</h2>
          </div>
          <form class="mt-4" @submit.prevent>
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-6">
                <label for="assignment" class="block text-sm font-medium leading-5 text-gray-700">Assignment</label>
                <input
                  v-model="newGrade.name"
                  id="assignment"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Exam 1"
                />
              </div>
              <div class="col-span-6">
                <label for="name" class="block text-sm font-medium leading-5 text-gray-700">Type</label>
                <div>
                  <select
                    v-model="newGrade.type"
                    id="type"
                    class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option v-for="breakdown in gradeCourse.weightBreakdown" :key="breakdown.name">{{breakdown.name}}</option>
                  </select>
                </div>
              </div>
              <div class="col-span-6">
                <label for="grade" class="block text-sm font-medium leading-5 text-gray-700">Grade</label>
                <input
                  v-model="newGrade.grade"
                  id="grade"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="100"
                />
              </div>
            </div>
            <!-- Buttons -->
            <div class="flex mt-5 sm:mt-6 space-x-4 border-t pt-4">
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  @click="addGradeModal = false; newGrade =  {name: null,type: null,grade: null}"
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-red-500 px-4 py-2 bg-white text-base leading-6 font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >Cancel</button>
              </span>
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  @click="addGrade"
                  type="submit"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >Add Grade</button>
              </span>
            </div>
            <p v-if="actions.form.error" class="mt-2 text-red-500 text-xs">The weight doesn't add up to 100%</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js"
import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      addCourseModal: false,
      addGradeModal: false,
      gradeCourse: null,
      newGrade: {
        name: null,
        type: null,
        grade: null,
      },
      // newTeacher: false,
      newCourse: {
        name: null,
        teacher: {
          name: null,
          email: null,
          phone: null,
        },
        weightBreakdown: [
          {
            name: null,
            weight: null,
          },
        ],
      },
      actions: {
        form: {
          loading: false,
          error: false,
          success: false,
        },
      },
    }
  },

  computed: {
    ...mapGetters("modules/user", ["user"]),
  },

  async asyncData({ store }) {
    let courses = []
    await db
      .collection("courses")
      .where("user", "==", store.state.modules.user.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let course = {
            ...doc.data(),
            id: doc.id,
          }
          courses.push(course)
        })
      })

    for (const course of courses) {
      let grades = []
      await db
        .collection("courses")
        .doc(course.id)
        .collection("grades")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            let grade = {
              ...doc.data(),
            }
            grades.push(grade)
          })
        })
      course.grades = grades
    }

    return { courses: courses }
  },

  methods: {
    activateCourse(course) {
      db.collection("courses").doc(course.id).update({
        active: course.active,
      })
    },

    saveCourse() {
      var totalWeight = this.newCourse.weightBreakdown
        .map((breakdown) => {
          return breakdown.weight
        }, 0)
        .reduce((a, b) => a + b, 0)

      var courseData = {
        ...this.newCourse,
        active: false,
        user: this.user.uid,
      }

      if (totalWeight === 100) {
        db.collection("courses")
          .add(courseData)
          .then((course) => {
            // Frontend
            this.courses.push({
              ...courseData,
              id: course.id,
              grades: [],
            })

            this.addCourseModal = false
            this.actions.form.error = false
          })
          .catch((error) => {
            this.actions.form.error = error
          })
      } else {
        this.actions.form.error = "The weight doesn't add up to 100%"
      }
    },

    addGrade() {
      var newGrade = {
        ...this.newGrade,
        timestamp: new Date()
        // course: this.gradeCourse.id,
      }

      db.collection("courses")
        .doc(this.gradeCourse.id)
        .collection("grades")
        .add(newGrade)
        .then(() => {
          this.gradeCourse.grades.push(newGrade)

          // TODO: Calculate weighted grade here
          let points = []
          let weights = []
          let totalWeight = 0

          this.gradeCourse.weightBreakdown.forEach((breakdown) => {
            let typedGrade = this.gradeCourse.grades.filter((grade) => {
              return grade.type == breakdown.name
            })

            typedGrade.length !== 0 ? (totalWeight += breakdown.weight) : null
          })

          this.gradeCourse.weightBreakdown.forEach((breakdown) => {
            let typedGrade = this.gradeCourse.grades.filter((grade) => {
              return grade.type == breakdown.name
            })

            let average = typedGrade.reduce((a, b) => {
              return a + parseFloat(b.grade)
            }, 0)

            let weightedPoints =
              typedGrade.length > 0
                ? (average / typedGrade.length) *
                  (breakdown.weight / totalWeight)
                : 0

            weights.push(weightedPoints)
          })

          // SAVE THIS
          let weightedGrade = weights.reduce((a, b) => a + b, 0)

          this.gradeCourse.weightedGrade = weightedGrade

          db.collection("courses")
            .doc(this.gradeCourse.id)
            .update({ weightedGrade: weightedGrade })

          this.addGradeModal = false
          this.actions.form.error = false
        })
        .catch((error) => {
          console.log(error)
          this.actions.form.error = error
        })
    },
  },
  layout: "protected",
}
</script>

<style>
</style>

