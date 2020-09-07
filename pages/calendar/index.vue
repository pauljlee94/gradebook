<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Calendar</h1>
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click="eventModal = 'add'; addEditEvent = {name: null, course: null, type: null, date: null}"
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          <i class="fas fa-plus mr-2"></i>Add Event
        </button>
      </span>
    </div>
    <div class="flex justify-between mt-6 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-x-8">
      <!-- Replace with your content -->
      <div class="flex-1">
        <v-calendar id="calendar" is-expanded class="shadow" :attributes="events">
          <template slot="day-content" slot-scope="props">
            <p>{{props.day.day}}</p>
            <div class="events mt-2 overflow-y-scroll space-y-1" style="height:65px;">
              <template v-for="(event, index) in events">
                <p
                  :key="index"
                  v-if="new Date(props.day.date).getFullYear() === new Date(event.date).getFullYear() && new Date(props.day.date).getMonth() ===  new Date(event.date).getMonth() && new Date(props.day.date).getDate() ===  new Date(event.date).getDate()"
                  class="px-2 py- rounded-lg text-sm text-white"
                  :class="{'bg-red-400': event.type === 'Exam','bg-blue-500': event.type === 'Homework','bg-orange-500': event.type === 'Project' }"
                >{{event.name}}</p>
              </template>
            </div>
          </template>
        </v-calendar>
      </div>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <h1 class="px-8 pt-8 pb-3 text-lg font-medium">Upcoming Events</h1>
        <ul class="divide-y px-4">
          <li v-for="event in events" :key="event.key">
            <button @click="eventModal ='edit'; addEditEvent = event" class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="text-sm leading-5 font-medium text-indigo-600 truncate">{{event.name}}</div>
                  <div class="ml-2 flex-shrink-0 flex">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{event.type}}</span>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <div class="mr-6 flex items-center text-sm leading-5 text-gray-500">
                      <i class="fas fa-book-open mr-1"></i>
                      {{event.course}}
                    </div>
                  </div>
                  <div class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                    <i class="fas fa-calendar-alt mr-1"></i>
                    <span>
                      <time datetime="2020-01-07">January 7, 2020</time>
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>

      <!-- /End replace -->
    </div>
    <div v-if="eventModal" class="fixed z-10 inset-0 overflow-y-auto">
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
            <h2 id="modal-title" class="text-xl font-semibold text-gray-900">{{addEditEvent === 'add' ? 'Add' : 'Edit'}} Event</h2>
            <span v-if="eventModal === 'edit'" class="inline-flex rounded-md shadow-sm">
              <button
                @click="deleteEvent"
                type="button"
                class="inline-flex items-center px-4 py-1 border border-red-500 text-sm leading-6 rounded-md text-red-500 bg-white hover:bg-red-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                <i class="fas fa-trash-alt mr-2"></i>Delete Event
              </button>
            </span>
          </div>
          <form class="mt-4" @submit.prevent>
            <div class="grid grid-cols-6 gap-4">
              <div class="col-span-6">
                <label for="eventName" class="block text-sm font-medium leading-5 text-gray-700">Event Name</label>
                <input
                  v-model="addEditEvent.name"
                  id="eventName"
                  class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Exam 1"
                />
              </div>
              <div class="col-span-6">
                <label for="course" class="block text-sm font-medium leading-5 text-gray-700">Course</label>
                <div>
                  <select
                    id="course"
                    v-model="addEditEvent.course"
                    class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option v-for="course in courses" :key="course.id">{{course.name}}</option>
                    <option value="misc">miscellaneous</option>
                  </select>
                </div>
              </div>
              <div class="col-span-6">
                <label for="type" class="block text-sm font-medium leading-5 text-gray-700">Type</label>
                <div>
                  <select
                    id="type"
                    v-model="addEditEvent.type"
                    class="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  >
                    <option>Exam</option>
                    <option>Homework</option>
                    <option>Project</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>
              </div>
              <div class="col-span-6">
                <label for="date" class="block text-sm font-medium leading-5 text-gray-700">Date</label>
                <v-date-picker v-model="addEditEvent.date" class="mt-1" is-inline is-expanded />
              </div>
            </div>
            <!-- Buttons -->
            <div class="flex mt-5 sm:mt-6 space-x-4 border-t pt-4">
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  @click="eventModal = false"
                  type="button"
                  class="inline-flex justify-center w-full rounded-md border border-red-500 px-4 py-2 bg-white text-base leading-6 font-medium text-red-500 shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >Cancel</button>
              </span>
              <span class="flex w-full rounded-md shadow-sm">
                <button
                  @click="addEditEvent === 'add' ? addEvent() : editEvent()"
                  type="submit"
                  class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >{{addEditEvent === 'add' ? 'Add Event' : 'Save Changes'}}</button>
              </span>
            </div>
            <!-- <p v-if="actions.form.error" class="mt-2 text-red-500 text-xs">The weight doesn't add up to 100%</p> -->
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
      eventModal: false,
      addEditEvent: {
        name: null,
        course: null,
        type: null,
        date: null,
      },
    }
  },

  async asyncData({ store }) {
    let events = []
    await db
      .collection("calendars")
      .doc(store.state.modules.user.user.uid)
      .collection("events")
      .orderBy("date")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          let event = {
            ...doc.data(),
            id: doc.id,
            date: new Date(doc.data().date.seconds * 1000),
          }
          events.push(event)
        })
      })

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

    return { events: events, courses: courses }
  },

  computed: {
    ...mapGetters("modules/user", ["user"]),
    selectedCourse() {
      return this.courses.filter((course) => {
        return course.name === this.addEditEvent.course
      })[0]
    },
  },

  methods: {
    addEvent() {
      let cleanEvent = {
        ...this.addEditEvent,
      }

      db.collection("calendars")
        .doc(this.user.uid)
        .collection("events")
        .add(cleanEvent)
        .then((doc) => {
          cleanEvent.id = doc.id
          this.events.push(cleanEvent)
          this.eventModal = false
        })
    },

    editEvent() {
      let cleanEvent = {
        ...this.addEditEvent
      }

      delete cleanEvent.id
      db.collection("calendars")
        .doc(this.user.uid)
        .collection("events")
        .doc(this.addEditEvent.id)
        .update(cleanEvent)
        .then((doc) => {
          this.eventModal = false
        })
    },

    deleteEvent() {
      let editIndex = this.events.findIndex((event) => {
        return event.id === this.addEditEvent.id
      })
      db.collection("calendars")
        .doc(this.user.uid)
        .collection("events")
        .doc(this.addEditEvent.id)
        .delete()
        .then(() => {
          this.events.splice(editIndex, 1)
          this.eventModal = false
        })
    },
  },
  layout: "protected",
}
</script>

<style>
#calendar {
  border-width: 0;
}
#calendar .vc-day {
  height: 120px;
  padding: 0.5rem;
  border-right: 1px solid rgb(228, 228, 228);
  border-bottom: 1px solid rgb(228, 228, 228);
}
#calendar .on-top {
  border-top: 1px solid rgb(228, 228, 228);
}
#calendar .on-left {
  border-left: 1px solid rgb(228, 228, 228);
}
#calendar .vc-header,
#calendar .vc-arrows-container {
  padding: 2rem;
}
#calendar .vc-weeks {
  padding: 0 2rem 2rem 2rem;
}
#calendar .events::-webkit-scrollbar {
  display: none;
}
</style>

