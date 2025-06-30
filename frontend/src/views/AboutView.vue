<template>
  <v-container :class="['about', { loaded }]" class="pa-0" fluid>
    <v-card elevation="10" class="pa-4 mt-4 glass">
      <v-row>
        <!-- Image -->
        <v-col cols="auto">
          <img :src="me_pic" alt="Profile Picture" width="320" />
        </v-col>

        <!-- Info Section -->
        <v-col>
          <v-row>
            <v-col>
              <v-card class="pa-2 glass" flat>
                <!-- Name -->
                <h1 class="text-2xl font-bold mb-2">Paramet Gomasatitd</h1>

                <!-- Role & Education -->
                <div class="text-subtitle-1 mb-2">
                  <v-icon size="18" class="mr-1" icon="bi bi-person-circle" />
                  <b>Nick</b>, Computer Engineering @
                  <a
                    href="https://sut.ac.th"
                    target="_blank"
                    rel="noopener"
                    class="font-weight-medium"
                  >
                    SUT
                  </a>
                </div>

                <!-- Current Role -->
                <div class="text-body-2 font-italic">
                  <v-icon size="18" class="mr-1" icon="bi bi-laptop" />
                  <span>Now: This Site's Developer</span>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <v-divider class="my-2" />

          <!-- Hobby Card -->
          <v-row>
            <v-col cols="12" md="6">
              <v-card title="Hobby" class="h-100 glass" hover>
                <v-card-text>
                  <div>🎮 Playing Game</div>
                  <div>🎬 Watching Movie</div>
                  <div>🎧 Listen to Music</div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Like / Dislike Section -->
            <v-col cols="12" md="6">
              <v-card title="Preferences" class="h-100 glass" hover>
                <v-card-text>
                  <div><b>👍 Likes:</b> Gaming, Coding, Coffee, Jazz</div>
                  <div><b>👎 Dislikes:</b> Bugs, No Internet</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <!-- Pros / Cons Section -->
          <v-row>
            <v-col>
              <v-card title="Pros & Cons" hover class="glass">
                <v-card-text class="d-flex flex-wrap p-4">
                  <div class="mr-8 pa-2">
                    <h3 class="text-green">✅ Pros</h3>
                    <ul>
                      <li>Fast Learner</li>
                      <li>Team Player</li>
                      <li>Creative Thinker</li>
                    </ul>
                  </div>
                  <div class="pa-2">
                    <h3 class="text-red">❌ Cons</h3>
                    <ul>
                      <li>Perfectionist</li>
                      <li>Night Owl</li>
                    </ul>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// import imgsrc from "@/assets/test.jpg";
import me_pic from "@/assets/me.jpg";

import { ref, onMounted } from "vue";

const loaded = ref(false);
const bgUrl = "https://picsum.photos/1920/1080";

onMounted(() => {
  const img = new Image();
  img.src = bgUrl;
  img.onload = () => {
    loaded.value = true;
  };
});
</script>

<style>
/* html,
body {
  overflow: hidden;
} */

@media (min-width: 1024px) {
  .about {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 2rem;
    height: 100vh;
  }
}

.about.loaded::before {
  opacity: 1;
}
.about::before {
  content: "";
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url("https://picsum.photos/1920/1080");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;

  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  pointer-events: none; /* so it doesn’t block clicks */
}
.glass {
  background: rgba(255, 255, 255, 0.1); /* translucent */
  backdrop-filter: blur(10px); /* frosted glass blur */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}
</style>
