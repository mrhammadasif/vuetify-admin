<template>
  <div class=" my-8">
    <v-menu
      v-model="menuOpen"
      transition="slide-y-transition"
      offset-y
      bottom>
      <template #activator="{ on }">
        <v-btn
          color="primary"
          v-on="on">
          <v-icon>mdi-cards</v-icon> Open Quick Launcher
        </v-btn>
      </template>
      <v-sheet class="light">
        <v-container
          style="max-width: 400px;"
          grid-list-xs
          fluid>
          <transition-group
            v-if="menuOpen"
            name="staggered-fade"
            tag="v-row"
            :css="false"
            appear
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave">
            <v-col
              v-for="(app, index) in apps"
              :key="app.title"
              :data-index="index"
              cols="4">
              <v-sheet
                class="d-flex flex-column px-8 py-8 align-center"
                color="primary"
                dark>
                <v-icon>{{ app.icon }}</v-icon>
                <div class="title">
                  {{ app.title }}
                </div>
              </v-sheet>
            </v-col>
          </transition-group>
        </v-container>
      </v-sheet>
    </v-menu>

    <v-divider class="my-4"></v-divider>
    <v-sheet class="light">
      <v-container
        style="max-width: 400px;"
        grid-list-xs
        fluid>
        <transition-group
          name="staggered-fade"
          tag="v-row"
          :css="false"
          appear
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave">
          <v-col
            v-for="(app, index) in apps"
            :key="app.title"
            :data-index="index"
            cols="4">
            <launcher-icon :app="app" />
          </v-col>
        </transition-group>
      </v-container>
    </v-sheet>

    <v-divider class="my-4"></v-divider>
    <v-container grid-list-xs>
      <v-row>
        <v-col
          v-for="app in apps"
          :key="app.title"
          cols="4">
          <launcher-card :app="app" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Velocity from "velocity-animate"
import LauncherCard from "@/components/LauncherCard.vue"
import LauncherIcon from "@/components/LauncherIcon.vue"

export default {
  components: {
    LauncherCard,
    LauncherIcon
  },
  data () {
    return {
      hover: false,
      dropdown: false,
      apps: [
        {
          title: "Facebook",
          icon: "mdi-facebook"
        },
        {
          title: "Bing",
          icon: "mdi-microsoft"
        },
        {
          title: "Google",
          icon: "mdi-google"
        }
      ],
      menuOpen: false
    }
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      const delay = el.dataset.index * 300
      setTimeout(function () {
        Velocity(
          el,
          {
            opacity: 1
          },
          {
            complete: done
          }
        )
      }, delay)
    },
    leave: function (el, done) {
      const delay = el.dataset.index * 300
      setTimeout(function () {
        Velocity(
          el,
          {
            opacity: 0
          },
          {
            complete: done
          }
        )
      }, delay)
    }
  }
}
</script>
