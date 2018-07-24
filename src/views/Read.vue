<template>
  <div>
    <FeedbackContainer 
      v-for="(month, index) in months" 
      :feedbacks="container[month]"
      :month="month" 
      :key="index"
      :read="true"/>
    </div>
</template>

<script>
  import FeedbackContainer from '@/components/FeedbackContainer';

  export default {
    name: 'home',
    components: {
      FeedbackContainer
    },
    data() {
      return {
        feedbacks: [
          { read: true,
            userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240",
            created: Date.now(),
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            read: false,
            userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240",
            created: Date.now(),
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            read: false,
            userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240",
            created: Date.now(),
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            read: false,
            userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240",
            created: Date.now(),
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            read: false,
            userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240",
            created: Date.now(),
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            read: true,
            userAvatar: "https://zeit.co/api/www/avatar/80a05295ee60a79cf50b0dbd63e0deaaec49568f?s=240",
            created: Date.now(),
            body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
        ],
        months: [],
        container: {

        }
      }
    },
    beforeMount() {
      this.feedbacks.forEach(feedback => {
        const converted = new Date(feedback.created).toString().split(" ");
        feedback["date"] = `${converted[1]} ${converted[3]}`;
        this.container[feedback["date"]] = [];
      });

      this.months = Object.keys(this.container);

      this.feedbacks.forEach(feedback => {
        this.container[feedback["date"]].push(feedback)
      })

      console.log(this.months)
      console.log(this.container)

    }
  }
</script>
