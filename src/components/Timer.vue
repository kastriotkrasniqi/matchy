<script>
export default {
  emits: ['stoppedTime'],
  props: {
    start: Boolean
  },
  data() {
    return {
      timer: '00:00:00',
      seconds: 0,
      intervalId: null,
      lastStoppedTime: null
    };
  },
  computed: {
    // Compute the time to display based on whether the timer is running or stopped
    displayTime() {
      return this.intervalId ? this.timer : this.formatTime(this.seconds);
    }
  },
  methods: {
    startTimer() {
      if (!this.intervalId) {
        this.intervalId = setInterval(() => {
          this.seconds++;
          this.timer = this.formatTime(this.seconds);
        }, 1000);
      }
    },
    stopTimer() {
      clearInterval(this.intervalId);
      this.lastStoppedTime = this.timer; // Store the time when the timer stopped
      this.intervalId = null;
      this.timer = '00:00:00';
      this.seconds = 0;
    },
    formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return (
        this.padZero(hrs) + ':' + this.padZero(mins) + ':' + this.padZero(secs)
      );
    },
    padZero(num) {
      return (num < 10 ? '0' : '') + num;
    },
  },
  watch: {
    start(newValue) {
      if (newValue) {
        this.startTimer();
      } else {
        this.stopTimer();
        this.$emit('stoppedTime', this.lastStoppedTime)
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>

<template>
  <span class="bg-black text-white py-2 px-3.5 rounded-md tracking-widest text-lg h-10">{{ displayTime }}</span>
</template>
