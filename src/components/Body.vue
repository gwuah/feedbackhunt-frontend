<template>
  <div class="body-parent">
    <div class="ctrl-panel">
      <ul class="mina">
        <a 
          href="#" 
          :class="{'toggleActiveView': state == 'inbox' }" 
          @click="setState('inbox')">
          <li><i data-feather="inbox"></i> Inbox <span v-show="inbox > 0">( {{inbox}} )</span></li>
        </a>
        <a 
          href="#"
          :class="{'toggleActiveView': state == 'read' }" 
          @click="setState('read')">
          <li><i data-feather="thumbs-up"></i> Read </li>
        </a>
        <a 
          href="#" 
          :class="{'toggleActiveView': state == 'rearrange' }"
          @click="reArrange()">
          <li><i data-feather="sliders"></i> Jigger </li>
        </a>
        <a 
          href="#" 
          :class="{'toggleActiveView': state == 'settings' }"
          @click="setState('settings')">
          <li><i data-feather="settings"></i> Settings </li>
        </a>
        <a 
          href="#" 
          :class="{'toggleActiveView': state == 'logout' }" 
          @click="setState('logout')">
          <li><i data-feather="power"></i> Logout </li>
        </a>
      </ul>
    </div>
    <div>

      <template 
          v-if="feedbacks.length > 0 
          && Object.keys(this.readContainer).length == 0
          && state == 'read'">
        <div class="feedback-container" id="fb">
        <div class="zero-fb">You have not marked any feedback as read.</div>
        <img v-show="loader" src="../../public/loader.gif"/>
        </div>
      </template>

      <template v-if="feedbacks.length <= 0">
        <div class="feedback-container" id="fb">
        <div class="zero-fb">You have received 0 feedback.</div>
        <img v-show="loader" src="../../public/loader.gif"/>
        </div>
      </template>

      <template v-if="state == 'inbox'">
        <div :key="someVariableUnderYourControl">
        <FeedbackContainer 
          :state="state"
          v-for="(month, index) in months" 
          :feedbacks="container[month]"
          :month="month"
          :key="index"/>
        </div>
      </template>

      <template v-if="state == 'read'">
        <div :key="someVariableUnderYourControl">
          <FeedbackContainer
            v-if="readContainer[month]"
            :state="state"
            v-for="(month, index) in months" 
            :feedbacks="readContainer[month]"
            :month="month"
            :key="index"/>
        </div>
      </template>

    </div>
     <div style="clear:both"></div>
  </div>
</template>

<script>
  import FeedbackContainer from '@/components/FeedbackContainer';
  import Hub from '@/utils/hub';
  import { api } from '@/utils/api';

  export default {
    name: "Body",
     sockets:{
       connect: function(){
          console.log('socket connected');
          this.isConnected = true;
        },
        customEmit: function(val){
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        },
        disconnect() {
          this.isConnected = false;
        }
     },
    components: {
      FeedbackContainer
    },
    data() {
      return {
        all: true,
        loader: true,
        inbox: 0,
        someVariableUnderYourControl: 9,
        isConnected: null,
        feedbacks: [],
        months: [],
        read: [],
        container: {

        },
        readContainer: {

        },
        state: "inbox"
      }
    },
    methods:{
      genDate(feedback) {
        const converted = new Date(feedback.created).toString().split(" ");
        // console.log(converted)
        feedback["date"] = `${converted[1]} ${converted[3]}`;
        return feedback
      },
      setState(state) {
        this.state = state;
        Hub.$emit("route", state)
        setTimeout(()=>{
          this.inbox = 0
        }, 400)
      },
      reArrange() {
        // rearrange
      },
      
      myReverse(arr) {
        if (!arr) return []

        let reversed = [];
        for (let i = arr.length - 1 ; i >= 0 ; i--) {
          reversed.push(arr[i])
        }
        return reversed
      },

      reposition(feedback) {

        const fb = this.genDate(feedback)
        const date = fb.date;
        const index = this.container[date].findIndex(el => el._id == feedback._id);
        console.log(index)
        this.container[date].splice(index, 1);
        this.someVariableUnderYourControl++

        if (!this.readContainer[date]) {
          this.readContainer[date] = [];
        }
        this.readContainer[date].unshift(feedback)
      },

      removeLocally(fb) {
        // console.log(fb)

        const feedback = this.genDate(fb)
        const date = feedback.date;

        if (this.state == "inbox") {
          const index = this.container[date].findIndex(el => el._id == feedback._id);
          this.container[date].splice(index, 1);
          
          this.someVariableUnderYourControl++

        } else if (this.state == "read") {
          const index_read = this.readContainer[date].findIndex(el => el._id == feedback._id);
          this.readContainer[date].splice(index_read, 1)
          this.someVariableUnderYourControl++

        }


      },

      script() {
        this.feedbacks.forEach(feedback => {
          // feedback.created = Date.parse(feedback.created)
          const converted = new Date(feedback.created).toString().split(" ");
          feedback["date"] = `${converted[1]} ${converted[3]}`;
          this.container[feedback["date"]] = [];
        });

        this.months = Object.keys(this.container);

        this.feedbacks.forEach(feedback => {
          this.container[feedback["date"]].push(feedback)
        })

        // console.log(this.months)
        this.months.forEach(month => {
          this.container[month] = this.myReverse(this.container[month])
        })

        this.read = this.feedbacks.filter(feedback => feedback.read == true);

        this.read.forEach(feedback => {
          if (this.feedbacks.find(feedback => feedback.read == true)) {
            this.readContainer[feedback["date"]] = [];            
          }
        });

        this.read.forEach(feedback => {
          this.readContainer[feedback["date"]].push(feedback)
        })

        this.months.forEach(month => {
          if (this.feedbacks.find(feedback => feedback.read == true)) {
            this.readContainer[month] = this.myReverse(this.readContainer[month])
          }

          // this.readContainer[month].sort(function(x, y){
          //   console.log((new Date(x.created)).getTime() - (new Date(y.created)).getTime())
          //   return (new Date(x.created)).getTime() - (new Date(y.created)).getTime();
          // })

          // this.container[month].sort(function(x, y){
          //   return (new Date(x.created)).getTime() - (new Date(y.created)).getTime();
          // })
          
        })
        
      }
    },
    mounted () {
      feather.replace()
    },

    updated() {
      feather.replace()
    },

    beforeMount() {
      this.script();
    },

    updated() {
      // this.script()
    },

    async created() {
      Hub.$on("feedback:read", (data) => {
        const feedback = JSON.parse(data);
        this.reposition(feedback)
      })

      Hub.$on("feedback:deleted", (data) => {
        const feedback = JSON.parse(data);
        this.removeLocally(feedback)
      })

      this.$options.sockets.feedback = (data) => {
        // console.log(data)
        // const feedback = this.genDate(JSON.parse(data))
        // console.log(feedback)
        this.feedbacks.push(JSON.parse(data));
        this.script();
        // this.container[feedback["date"]].push(feedback)
        // we do this to automattically update the dom
        // it's a standard hack
        this.someVariableUnderYourControl += 1
        this.inbox += 1
      }
      // get data from server endpoint
      try {
        const feedbacks = await api.getFeedbacks();
        // console.log(feedbacks.data.feedbacks);
        this.loader = false;
        this.feedbacks = feedbacks.data.feedbacks;
        // console.log(this.feedbacks);
        this.script();
      } catch (error) {
        console.log(error)
      }
    }
  }
</script>

<style scoped>
  
  .toggleActiveView {
    font-weight: bold;
  }

  .zero-fb {
    font-size: 30px;
    font-family: Mina;
    font-weight: bold
  }

  #fb {
    text-align: center;
    position: relative;
    top: 30px;
    border: none;
  }

  #fb img {
    margin-top: 30px;

  }

</style>


