<template>

  <div class="feedback">
    
    <div class="overflow-hidden">
        <div class="avatar-container">
            <img class="client-avatar" :src="feedback.userAvatar">
        </div>        
        <div class="feedback-body" @click="toggleProp('showBody')">
            <span class="message">{{ trim(feedback.message) }}</span>
            <a href="#" @click.stop="toggleProp('settings')"><span class="options"><i data-feather="settings"></i></span></a>
            <span class="created">{{ timeTracker }}</span>
        </div>
    </div>

    <div class="full-feedback" v-if="showBody">{{ feedback.message }}</div>
    <div style="clear:both"></div>

    <div class="settings" v-show="settings">            
      <ul class="mina">
          <li><a @click="markAsRead(feedback)"><i data-feather="check"></i> Mark as Read</a></li>
          <li><a @click="deleteFb(feedback)"><i data-feather="x"></i> Delete </a></li>
      </ul>
    </div>
            
  </div>

</template>

<style scoped>
  .full-feedback {
    font-family: 'Overpass';
    word-spacing: 0.7px;
  }
</style>

<script>

import { api } from '@/utils/api';
import Hub from '@/utils/hub';

export default {
  name: "Feedback",
  props: {
    feedback: Object
  },
  data() {
    return {
      showBody: false,
      settings: false,
      duration: "",
      userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240"
    }
  },
  methods: {
    trim(text) {
      if (text.length > 50) {
        return `${text.substr(0, 50)}...`
      } else {
        return text.substr(0, 50)
      }
    },
    toggleProp(prop) {
      this[prop] ? this[prop] = false : this[prop] = true
    },
    timeSince() {
      const timestamp = (new Date(this.feedback.created)).getTime()

      // console.log("we are running o", timestamp)
      var seconds = Math.floor((new Date() - timestamp) / 1000);

      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
        this.duration = interval + " years";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
        this.duration = interval + " months";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
        this.duration = interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        this.duration = interval + " hours";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        this.duration = interval + " minutes";
      } else {
        this.duration = Math.floor(seconds) + " seconds"
      }
    },
    async markAsRead(feedback) {
      console.log("updating")
      this.toggleProp('settings')
      try {
        const res = await api.markAsRead(feedback);
        
        if (!res.data.sucess) {
          return console.log("couldn't bemark as read", res.data)
        }

        Hub.$emit("feedback:read", JSON.stringify(res.data.feedback))
        console.log('marked as read');

      } catch (e) {
        console.log(e)
      }
    },

    async deleteFb(feedback) {
      this.toggleProp('settings')
      try {
        const res = await api.deleteFb(feedback);
        if (!res.data.sucess) {
          return console.log("couldn't be deleted", res.data)
        }
        Hub.$emit("feedback:deleted", JSON.stringify(res.data.feedback))
        console.log('marked as deleted')
      } catch (e) {
        console.log(e)
      }
    }
    
  },
  computed: {
    timeTracker() {
      if (this.duration == "0 seconds") {
        return "just now"
      } else {
        return this.duration
      }
    }
  },

  mounted() {
    feather.replace()
  },

  created() {
    this.timeSince()
    setInterval(this.timeSince, 60000)
  }
}
</script>


