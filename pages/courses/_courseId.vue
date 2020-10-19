<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">{{ course.name }}</h1>
      <!-- <span
        :class="[course.weightedGrade <= 33 ? 'text-red-500' : course.weightedGrade >= 66 ? 'text-green-500' : 'text-orange-400']"
        class="text-2xl font-semibold text-gray-900"
      >{{course.weightedGrade}}%</span>-->
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click="deleteConfirmation = true"
          type="button"
          class="inline-flex items-center px-4 py-1 border border-red-500 text-sm leading-6 rounded-md text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
        >
          <i class="fas fa-trash-alt mr-2"></i>Delete Course
        </button>
      </span>
    </div>
    <div class="flex mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-x-6">
      <div class="flex flex-col space-y-6">
        <div class="bg-white rounded-lg shadow py-6 px-10">
          <span
            :class="[
              course.weightedGrade <= 33
                ? 'text-red-500'
                : course.weightedGrade >= 66
                ? 'text-green-500'
                : 'text-orange-400',
            ]"
            class="text-2xl font-semibold text-gray-900"
            >{{ course.weightedGrade }}%</span
          >
          <h3 class="text-sm font-medium leading-5 text-gray-700">
            In order to get a
            <input
              type="number"
              class="form-input w-16 py-2 px-2 mx-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="90"
            />
            you need:
          </h3>
          <div
            v-for="breakdown in course.weightBreakdown"
            :key="breakdown.name"
          >
            {{ breakdown.name }} {{breakdown.weight}}
          </div>
        </div>
        <div class="bg-white rounded-lg shadow py-6 px-10">
          <div class="flex justify-between max-w-7xl mx-auto<div">
            <h2 class="text-2xl font-semibold text-gray-900">Details</h2>
          </div>
          <form @submit.prevent>
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 mt-4">
                <label
                  for="name"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Course Name</label
                >
                <input
                  v-model="course.name"
                  id="name"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="CS 101"
                />
              </div>

              <div class="col-span-6">
                <div class="flex justify-between">
                  <label
                    for="teacherName"
                    class="block text-sm font-medium leading-5 text-gray-700"
                    >Teacher</label
                  >
                </div>
                <div>
                  <input
                    v-model="course.teacher.name"
                    class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="John Doe"
                    aria-label="teacher name"
                  />
                  <input
                    v-model="course.teacher.email"
                    class="mt-3 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="john@gradebook.com"
                    aria-label="teacher email"
                  />
                  <input
                    v-model="course.teacher.phone"
                    class="mt-3 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="5555555555"
                    aria-label="teacher phone"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3
                class="mt-6 text-2xl font-semibold text-gray-900 col-span-6 mb-4"
              >
                Grade Breakdown
              </h3>
              <div
                v-for="(breakdown, index) in course.weightBreakdown"
                :key="index"
                class="grid grid-cols-6 gap-x-4"
              >
                <div :class="[index > 0 ? 'mt-3' : 'mt-1', 'col-span-4']">
                  <input
                    class="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="Exams"
                    aria-label="breakdown name"
                    v-model="breakdown.name"
                  />
                </div>
                <div
                  :class="[index > 0 ? 'mt-3' : 'mt-1', 'col-span-2 relative']"
                >
                  <input
                    @input="actions.editCourse.error = false"
                    class="form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    placeholder="25"
                    aria-label="percentage"
                    v-model.number="breakdown.weight"
                  />
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
                  >
                    <i class="fas fa-percent text-gray-500"></i>
                  </div>
                </div>
              </div>
            </div>

            <span class="mt-4 col-span-6 flex w-full rounded-md shadow-sm">
              <button
                @click="
                  course.weightBreakdown.push({ name: null, weight: null })
                "
                type="button"
                class="w-full rounded-md border border-blue-600 px-4 py-2 bg-white text-base leading-6 font-medium text-blue-600 shadow-sm hover:bg-blue-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                <i class="fas fa-plus mr-2"></i>Add Breakdown
              </button>
            </span>
            <div
              class="flex mt-5 sm:mt-6 space-x-4 border-t pt-4 justify-between items-center"
            >
              <p class="text-red-500 text-sm">
                <span v-if="actions.editCourse.error">{{
                  actions.editCourse.error
                }}</span>
              </p>
              <div class="flex space-x-2">
                <span class="flex rounded-md shadow-sm">
                  <button
                    @click="editCourse"
                    type="submit"
                    class="inline-flex justify-center items-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    :class="{
                      success: actions.editCourse.success,
                      danger: actions.editCourse.error,
                    }"
                  >
                    <i
                      :class="[
                        actions.editCourse.loading
                          ? 'fa-circle-notch fa-spin'
                          : 'fa-save',
                        'fas mr-2',
                      ]"
                    ></i
                    >Save
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="flex-1 flex flex-col bg-white rounded-lg shadow py-6 px-10">
        <div class="flex justify-between max-w-7xl mx-auto<div">
          <h2 class="text-2xl font-semibold text-gray-900">Assignments</h2>
          <span class="inline-flex rounded-md shadow-sm">
            <button
              @click="gradeModal = 'add'"
              type="button"
              class="inline-flex items-center px-4 py-1 border border-transparent text-sm leading-6 rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
            >
              <i class="fas fa-plus mr-2"></i>Add Assignment
            </button>
          </span>
        </div>
        <div class="mt-6 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div class="overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Added
                    </th>
                    <th
                      class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Grade
                    </th>
                    <th class="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(grade, index) in grades"
                    :key="grade.name"
                    :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
                  >
                    <td
                      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                    >
                      {{ grade.name }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                    >
                      {{ grade.type }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                    >
                      some date
                    </td>
                    <td
                      class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                    >
                      {{ grade.grade }}
                    </td>
                    <td
                      class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                    >
                      <button
                        @click="
                          gradeModal = 'edit'
                          addEditGrade = grade
                        "
                        class="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div v-if="deleteConfirmation" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
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
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
        >&#8203;
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
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Delete Course
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  Are you sure you want to delete this course? All of your data
                  will be permanently removed from our servers forever. This
                  action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button
                @click="deleteCourse"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Delete
              </button>
            </span>
            <span
              class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto"
            >
              <button
                @click="deleteConfirmation = false"
                type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="gradeModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
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
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
        >&#8203;
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
            <h2 id="modal-title" class="text-xl font-semibold text-gray-900">
              {{ gradeModal === "add" ? "Add" : "Edit" }} Grade
            </h2>
            <span
              v-if="gradeModal === 'edit'"
              class="inline-flex rounded-md shadow-sm"
            >
              <button
                @click="deleteGrade"
                type="button"
                class="inline-flex items-center px-4 py-1 border border-red-500 text-sm leading-6 rounded-md text-red-500 bg-white hover:bg-red-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
              >
                <i class="fas fa-trash-alt mr-2"></i>Delete Grade
              </button>
            </span>
          </div>
          <form class="mt-4" @submit.prevent>
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-6">
                <label
                  for="assignment"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Assignment</label
                >
                <input
                  v-model="addEditGrade.name"
                  id="assignment"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Exam 1"
                />
              </div>
              <div class="col-span-6">
                <label
                  for="name"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Type</label
                >
                <div>
                  <select
                    v-model="addEditGrade.type"
                    id="type"
                    class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option
                      v-for="breakdown in course.weightBreakdown"
                      :key="breakdown.name"
                    >
                      {{ breakdown.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-span-6">
                <label
                  for="grade"
                  class="block text-sm font-medium leading-5 text-gray-700"
                  >Grade</label
                >
                <input
                  v-model="addEditGrade.grade"
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
                  @click="
                    gradeModal = false
                    newCourse = {
                      name: null,
                      teacher: { name: null, email: null, phone: null },
                      weightBreakdown: [{ name: null, weight: null }],
                    }
                  "
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-red-500 px-4 py-2 bg-white text-base leading-6 font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  v-if="gradeModal === 'add'"
                  @click="saveGrade()"
                  type="submit"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Add Grade
                </button>
                <button
                  v-else
                  @click="saveGrade()"
                  type="submit"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Save Changes
                </button>
              </span>
            </div>
            <p v-if="actions.form.error" class="mt-2 text-red-500 text-xs">
              The weight doesn't add up to 100%
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase.js"
export default {
  data() {
    return {
      deleteConfirmation: false,
      gradeModal: false,
      addEditGrade: {
        name: null,
        type: null,
        grade: null,
      },
      actions: {
        form: {
          loading: false,
          error: false,
          success: false,
        },
        editCourse: {
          loading: false,
          error: false,
          success: false,
        },
      },
    }
  },

  async asyncData({ params }) {
    let course
    let grades = []

    await db
      .collection("courses")
      .doc(params.courseId)
      .get()
      .then((result) => {
        course = result.data()
        course.id = result.id
      })

    await db
      .collection("courses")
      .doc(params.courseId)
      .collection("grades")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let grade = {
            ...doc.data(),
            id: doc.id,
          }
          grades.push(grade)
        })
      })

    return { course: course, grades: grades }
  },

  methods: {
    editCourse() {
      this.actions.editCourse.loading = true
      var totalWeight = this.course.weightBreakdown
        .map((breakdown) => {
          return breakdown.weight
        }, 0)
        .reduce((a, b) => a + b, 0)

      var courseData = {
        ...this.course,
      }

      delete courseData.id

      if (totalWeight === 100) {
        db.collection("courses")
          .doc(this.course.id)
          .update(courseData)
          .then(() => {
            this.addCourseModal = false
            this.actions.editCourse.error = false
            this.actions.editCourse.loading = false
            this.actions.editCourse.success = true
          })
          .catch((error) => {
            this.actions.editCourse.loading = false
            this.actions.editCourse.error = error
          })
      } else {
        this.actions.editCourse.loading = false
        this.actions.editCourse.error = "The weight doesn't add up to 100%"
      }
    },

    deleteCourse() {
      this.actions.form.loading = true

      db.collection("courses")
        .doc(this.course.id)
        .delete()
        .then(() => {
          db.collection("courses")
            .doc(this.course.id)
            .collection("grades")
            .get()
            .then((results) => {
              if (!!results.docs.length) {
                results.forEach((result) => {
                  result.ref.delete().then(() => {
                    this.$router.push({ path: "/courses" })
                  })
                })
              } else {
                this.$router.push({ path: "/courses" })
              }
            })
        })
        .catch((error) => {
          console.log(error)
          this.actions.form.error = error
        })
    },

    saveGrade() {
      var addEditGrade = {
        ...this.addEditGrade,
        timestamp: new Date(),
      }
      delete addEditGrade.id

      if (this.gradeModal === "add") {
        db.collection("courses")
          .doc(this.course.id)
          .collection("grades")
          .add(addEditGrade)
          .then((doc) => {
            addEditGrade.id = doc.id
            // Calculate and save weighted average grade for course
            this.grades.unshift(addEditGrade)
            this.calculateWeightedAverage()
            this.gradeModal = false
            this.actions.form.error = false
          })
          .catch((error) => {
            console.log(error)
            this.actions.form.error = error
          })
      }

      if (this.gradeModal === "edit") {
        db.collection("courses")
          .doc(this.course.id)
          .collection("grades")
          .doc(this.addEditGrade.id)
          .update(addEditGrade)
          .then(() => {
            this.calculateWeightedAverage()
            this.gradeModal = false
            this.actions.form.error = false
          })
          .catch((error) => {
            console.log(error)
            this.actions.form.error = error
          })
      }
    },

    calculateWeightedAverage() {
      let points = []
      let weights = []
      let totalWeight = 0

      this.course.weightBreakdown.forEach((breakdown) => {
        let typedGrade = this.grades.filter((grade) => {
          return grade.type == breakdown.name
        })

        typedGrade.length !== 0 ? (totalWeight += breakdown.weight) : null
      })

      this.course.weightBreakdown.forEach((breakdown) => {
        let typedGrade = this.grades.filter((grade) => {
          return grade.type == breakdown.name
        })

        let average = typedGrade.reduce((a, b) => {
          return a + parseFloat(b.grade)
        }, 0)

        let weightedPoints =
          typedGrade.length > 0
            ? (average / typedGrade.length) * (breakdown.weight / totalWeight)
            : 0

        weights.push(weightedPoints)
      })

      // SAVE THIS
      let weightedGrade = weights.reduce((a, b) => a + b, 0)

      this.course.weightedGrade = weightedGrade

      db.collection("courses")
        .doc(this.course.id)
        .update({ weightedGrade: weightedGrade })
    },

    deleteGrade() {
      db.collection("courses")
        .doc(this.course.id)
        .collection("grades")
        .doc(this.addEditGrade.id)
        .delete()
        .then(() => {
          let gradeIndex = this.grades.findIndex((grade) => {
            return grade.id === this.addEditGrade.id
          })
          this.grades.splice(gradeIndex, 1)

          this.calculateWeightedAverage()
          this.gradeModal = false
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

<style lang="scss" scoped>
</style>