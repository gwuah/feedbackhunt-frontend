<template>
  <div class="feedback-container">
    <div class="month">{{ month }}</div>

      <Feedback 
        v-for="(feedback, index) in feedbacks" 
        :feedback="feedback" 
        :key="index"
        v-if="feedback.read == stateMachine(state)"/>

  </div>
</template>

<style scoped>

</style>

<script>
import Feedback from '@/components/Feedback';

export default {
  name: "FeedbackContainer",
  props: {
    feedbacks: Array,
    month: String,
    state: String
  },
  components: {
    Feedback
  },
  data() {
    return {

    }
  },
  methods: {
    stateMachine(state) {
      if (state == "read") {
        return true
      } else if (state == "inbox") {
        return false
      }
    }
  }
}
</script>
