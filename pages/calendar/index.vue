<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Calendar</h1>
      <span class="inline-flex rounded-md shadow-sm">
        <button
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
              <template v-for="event in events">
                <p
                  :key="event.key"
                  v-if="new Date(props.day.date).getFullYear() === event.date.getFullYear() && new Date(props.day.date).getMonth() === event.date.getMonth() && new Date(props.day.date).getDate() === event.date.getDate()"
                  class="bg-red-400 px-2 py- rounded-lg text-sm text-white"
                >{{event.name}}</p>
              </template>
            </div>
          </template>
        </v-calendar>
      </div>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul class="divide-y px-4">
          <li v-for="event in events" :key="event.key">
            <a href="#" class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
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
            </a>
          </li>
        </ul>
      </div>

      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
import { setupCalendar } from "v-calendar"
export default {
  data() {
    return {
      events: [
        {
          key: "1",
          name: "test me",
          date: new Date(),
          course: "CS 101",
          type: "exam",
        },
        {
          key: "2",
          name: "test me",
          date: new Date(),
          course: "CS 101",
          type: "homework",
        },
        {
          key: "3",
          name: "test me",
          date: new Date(),
          course: "CS 101",
          type: "misc",
        },
      ],
    }
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

